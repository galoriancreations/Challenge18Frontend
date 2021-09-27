<template>
  <li class="header__nav-subitem" @click="closeNav">
    <NuxtLink :to="link" activeClass="active" exact>
      {{ text }}
    </NuxtLink>
  </li>
</template>

<script>
export default {
  props: {
    link: [String, Object],
    text: String
  },
  inject: ["closeNav"]
};
</script>
