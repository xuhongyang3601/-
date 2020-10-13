<template>
  <div>
    <mt-header title="请选择要查看的城市">
      <mt-button icon="back" slot="left" @click="$router.push('/')"></mt-button>
    </mt-header>
    <div id="container">
      <mt-picker :slots="region" @change="selectP"></mt-picker>
      <mt-picker :slots="city" @change="selectC"></mt-picker>
      <mt-button type="primary" size="large" @click="sure">确认</mt-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      region: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center",
        },
      ],
      city: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center",
        },
      ],
      pname: "",
      cname: "",
    };
  },
  methods: {
    ...mapMutations(["add"]),
    selectP(picker, value) {
      this.pname = value[0];
    },
    selectC(picker, value) {
      this.cname = value[0];
    },
    sure() {
      this.add([this.pname, this.cname]);
      sessionStorage.setItem("cname", this.cname);
      sessionStorage.setItem("pname", this.pname);
      this.$router.push("/");
    },
  },
  watch: {
    pname() {
      this.axios
        .get("/api/regioncname", {
          params: {
            pname: this.pname,
          },
        })
        .then((result) => {
          let arr = [];
          result.data.data.forEach((elem) => {
            arr.push(elem.cname);
          });
          this.city[0].values = arr;
        });
    },
  },
  mounted() {
    this.axios.get("/api/regionpname").then((result) => {
      this.region[0].values = result.data.data.pname;
    });
  },
};
</script>

<style scoped>
#container {
  background-color: #83bdff;
  margin: 0;
  padding: 0px 5px;
  min-height: 667px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.picker {
  margin-top: 50px;
  flex: 48%;
}
</style>