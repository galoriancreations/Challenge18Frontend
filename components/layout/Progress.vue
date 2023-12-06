<template>
  <div class="container">
    <div class="progress">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#e6e6e6"
          stroke-width="12"
        />
        <circle
          ref="bufferCircle"
          class="buffer"
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#808080"
          stroke-width="12"
          pathLength="100"
        />
        <circle
          ref="circle"
          class="percent"
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#f77a52"
          stroke-width="12"
          pathLength="100"
        />

        <text
          x="50%"
          y="50%"
          alignment-baseline="middle"
          text-anchor="middle"
          class="progress__percentage"
        >
          {{ percentage }}%
        </text>
      </svg>
      <p class="progress__message">
        <span v-html="messageHandler" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    preMessage: String,
    postMessage: String,
  },
  data() {
    return {
      progress: 0,
      attempts: 0,
      maxAttempts: 0,
      done: false,
      percentage: 0,
    };
  },
  mounted() {
    const source = new EventSource('http://localhost:3000/progress');

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.progress = data.progress;
      this.attempts = data.attempts;
      this.maxAttempts = data.maxAttempts;

      if (data.done) {
        this.done = true;
        source.close();
      }
    };

    source.addEventListener('end', () => {
      source.close();
    });
  },
  unmounted() {
    if (this.source) {
      this.source.close();
    }
  },
  computed: {
    messageHandler() {
      if (this.done) {
        return 'Done!';
      } else {
        return `${this.preMessage} ${this.attempts} / ${this.maxAttempts} ${this.postMessage}`;
      }
    },
  },
  watch: {
    progress() {
      // animate circle following progress with transition
      if (this.$refs.circle) {
        this.$refs.circle.style.strokeDashoffset = 100 - this.progress;
      }

      // animate buffer circle faster than percent circle
      if (this.$refs.bufferCircle) {
        this.$refs.bufferCircle.style.strokeDashoffset = 100 - this.progress;
      }

      // animate percentage following progress with interval
      const interval = setInterval(() => {
        if (this.percentage < this.progress) {
          this.percentage++;
        } else {
          clearInterval(interval);
        }
        // calculate interval time based on how much progress is left
      }, 10000 / (this.progress - this.percentage));
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;

  .progress {
    svg {
      .percent,
      .buffer {
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
      }
      .percent {
        transition: stroke-dashoffset 10s ease-out;
        stroke: $color-gold-3;
        z-index: 1;
      }
      .buffer {
        transition: stroke-dashoffset 1s ease-out;
        z-index: -1;
      }
    }

    &__percentage {
      color: $color-blue-1;
      font-weight: 500;
      font-size: 2.5rem;

      @include respond(mobile) {
        font-size: 2rem;
      }
    }

    &__message {
      color: $color-blue-1;
      font-weight: 500;
      font-size: 1.7rem;
      text-align: center;

      @include respond(mobile) {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
