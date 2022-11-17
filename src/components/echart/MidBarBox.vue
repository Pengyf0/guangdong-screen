<template>
  <dv-scroll-board
    :hoverPause="false"
    :config="config"
    style="min-width: 380px; height: 700px; margin-top: 20px"
    class="dv-scroll-board"
   
  />
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    
  },
  methods: {
    draw() {
      this.data = this.config;
    }
  },
  watch: {
    config: {
      handler() {
        this.draw();
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.dv-scroll-board {
  .ceil {
    /deep/span {
      background-color: none !important;
    }
  }
}
</style>
