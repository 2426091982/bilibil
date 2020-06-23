<template>
  <div class="comment">
    <p class="comment-title">
      <span>评论</span>
      <span>(999+)</span>
    </p>
    <div class="commentMyInfo">
      <img :src="myUser.user_img" v-if="myUser" />
      <img src="@/assets/default_img.jpg" alt="" v-else />
      <input type="text" placeholder="在这留下你的足迹" />
      <button @click="commentPublish">发表</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myUser: '',
    };
  },
  created() {
    if(localStorage.getItem('token')) {
      this.myUserinfo();
    }
  },
  methods: {
    // 获取自己的数据
    async myUserinfo() {

        const res = await this.$http.get("/user/" + localStorage.getItem("id"));
        this.myUser = res.data[0];
    },
    // 发布评论
    commentPublish() {
      if (
        !this.myUser &&
        !localStorage.getItem("token") &&
        !localStorage.getItem("id")
      ) {
        this.$toast("请先登录!");
      }


    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  padding: 8.333vw 2.778vw 0 2.778vw;
  .comment-title {
    span:nth-child(2) {
      color: #aaa;
      margin-left: 2.778vw;
    }
  }
  .commentMyInfo {
    padding: 2.778vw 0;
    display: flex;
    align-items: center;
    img {
      width: 7.944vw;
      height: 7.944vw;
      border-radius: 50%;
    }
    input {
      border: 0;
      outline: none;
      background-color: #f4f4f4;
      border-radius: 3.611vw;
      font-size: 3.333vw;
      padding: 5px 5.556vw 5px 4.167vw;
    }
    button {
      outline: none;
      border: 0;
      border-radius: 12px;
      background-color: #fb7299;
      color: #fff;
      font-size: 12px;
      padding: 5px 10px;
    }
  }
}
</style>
