<template>
  <div class="commentItems">
    <div class="commentItem" v-for="(item, index) in commentChild" :key="index">
      <!-- 头像 -->
      <div class="userImg">
        <img
          v-if="item.userinfo && item.userinfo.user_img"
          :src="item.userinfo.user_img"
          alt=""
        />
        <img v-else src="@/assets/default_img.jpg" alt="" />
        <!-- 姓名 -->
        <p>
          <span v-if="item.userinfo">{{ item.userinfo.name }}</span>
          <span v-else>此用户无姓名</span>
          <span>{{ item.comment_date }}</span>
        </p>
      </div>
      <div class="commentContent">
        <div v-if="!temp">
          {{ item.comment_content }}
          <span class="publish" @click="PostItemcomment(item.comment_id)"
            >回复</span
          >
        </div>
        <div v-else>
          回复
          <span style="color:#478ef0"> {{ item.parent_user_info.name }} </span
          >： {{ item.comment_content }}
          <span class="publish" @click="PostItemcomment(item.comment_id)"
            >回复</span
          >
        </div>
      </div>
      <!-- 递增组件 -->
      <commentchild-item
        :commentChild="item.child"
        :temp="true"
        @postChild="postChild"
      ></commentchild-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentchildItem",
  data() {
    return {};
  },
  props: ["commentChild", "temp"],
  methods: {
    PostItemcomment(id) {
      // 递增后面
      this.$emit("postChild", id);
      // 二级评论不用递增
      this.$emit("PostPublish", id);
    },
    postChild(id) {
      // 接收递增的再发送
      this.PostItemcomment(id);
      this.$emit("PostPublish", id);
    },
  },
};
</script>

<style lang="less" scoped>
.commentItem {
  display: flex;
  flex-direction: column;
  .userImg {
    display: flex;
    img {
      width: 9.722vw;
      height: 9.722vw;
      border-radius: 50%;
      margin-right: 2.778vw;
    }
    p {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 3.611vw;
      color: #555;
      margin-bottom: 1.389vw;
    }
  }
  .commentContent {
    padding: 2.778vw 0;
    flex: 1;
    div {
      font-size: 3.611vw;
    }
    .publish {
      position: absolute;
      right: 4.167vw;
      color: red;
    }
  }
}
</style>
