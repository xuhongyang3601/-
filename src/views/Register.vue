<template>
  <div class="container">
    <mt-header title="注册">
      <mt-button icon="back" slot="left" @click="$router.push('/')"></mt-button>
    </mt-header>
    <div class="top">
      <table></table>
      <span class="s1">齐心协力</span>
      <span class="s2">防控疫情</span>
    </div>
    <div>
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
      <mt-field
        class="m1"
        type="password"
        placeholder="请再次输入密码"
        v-model="password1"
        :state="cpwdState"
        :attr="{ maxlength: 8 }"
        @blur.native.capture="checkCpwd"
      >
        <img src="../assets/login/me.png" slot="icon" />
      </mt-field>
      <mt-button class="button" size="large" @click="login">
        立即注册
      </mt-button>
    </div>
    <div class="bottom">
      <span>
        <router-link to="/login" class="ro">立即登录</router-link>
      </span>
    </div>
  </div>
</template>
<style scoped>
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
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    //返回用户登录的初始状态
    return {
      username: "",
      password: "",
      password1: "",
      usernameState: "",
      upwdState: "",
      cpwdState: "",
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
    // 3.确认密码是否正确
    checkCpwd() {
      if (this.password == this.password1) {
        this.cpwdState = "success";
        return true;
      } else {
        this.cpwdState = "error";
        this.$toast({
          message: "密码不一致",
          position: "middle",
          duration: 2000,
        });
        return false;
      }
    },

    // 4.注册验证
    login() {
      if (this.checkUser() && this.checkUpwd() && this.checkCpwd()) {
        // this.$messagebox("注册提示", "用户注册成功");
        this.axios
          .post(
            "/api/register",
            "username=" + this.username + "&password=" + this.password
          )
          .then((res) => {
            // 如果服务器响应信息中的code=400的情况下,表示用户已经存在
            if (res.data.code == 400) {
              this.$messagebox("注册提示", "用户已经存在");
            } else {
              this.axios
                .get(`/api/islogin?uname=${this.username}`)
                .then((res) => {
                  this.isLogin(res.data.result[0].uid);
                  sessionStorage.setItem("uid", res.data.result[0].uid);
                  this.$toast("注册成功");
                  this.$router.push("/me");
                });
            }
          });
      }
    },
  },
};
</script>
