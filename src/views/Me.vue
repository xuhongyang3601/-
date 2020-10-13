<template>
  <div id="container">
    <mt-header title="个人信息"></mt-header>
    <div class="header">
      <div class="avatar">
        <input type="file" class="file" name="avatar" @change="change" />
        <img
          :src="data || 'http://127.0.0.1:3030' + information.uavatar"
          alt=""
        />
        <div class="nickname" @click="set('nick')">
          {{ information.unick }}
          <img src="../assets/icon/update.png" alt="" class="icon" />
        </div>
      </div>
      <div>
        <ul>
          <li>
            <div>发布动态</div>
            <div>{{ dcount }}</div>
          </li>
          <li></li>
          <li>
            <div>获取点赞</div>
            <div>{{ likeCount || 0 }}</div>
          </li>
        </ul>
      </div>
    </div>
    <mt-cell title="性别" isLink @click.native="set('gender')">
      {{ information.ugender }}
    </mt-cell>
    <mt-cell title="手机号" @click.native="set('phone')" isLink>
      {{ information.uphone || "暂未填写" }}
    </mt-cell>
    <mt-cell title="地址" isLink @click.native="set('address')">
      {{ information.uaddress || "暂未填写" }}
    </mt-cell>
    <mt-button type="danger" size="large" class="btn" @click="exit"
      >退出登录</mt-button
    >
    <mt-popup v-model="popupVisible" position="bottom" style="width: 100%">
      <!-- <mt-button type="primary" style="float: right">确定</mt-button>
      <mt-button type="danger">取消</mt-button> -->
      <div @click="setGender" class="confirm">确认</div>
      <div @click="set('gender')" class="cancel">取消</div>
      <mt-picker :slots="slots" showToolbar @change="gender"> </mt-picker>
    </mt-popup>
    <tabbar :page="'me'" class="bottom"></tabbar>
  </div>
</template>

<script>
import Tabbar from "../components/Tabbar";
import { mapState, mapMutations } from "vuex";
export default {
  components: { Tabbar },
  data() {
    return {
      popupVisible: false,
      slots: [
        {
          flex: 1,
          values: ["男", "女"],
          textAlign: "center",
        },
      ],
      sex: "",
      information: {},
      dcount: 0,
      likeCount: 0,
      data: "",
    };
  },
  mounted() {
    if (this.uid == "") {
      this.$router.push("/login");
      return;
    }
    // 获取当前已登录用户的详细信息
    this.axios.get(`/api/user?uid=${this.uid}`).then((res) => {
      this.information = res.data.data[0];
    });
    // 获取用户发布的动态数和获取的点赞数
    this.axios.get(`/api/dcount?uid=${this.uid}`).then((res) => {
      this.dcount = res.data[0].dcount;
    });
    // 获取当前用户发布的所有动态的点赞数量
    this.axios.get(`/api/getlike?uid=${this.uid}`).then((res) => {
      this.likeCount = res.data[0].likeCount;
    });
  },
  methods: {
    ...mapMutations(["isLogin"]),
    tirggerFile(event) {
      var fileList = event.target.files;
      const file = fileList[0];
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file); //监听文件读取结束后事件
        reader.onloadend = (e) => {
          //e.target.result中就保存了文件的信息
          var a = e.target.result;
          this.data = a;
        };
      }
    },
    change(e) {
      let formdata = new FormData();
      formdata.append("img", e.target.files[0]);
      formdata.append("uid", this.uid);
      this.axios.post("/api/avatar", formdata).then((res) => {
        this.$toast("修改成功");
        this.tirggerFile(e);
      });
    },
    set(ws) {
      let title = "";
      switch (ws) {
        case "phone":
          title = "请输入手机号";
          break;
        case "gender":
          this.popupVisible = !this.popupVisible;
          return;
          break;
        case "nick":
          title = "请输入要修改的昵称";
          break;
        default:
          title = "请输入地址";
          break;
      }
      this.$messagebox({
        $type: "prompt",
        title,
        message: " ",
        showInput: true,
        confirmButtonText: "提交",
      }).then(({ value, action }) => {
        if (ws == "phone") {
          let reg = /^1[3456789]\d{9}$/;
          if (reg.test(value)) {
            this.axios
              .post("/api/modify", `uid=${this.uid}&uphone=${value}`)
              .then((res) => {
                this.information.uphone = value;
                this.$toast("修改成功");
              });
          } else {
            this.$toast("手机号格式不正确");
          }
        } else if (ws == "nick") {
          this.axios
            .post("/api/modify", `uid=${this.uid}&unick=${value}`)
            .then((res) => {
              this.information.unick = value;
              this.$toast("修改成功");
            });
        } else {
          if (value) {
            this.axios
              .post("/api/modify", `uid=${this.uid}&uaddress=${value}`)
              .then((res) => {
                this.information.uaddress = value;
                this.$toast("修改成功");
              });
          } else {
            this.$toast("地址不能为空");
          }
        }
      });
    },
    setGender() {
      this.axios
        .post("/api/modify", `uid=${this.uid}&ugender=${this.sex}`)
        .then((res) => {
          this.information.ugender = this.sex;
          this.$toast("修改成功");
          this.set("gender");
        });
    },
    gender(p, i) {
      this.sex = i[0];
    },
    exit() {
      this.isLogin("");
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState(["uid"]),
  },
};
</script>

<style scoped>
.header {
  background-color: #1998c5;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.avatar {
  width: 30%;
  margin: 0 auto;
  text-align: center;
}
.avatar > img {
  width: 100%;
  border-radius: 50%;
}
.header ul {
  display: flex;
  justify-content: space-around;
}
.header li > div:first-child {
  font-size: 10px;
  margin-bottom: 5px;
}
.header li > div:last-child,
.nickname {
  font-size: 20px;
}
.header li:nth-child(2) {
  border-right: 1px solid #fff;
}
.header li:not(:nth-child(2)) {
  color: #fff;
  text-align: center;
}
.btn {
  margin-top: 30px;
  margin-bottom: 50px;
}
.nickname {
  color: #fff;
  margin-top: 10px;
}
.picker-slot-wrapper {
  width: 100% !important;
}
.confirm,
.cancel {
  font-size: 20px;
}
.cancel {
  float: left;
  margin: 5px 0 0 5px;
  color: red;
}
.confirm {
  float: right;
  margin: 5px 5px 0 0;
  color: #7de03b;
}
.file {
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 100;
  opacity: 0;
}
.icon {
  width: 25px;
  margin-bottom: -5px;
  margin-left: 5px;
}
</style>