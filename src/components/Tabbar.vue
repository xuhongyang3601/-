<template>
  <div>
    <mt-tabbar fixed v-model="pages">
      <mt-tab-item id="index"
        >首页
        <img
          src="../assets/icon/index_active.png"
          slot="icon"
          v-if="pages == 'index'"
        />
        <img src="../assets/icon/index.png" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="dlist"
        >社区
        <img
          src="../assets/icon/community_active.png"
          slot="icon"
          v-if="pages == 'community'"
        />
        <img src="../assets/icon/community.png" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="me"
        >我的
        <img
          src="../assets/icon/me_active.png"
          slot="icon"
          v-if="pages == 'me'"
        />

        <img src="../assets/icon/me.png" slot="icon" v-else />
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  props: ["page"],
  data() {
    return {
      pages: this.page,
    };
  },
  watch: {
    pages(val) {
      switch (val) {
        case "index":
          this.$router.push("/");
          break;
        case "me":
          this.$router.push("/me");
          break;
        case "dlist":
          this.$router.push("/dlist");
          break;
      }
    },
  },
};
</script>

<style>
</style>