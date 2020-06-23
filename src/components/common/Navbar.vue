<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div>
      <p>
        进入神奇二刺猿！
        <van-icon class="ipt-icon" name="search" />
      </p>
    </div>
    <div>
      <img v-if="imgUrl" :src="imgUrl" @click="$router.push('/userinfo')" />
      <img
        v-else
        src="@/assets/default_img.jpg"
        @click="$router.push('/login')"
      />
      <p>下载 App</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: "",
    };
  },
  methods: {
    async NavInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get("/user/" + localStorage.getItem("id"));
        this.imgUrl = res.data[0].user_img;
      }
    },
  },
  mounted() {
    this.NavInit();
  },
};
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 12.5vw;
  background-color: #fff;
  .logo {
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
    }
  }
  div:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 5px;
    p {
      color: #aaa;
      font-size: 11.999px;
      line-height: 25.999px;
      padding-left: 24.998px;
      background-color: #f4f4f4;
      height: 24.998px;
      width: 100%;
      border-radius: 13px;
      position: relative;
      .ipt-icon {
        position: absolute;
        left: 10.001px;
        top: 50%;
        transform: translateY(-50%);
        color: #aaa;
      }
    }
  }
  div:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 24.001px;
      width: 24.001px;
      border-radius: 50%;
    }
    p {
      padding: 5px 10.001px;
      margin: 0 7.999px;
      background-color: #fb7299;
      color: #fff;
      font-size: 13px;
      border-radius: 2.999px;
    }
  }
}
</style>
