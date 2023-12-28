<template>
  <div class="container" :class="{ 'animate-container': animateContainer }">
    <div class="progress">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          class="bg"
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke-width="12"
        />
        <circle
          ref="bufferCircle"
          class="buffer"
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke-width="12"
          pathLength="100"
          :stroke="bufferColor"
          :style="{ transitionDuration: `${bufferDuration}ms` }"
        />
        <circle
          ref="circle"
          class="percent"
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke-width="12"
          pathLength="100"
          :stroke="percentColor"
          :style="{ transitionDuration: `${percentDuration}ms` }"
        />
      </svg>
      <div class="progress__percentage">
        <vue-tween-number
          :value="percentage"
          :duration="tweenEnabled ? percentDuration : 1"
        >
          <template v-slot:default="{ value }">
            {{ Math.round(value) }}
          </template>
        </vue-tween-number>
        <span :style="{ marginLeft: '-6px' }">%</span>
      </div>
      <p class="progress__message">
        <span v-html="messageHandler" />
      </p>
    </div>
  </div>
</template>

<script>
import VueTweenNumber from 'vue-tween-number';

export default {
  components: {
    VueTweenNumber,
  },
  props: {
    preMessage: String,
    postMessage: String,
    percentDuration: Number,
    bufferDuration: Number,
    percentColor: String,
    bufferColor: String,
  },
  data() {
    return {
      progress: 0,
      attempts: 0,
      maxAttempts: 0,
      done: false,
      percentage: 0,
      type: '',
      tweenEnabled: true,
      animateContainer: false,
      isFirstMount: true,
    };
  },
  mounted() {
    const source = new EventSource('http://localhost:3000/progress');

    source.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (this.type !== data.type && !this.isFirstMount) {
        await this.resetProgress();
        this.$emit('type-changed', data.type);
      } else if (this.isFirstMount) {
        this.isFirstMount = false;
      }

      const keys = ['type', 'attempts', 'maxAttempts', 'progress'];
      keys.forEach((key) => {
        if (data[key]) {
          this[key] = data[key];
        }
      });

      // if (data.done) {
      // this.done = true;
      // source.close();
      // }
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
      this.$refs.circle.style.strokeDashoffset = 100 - this.progress;
      // animate buffer circle faster than percent circle
      this.$refs.bufferCircle.style.strokeDashoffset = 100 - this.progress;

      this.percentage = this.progress;
    },
    percentColor() {
      this.$refs.circle.style.stroke = this.percentColor;
    },
    bufferColor() {
      this.$refs.bufferCircle.style.stroke = this.bufferColor;
    },
  },
  methods: {
    async resetProgress() {
      // animate container
      this.animateContainer = true;
      // no transition on reset

      // wait 1 second for animation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // disable animation
      if (this.$refs.circle) {
        this.$refs.circle.style.transitionDuration = '0ms';
      }
      if (this.$refs.bufferCircle) {
        this.$refs.bufferCircle.style.transitionDuration = '0ms';
      }
      this.tweenEnabled = false;
      await new Promise((resolve) => setTimeout(resolve, 10));

      // reset percent and buffer circle
      this.progress = 0;
      if (this.$refs.circle) {
        this.$refs.circle.style.strokeDashoffset = 100;
      }
      if (this.$refs.bufferCircle) {
        this.$refs.bufferCircle.style.strokeDashoffset = 100;
      }

      // delay the reset of the transition duration
      await new Promise((resolve) => setTimeout(resolve, 10));
      if (this.$refs.circle) {
        this.$refs.circle.style.transitionDuration = `${this.percentDuration}ms`;
      }
      if (this.$refs.bufferCircle) {
        this.$refs.bufferCircle.style.transitionDuration = `${this.bufferDuration}ms`;
      }
      this.tweenEnabled = true;

      setTimeout(() => {
        this.animateContainer = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  &.animate-container {
    animation: slideOutSlideIn 2s ease-in-out;
  }
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
        stroke: $color-gold-1;
      }
      .buffer {
        stroke: $color-gray-2;
      }
      .bg {
        stroke: $color-gray-1;
      }
    }

    &__percentage {
      position: absolute;
      top: 34%;
      left: 50%;
      transform: translate(-50%, -100%);

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

  @keyframes slideOutSlideIn {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
}
</style>
