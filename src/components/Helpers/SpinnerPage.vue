<template>
  <div :class="displaySpinner ? 'spinner' : 'display'">
    <div class="spinner-border text-dark" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "SpinnerPage",
  props: { displaySpinner: Boolean },

  setup(props) {

    return {



    }
  }

}
</script>

<style lang="scss" scoped>
.display {
  display: none;
}

.spinner {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10000;
  background-color: rgba($color: #ffff, $alpha: 0.7);
}


</style>