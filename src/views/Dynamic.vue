<template>
  <div class="con">
    <mt-header title="动态发布"></mt-header>
    <!-- 这是一个问题 -->
    <!-- <div class="publish" @click="publish"> -->
    <input type="button" class="submit" @click="publish" value="发表" />
    <!-- </div> -->
    <textarea
      cols="25"
      rows="20"
      placeholder="这一刻的想法....."
      v-model="text"
    ></textarea>
    <input
      type="file"
      name="avatar"
      class="input1"
      @change="tirggerFile"
    /><br /><br />
    <a href="javascript:;">+</a>
    <img :src="data" alt="" class="img" v-show="data != ''" />
    <br />
  </div>
</template>
<style  scoped>
.con {
  width: 100%;
  height: 100%;
}

.bottom {
  width: 200px;
  height: 420px;
}
.input1 {
  position: absolute;
  z-index: 120;
  font-size: 40px;
  width: 120px;
  height: 120px;
  opacity: 0;
  margin-left: -120px;
  filter: alpha(opacity=0);
  margin-top: 215px;
}

a {
  display: block;
  height: 100px;
  width: 100px;
  border: 1px solid lightgrey;
  font-size: 30px;
  text-align: center;
  text-decoration: none;
  line-height: 100px;
  color: gray;
  margin-top: 30px;
  margin-left: 230px;
}
.img {
  height: 120px;
  width: 120px;
  margin-top: -150px;
  margin-left: 35px;
}
textarea {
  width: 300px;
  height: 100px;
  font-size: 20px;
  color: black;
  padding: 10px;
  border: 0;
  resize: none;
  background-color: lavender;
  outline: 0;
  margin: 10px 0 0 20px;
}
.publish {
  height: 50px;
}
.submit {
  width: 60px;
  height: 30px;
  outline: 0;
  border: 0;
  color: white;
  background-color: #26cac4;
  font-size: 15px;
  float: right;
  margin-top: 5px;
  margin-right: 10px;
}
</style>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: "",
      e: "",
      text: "",
    };
  },
  methods: {
    tirggerFile(event) {
      var fileList = event.target.files;
      const file = fileList[0];
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file); //监听文件读取结束后事件
        reader.onloadend = (e) => {
          var a = e.target.result;
          this.data = a;
          this.e = event;
        };
      }
    },
    publish() {
      if (!this.uid) {
        this.$router.push("/login");
      } else {
        if (!this.text || !this.data) {
          this.$messagebox("提示信息", "图片内容不能为空");
        } else {
          let formdata = new FormData();
          formdata.append("avatar", this.e.target.files[0]);
          formdata.append("uid", this.uid);
          formdata.append("dtext", this.text);
          this.axios.post("/api//dynamic", formdata).then((res) => {
            this.text = "";
            this.data = "";
            this.$toast("发布成功");
            this.$router.push("/dlist");
          });
        }
      }
    },
  },
  computed: {
    ...mapState(["uid"]),
  },
};
</script>