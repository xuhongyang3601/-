<template>
  <div class="container">
    <mt-header title="登陆">
      <mt-button icon="back" slot="left" @click="$router.push('/')"></mt-button>
    </mt-header>
    <div class="top">
      <table></table>
      <span class="s1">齐心协力</span>
      <span class="s2">防控疫情</span>
    </div>
    <mt-field
      class="m1"
      type="text"
      placeholder="请输入用户名"
      v-model="username"
      :state="usernameState"
      :attr="{ maxlength: 10 }"
      @blur.native.capture="checkUser"
    ></mt-field>
    <mt-field
      class="m1"
      type="password"
      placeholder="请输入密码"
      v-model="password"
      :state="upwdState"
      :attr="{ maxlength: 8 }"
      @blur.native.capture="checkUpwd"
    ></mt-field>
    <mt-button class="button" size="large" @click="login"> 登录 </mt-button>
    <div class="bottom">
      <span>
        <router-link to="/register" class="ro">没有账号?立即注册</router-link>
      </span>
    </div>
  </div>
</template>
<style  scoped>
.container {
  background-color: #83bdff;
  height: 100%;
}
.top {
  height: 200px;
  margin-bottom: 20px;
}
.bottom {
  height: 200px;
}
.top > span {
  display: block;
  font-size: 30px;
  width: 200px;
  color: white;
}
.s1 {
  margin-top: 60px;
  padding-left: 50px;
}
.s2 {
  padding-left: 100px;
  margin-top: 20px;
}
.m1 {
  width: 250px;
  height: 50px;
  background-color: #83bdff !important;
  margin: 20px auto;
  border: 1px solid #fffddd;
  opacity: 0.7;
}
.button {
  width: 250px;
  height: 45px;
  margin: 20px auto;
  background-color: #26cac4;
  color: white;
}
.ro {
  color: white;
  margin-left: 180px;
  text-decoration: none;
}
</style>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    //返回用户登录的初始状态
    return {
      username: "",
      password: "",
      usernameState: "",
      upwdState: "",
    };
  },
  methods: {
    ...mapMutations(["isLogin"]),
    // 1.检验用户名是否正确
    checkUser() {
      let userRegExp = /^[\w_]{5,10}$/;
      if (userRegExp.test(this.username)) {
        this.usernameState = "success";
        return true;
      } else {
        this.usernameState = "error";
        this.$toast({
          message: "用户名错误",
          position: "middle",
          duration: 2000,
        });
        return false;
      }
    },
    // 2.检验密码是否正确
    checkUpwd() {
      let upwdRegExp = /^[\w_]{6,8}$/;
      if (upwdRegExp.test(this.password)) {
        this.upwdState = "success";
        return true;
      } else {
        this.upwdState = "error";
        this.$toast({
          message: "密码错误",
          position: "middle",
          duration: 2000,
        });
        return false;
      }
    },
    // 3.登录验证
    login() {
      // if (this.username !== "admin88" && this.password !== "admin88") {
      if (this.checkUser() && this.checkUpwd()) {
        this.axios
          .post(
            "/api/login",
            "username=" + this.username + "&password=" + this.password
          )
          .then((res) => {
            if (res.data.code == 200) {
              this.axios
                .get(`/api/islogin?uname=${this.username}`)
                .then((res) => {
                  this.isLogin(res.data.result[0].uid);
                  this.$toast("登录成功");
                  sessionStorage.setItem("uid", res.data.result[0].uid);
                  this.$router.push("/me");
                });
              this.$router.push("/register");
            } else {
              this.$messagebox("登录提示", "用户登录失败");
            }
          });
      }
    },
  },
};
</script>
