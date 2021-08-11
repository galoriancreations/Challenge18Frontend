<template>
  <DashboardModal title="Add a Player" :active="active">
    <form class="form"></form>
  </DashboardModal>
</template>

<script>
export default {
  props: {
    active: Boolean,
  },
  inject: ["closeModal"],
};
</script>
