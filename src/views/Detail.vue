<template>
  <div>
    <mt-header title="疫情在线" class="title" fixed>
      <mt-button
        slot="left"
        icon="back"
        type="primary"
        @click="back"
      ></mt-button>
    </mt-header>
    <iframe
      :src="href"
      frameborder="0"
      width="100%"
      height="5000px"
      scrolling="no"
      vspace="10000000px"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      href: "",
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.href = this.$route.query.href;
  },
};
</script>

<style scoped>
img {
  width: 100%;
}
.title {
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  height: 50px;
  text-align: center;
  z-index: 100;
}
.article_box {
  padding: 5px;
}

#content > p:not(.f_center) {
  margin: 10px 0;
  box-sizing: border-box;
  text-indent: 1rem;
  max-width: 100%;
}
</style>