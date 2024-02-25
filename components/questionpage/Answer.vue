<template>
  <div class="container">
    <div class="head">
      <h3>{{ answer.user }}</h3>
      <button @click="toggleHeart" style="color: red">
        <i :class="[isFav ? 'fa-heart' : 'fa-heart-o', 'fa']"></i>
        {{ answer.likes }}
      </button>
    </div>
    <p>{{ answer.text }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clicked: 0,
      is_fav: false,
    };
  },
  props: {
    answer: Object,
  },
  data() {
    return {
      isFav: this.is_fav,
      clicked: 0,
    };
  },
  methods: {
    toggleHeart() {
      this.clicked++;
      this.isFav = !this.isFav;

      if (this.clicked % 2 === 0) {
        this.answer.likes--;
      } else {
        this.answer.likes++;
      }
      const updateAnswer = {
        id: this.answer._id,
        likes: this.answer.likes,
      };
      this.$emit('update-likes', updateAnswer);
    },
  },
};
</script>

<style lang="scss">
.container {
  color: $color-blue-2;
  background: #f4f4f4;
  margin-top: 10px;
  padding: 10px 20px;
  box-shadow: $boxshadow2;
}
.head {
  display: flex;
  justify-content: space-between;
}
p {
  color: black;
  padding-left: 20px;
}

.fa-heart {
  color: red;
}
.fa-heart-o {
  color: black;
}
</style>
