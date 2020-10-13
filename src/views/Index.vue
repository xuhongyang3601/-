<template>
  <div>
    <div id="nav">疫情在线</div>
    <div
      id="container"
      infinite-scroll-distance="20"
      v-infinite-scroll="next"
      infinite-scroll-disabled="busy"
      infinite-scroll-immediate-check="true"
    >
      <!-- 顶部导航开始 -->
      <div class="head">
        <div>
          <router-link to="/select">
            <button>切换城市</button>
          </router-link>
          <p>齐心协力</p>
          <p>防控疫情</p>
        </div>
        <div>
          <img src="/img/head.png" />
        </div>
      </div>
      <!-- 顶部导航结束 -->
      <!-- 城市信息开始 -->
      <div class="city">
        <div>
          <span>确诊</span>
          <p>{{ data.confirm }}</p>
        </div>
        <div>
          <span>疑似</span>
          <p>{{ data.suspect }}</p>
        </div>
        <div>
          <span>治愈</span>
          <p>{{ data.heal }}</p>
        </div>
        <div>
          <span>死亡</span>
          <p>{{ data.dead }}</p>
        </div>
        <div>当前区域:{{ pname + cname }}</div>
      </div>
      <!-- 城市信息结束 -->
      <!-- 文章置顶开始 -->
      <div class="import" v-if="articles.length !== 0">
        <router-link :to="`/detail?href=${articles[num].aconment}`">
          {{ articles[num].asubject }}</router-link
        >
      </div>
      <!-- 文章置顶结束 -->
      <!-- 全国信息开始 -->
      <div class="totalH">
        <div ref="total" class="total"></div>
      </div>
      <!-- 全国信息结束 -->
      <!-- 文章信息开始 -->
      <div class="article">
        <div>疫情相关新闻</div>
        <ul>
          <li v-for="(p, i) of articles" :key="i">
            <router-link :to="`/detail?href=${p.aconment}`">
              <div>
                <img :src="p.aimg" v-lazy="p.aimg" />
              </div>
              <div>
                <div class="title">
                  {{ p.asubject }}
                </div>
                <div class="date">
                  {{ p.atime.substr(0, p.atime.indexOf("T")) }}
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 文章信息结束 -->
    </div>
    <tabbar :page="'index'"></tabbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Tabbar from "../components/Tabbar";
export default {
  components: { Tabbar },
  data() {
    return {
      data: {},
      articles: [],
      // 保存当前置顶的文章页数
      num: 0,
      // 保存当前文章的页码数
      page: 1,
      // 获取最大页数
      pageCount: 0,
      busy: false,
    };
  },
  mounted() {
    // 获取当前全国的疫情信息
    let instance = echarts.init(this.$refs.total, "vintage");
    this.axios.get("/api/total").then((res) => {
      let total = res.data.data;
      let date = [];
      var lData = ["确诊人数", "死亡人数", "治愈人数", "境外输入", "疑似病例"];
      let sourceData = [];
      total.reverse();
      total.forEach((elem, i, arr) => {
        date.push(elem.insert_date.substr(elem.insert_date.indexOf("-") + 1));
        if (i < arr.length - 1) {
          var confirm = arr[i + 1].confirm - elem.confirm;
          var dead = arr[i + 1].dead - elem.dead;
          var heal = arr[i + 1].heal - elem.heal;
          var input = arr[i + 1].input - elem.input;
          var suspect = arr[i + 1].suspect - elem.suspect;
          var insert_date = arr[i + 1].insert_date.substr(
            arr[i + 1].insert_date.indexOf("-") + 1
          );
        }
        var arr2 = [insert_date, confirm, dead, heal, input, suspect];
        sourceData.push(arr2);
      });
      sourceData.splice(-1, 1);
      date.splice(0, 1);
      instance.setOption({
        title: {
          text: "全国疫情统计",
          left: "center",
          subtext: "距昨日增长人数",
        },
        xAxis: {
          type: "category",
          data: date,
        },
        legend: {
          data: lData,
          left: "center",
          bottom: 0,
        },
        yAxis: {},
        dataset: {
          source: sourceData,
        },
        series: [
          {
            name: lData[0],
            type: "line",
            label: {
              //显示标签
              show: true,
              position: "top",
            },
          },
          {
            name: lData[1],
            type: "line",
            label: {
              //显示标签
              show: true,
              position: "top",
            },
          },
          {
            name: lData[2],
            type: "line",
            label: {
              //显示标签
              show: true,
              position: "top",
            },
          },
          {
            name: lData[3],
            type: "line",
            label: {
              //显示标签
              show: true,
              position: "top",
            },
          },
          {
            name: lData[4],
            type: "line",
            label: {
              //显示标签
              show: true,
              position: "top",
            },
          },
        ],
      });
    });
    // 获取对应城市的信息
    this.axios
      .get("/api/indexData", {
        params: {
          cname: this.cname,
          pname: this.pname,
        },
      })
      .then((res) => {
        this.data = res.data.data[0];
      });
    // 获取首页文章信息
    this.axios
      .get("/api/article", {
        params: {
          page: this.page,
        },
      })
      .then((res) => {
        this.articles = res.data.data;
        this.pageCount = res.data.pageCount;
      });
    // 加载时触发定时器,每隔3秒将此页数+1
    setInterval(() => {
      if (this.num == this.articles.length - 1) {
        this.num = 0;
      } else {
        this.num++;
      }
    }, 5000);
  },
  methods: {
    next() {
      this.page += 1;
      this.busy = true;
      this.$indicator.open("加载中");
      this.axios
        .get("/api/article", {
          params: {
            page: this.page,
          },
        })
        .then((res) => {
          this.articles = this.articles.concat(res.data.data);
          if (this.page == this.pageCount) {
            this.busy = true;
          } else {
            this.busy = false;
          }
          this.$indicator.close();
        });
    },
  },
  watch: {
    page(val) {},
  },
  computed: {
    ...mapState(["cname", "pname"]),
  },
};
</script>

<style scoped>
#nav {
  height: 40px;
  background-color: #26a2ff;
  color: #fff;
  text-align: center;
  line-height: 40px;
}
#container {
  width: 100%;
  background-color: #83bdff;
  padding: 0 5px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 55px;
}
.mint-header {
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: #fff;
}
.head {
  display: flex;
  flex-wrap: wrap;
}
.head > div {
  flex: 0 0 48%;
}
.head > div:first-child {
  margin-top: 20px;
  margin-left: 10px;
}
.head img {
  width: 100%;
}
.head p {
  color: #fff;
  font-size: 30px;
  margin: 20px 0;
}
.head p:last-child {
  margin-left: 30px;
}
.head button,
.city span {
  width: 80px;
  height: 25px;
  border-radius: 20px;
  background-color: #f84e4f;
  line-height: 25px;
  color: #fff;
  outline: 0;
  border: 0;
  display: inline-block;
  text-align: center;
}
.city {
  display: flex;
  justify-content: space-around;
  text-align: center;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px 10px 10px;
}
.city p {
  font-size: 20px;
  margin-top: 15px;
  font-weight: bold;
}
.city > div:first-child > p {
  color: #f84e4f;
}
.city > div:nth-child(2) > span {
  background-color: #df9e0d;
}
.city > div:nth-child(2) > p {
  color: #df9e0d;
}
.city > div:nth-child(3) > span {
  background-color: #099714;
}
.city > div:nth-child(3) > p {
  color: #099714;
}
.city > div:nth-child(4) > span {
  background-color: #b7b2ad;
}
.city > div:nth-child(4) > p {
  color: #b7b2ad;
}
.city > div:last-child {
  font-size: 8px;
  color: #b7b2ad;
  margin-top: 10px;
  margin-left: auto;
}
.import {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  padding: 5px;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 30px;
  text-align: center;
}
.import a {
  text-decoration: none;
  color: #777;
}
.total {
  width: 100%;
  height: 350px;
  margin: 20px auto 0;
  height: 100%;
}
.totalH {
  border-radius: 8px;
  height: 300px;
}
.article {
  margin-top: 30px;
}
.article > div:first-child {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.article > ul {
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
}
.article a {
  display: flex;
  padding: 5px 0;
  text-decoration: none;
  color: #888;
  justify-content: space-between;
  border-bottom: 1px dotted #aaa;
}
.article li + li {
  margin-top: 10px;
}
.title {
  margin-left: 10px;
}
.date {
  text-align: right;
  margin-top: 40px;
  font-size: 10px;
}
</style>