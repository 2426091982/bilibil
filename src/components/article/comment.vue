<template>
  <div class="commentParent">
    <div v-for="(item, index) in commentList" :key="index">
      <div class="commentItem">
        <div class="userImg">
          <img
            v-if="item.userinfo && item.userinfo.user_img"
            :src="item.userinfo.user_img"
            alt=""
          />
          <img v-else src="@/assets/default_img.jpg" alt="" />
        </div>
        <div class="commentContent">
          <p>
            <span v-if="item.userinfo">{{ item.userinfo.name }}</span>
            <span v-else>用户已注销</span>
            <span>{{ item.comment_date }}</span>
          </p>
          <div>
            {{ item.comment_content }}
            <span class="publish" @click="publishClick(item.comment_id)"
              >回复</span
            >
          </div>
        </div>
      </div>
      <div style="padding-left: 11.111vw">
        <comment-item @PostPublish="publishClick" :commentChild="item.child" />
      </div>
    </div>
  </div>
</template>

<script>
// 导入 回复评论组件
import commentItem from "./commentItem";
export default {
  data() {
    return {
      commentList: null,
    };
  },
  created() {
    this.commentData();
  },
  methods: {
    // 获取评论数据
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      if (res.data) {
        // 向父组件发送评论数
        this.$emit("lengthselect", res.data.length);
      }
      this.commentList = this.changeCommentData(res.data);
    },
    // 修改评论数据
    changeCommentData(data) {
      function fn(temp) {
        let arr1 = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr1;
      }
      return fn(null);
    },
    // 回复评论
    publishClick(id) {
      // 向父组件传递
      this.$emit("publishClick", id);
    },
  },
  components: {
    commentItem,
  },
};
</script>

<style lang="less" scoped>
.commentParent {
  padding: 2.778vw 2.778vw;
  > div {
    border-bottom: 0.278vw solid #e7e7e7;
  }
  .commentItem {
    display: flex;
    align-items: center;
    padding: 1.389vw 0;
    .userImg {
      margin-right: 10px;
      img {
        width: 9.722vw;
        height: 9.722vw;
        border-radius: 50%;
      }
    }
    .commentContent {
      position: relative;
      padding: 2.778vw 0;
      flex: 1;
      p {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 3.611vw;
        color: #555;
        margin-bottom: 1.389vw;
      }
      div {
        font-size: 3.611vw;
      }
      .publish {
        position: absolute;
        right: 0vw;
        color: red;
      }
    }
  }
}
</style>
