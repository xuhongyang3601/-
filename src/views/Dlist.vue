<template>
  <div class="con">
    <mt-header id="mt-header">
      <div slot="right" class="header">
        <img src="../assets/icon/camera.png" alt="" />
        <router-link to="/dynamic">
          <span>发表动态</span>
        </router-link>
      </div>
    </mt-header>
    <div
      infinite-scroll-distance="20"
      v-infinite-scroll="next"
      infinite-scroll-disabled="busy"
      infinite-scroll-immediate-check="true"
    >
      <div v-for="(item, index) of dynamics" :key="index" class="container">
        <!-- 动态文本 -->
        <table></table>
        <div class="text">
          {{ item.dtext }}
        </div>
        <div class="zan">
          <!-- 动态图片 -->
          <div>
            <img :src="dim + item.dimg" class="img" v-lazy="dim + item.dimg" />
          </div>
          <!-- 设置点赞 -->
          <div>
            <!-- 测试代码 -->
            <span>点赞数:{{ item.likeCount }}</span>
            <img
              src="../assets/aiActive.png"
              alt=""
              v-if="check(item.did)"
              slot="icon"
            />
            <img
              src="../assets/aiActice.png"
              alt=""
              slot="icon"
              @click="like(item.did, item.likeCount, index)"
              v-else
            />
          </div>
        </div>
      </div>
    </div>
    <div style="height: 60px"></div>
    <tabbar :page="'dlist'"></tabbar>
  </div>
</template>
<style  scoped>
.con {
  width: 100%;
  height: 100%;
}
.container {
  border-bottom: 1px solid lightgrey;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.text {
  /* display: block; */
  /* display: inline-block; */
  text-align: left;
  color: black;
  font-size: 17px;
  padding: 11px;
  margin: 10px 0;
}
.img {
  width: 150px;
  height: 100px;
  /* margin-top: 20px; */
  margin-left: 10px;
}
.zan {
  display: flex;
  width: 100%;
  margin-bottom: 5px;
  justify-content: space-between;
}
.zan > div:last-child {
  margin-top: auto;
}
.zan img {
  vertical-align: middle;
}
.zan span {
  display: inline-block;
  color: lightslategray;
  font-size: 13px;
  margin-top: 15px;
  /* margin-right: -280px; */
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  padding: 5px;
  background-color: #2690ca;
}
#mt-header {
  height: 50px;
}
#mt-header a {
  text-decoration: none;
  color: #fff;
}
</style>

<script>
import Tabbar from "../components/Tabbar";
import { mapState } from "vuex";
export default {
  components: { Tabbar },
  data() {
    return {
      dynamics: [],
      dim: "http://127.0.0.1:3030/",
      count: [],
      state: [],
      page: 1,
      pageCount: 0,
      busy: false,
    };
  },
  mounted() {
    // 获取动态列表的文本和图片信息
    this.axios.get(`/api/dynamics?page=${this.page}`).then((res) => {
      var s = res.data.result.splice(0, 1);
      this.dynamics = res.data.result;
      this.pageCount = res.data.pageCount;
    });
    // 获取当前用户是否点赞当前动态
    this.axios.get(`/api/likeState?uid=${this.uid}`).then((res) => {
      for (var key of res.data) {
        // 将当前用户点赞的文章动态did加入到state数组中
        this.state.push(key.did);
      }
    });
  },
  methods: {
    // 点赞事件
    like(did, likeCount, i) {
      if (!this.uid) {
        this.$toast("用户未登陆");
      } else {
        // 用户点赞时插入点赞表的接口
        this.axios
          .post("/api/like", `uid=${this.uid}&did=${did}`)
          .then((res) => {});
        //用户点赞时插入动态表的接口
        this.axios
          .get(`/api/dlike?did=${did}&likeCount=${likeCount}`)
          .then((res) => {
            // 返回的did是当前动态的id,likeCount是对应动态的获取点赞的数量
            this.state.push(did);
            this.dynamics[i].likeCount = res.data.result;
          });
      }
    },
    check(did) {
      // 查询当前state数组中是否包含传递的did
      return this.state.some((elem) => {
        return elem == did;
      });
    },
    next() {
      this.page++;
      this.busy = true;
      this.$indicator.open("加载中");
      this.axios.get(`/api/dynamics?page=${this.page}`).then((res) => {
        this.dynamics = this.dynamics.concat(res.data.result);
        if (this.page == this.pageCount) {
          this.busy = true;
        } else {
          this.busy = false;
        }
        this.$indicator.close();
      });
    },
  },
  computed: {
    ...mapState(["uid"]),
  },
};
</script>