<template>
  <div v-if="model">
    <Navbar />
    <div class="detailInfo">
      <div class="video">
        <video controls :src="videoLink"></video>
      </div>
      <div class="detailInfoText">
        <div>
          <span>{{ model.category.title }}</span>
          <span>{{ model.name }}</span>
        </div>
        <div>
          <span>{{ model.userinfo.name }}</span>
          <span>144万次观看</span>
          <span>3.3万弹幕</span>
          <span>{{ model.date }}</span>
        </div>
        <div>
          <p @click="collection" :class="{ activeColor: collectionActive }">
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </p>
          <p
            @click="subscriptClick"
            :class="{ activeColor: subscritionActive }"
          >
            <span class="icon-bubble"></span>
            <span>关注</span>
          </p>
          <p>
            <span class="icon-redo2"></span>
            <span>分享</span>
          </p>
        </div>
      </div>
      <div class="detailparent">
        <cover
          class="detailItem"
          v-for="(item, index) in commendList"
          :key="index"
          :detailItem="item"
        ></cover>
      </div>
      <commentTitle
        :dataLength="lens"
        @Postcomment="postSuccess"
        ref="commentIpt"
      />
      <comment
        @lengthselect="(len) => (lens = len)"
        ref="commentPulish"
        @publishClick="PostChildClick"
      />
    </div>
  </div>
</template>

<script>
// 导入 顶部导航组件
import Navbar from "@/components/common/Navbar.vue";
// 导入 cover 视频组件
import cover from "@/views/cover.vue";
// 导入评论标题组件
import commentTitle from "@/components/article/commentTitle.vue";
// 导入评论组件
import comment from "@/components/article/comment.vue";
export default {
  data() {
    return {
      // 详情页数据
      model: null,
      // 推荐视频数据
      commendList: null,
      myUser: null,
      // 一个视频链接
      videoLink:
        "https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/60_6c4b1d3160308e7d75b7e0f277b524b6.mp4",
      // 评论长度
      lens: null,
      // 发布评论参数
      Postcom: {
        // 发布内容
        comment_content: "",
        //发布时间
        comment_date: "",
        // 父级id
        parent_id: null,
        // 评论视频id
        article_id: null,
      },
      // 是否收藏
      collectionActive: null,
      // 是否收藏
      subscritionActive: null,
    };
  },
  components: {
    Navbar,
    cover,
    commentTitle,
    comment,
  },
  created() {
    this.articleItemData();
    this.commendData();
    this.collectionInit();
  },
  methods: {
    // 获取当前item数据
    async articleItemData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
      if (this.model) {
        // 获取关注
        this.subscriptInit();
      }
    },
    // 获取推荐视频数据
    async commendData() {
      const res = await this.$http.get("/commend");
      this.commendList = res.data;
    },
    // 发送评论
    async postSuccess(res) {
      let str = this.getTime;
      this.Postcom.comment_content = res;
      this.Postcom.comment_date = str;
      this.Postcom.article_id = this.$route.params.id;
      if (this.Postcom.comment_content.trim().length !== 0) {
        const res = await this.$http.post(
          `/comment_post/${localStorage.getItem("id")}`,
          this.Postcom
        );
        if (res.status === 200) {
          this.$toast("发布评论成功!");
        }
        // 更新数据
        this.$refs.commentPulish.commentData();
        this.Postcom.parent_id = "";
      } else {
        this.$toast("评论内容不能为空哦！");
      }
    },
    // 回复评论
    PostChildClick(id) {
      this.Postcom.parent_id = id;
      this.$refs.commentIpt.focusIpt();
    },
    // 收藏文章
    async collection() {
      if (localStorage.getItem("id") && localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/collection/" + localStorage.getItem("id"),
          {
            article_id: this.$route.params.id,
          }
        );
        if (res.data.msg == "收藏成功") {
          this.collectionActive = true;
        } else {
          this.collectionActive = false;
        }
        this.$toast(res.data.msg);
      }
    },
    // 进入页面获取是否收藏
    async collectionInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/collection/" + localStorage.getItem("id"),
          {
            params: {
              article_id: this.$route.params.id,
            },
          }
        );
        if (res.status === 200) {
          // 把状态赋值
          this.collectionActive = res.data.success;
        }
      }
    },
    // 关注订阅
    async subscriptClick() {
      if (localStorage.getItem("id") && localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/sub_scription/" + localStorage.getItem("id"),
          {
            sub_id: this.model.userid,
          }
        );
        if (res.data.msg == "关注成功") {
          this.subscritionActive = true;
        } else {
          this.subscritionActive = false;
        }
        this.$toast(res.data.msg);
      }
    },
    // 进入页面获取是否关注
    async subscriptInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/sub_scription/" + localStorage.getItem("id"),
          {
            params: {
              sub_id: this.model.userid,
            },
          }
        );
        if (res.status === 200) {
          // 把状态赋值
          this.subscritionActive = res.data.success;
        }
      }
    },
  },
  computed: {
    // 获得发布时间
    getTime() {
      const date = new Date();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let str = `${m}-${d}`;
      return str;
    },
  },
  watch: {
    // 观察 route 的变化
    $route() {
      this.$router.go(0);
    },
  },
};
</script>

<style scoped lang="less">
.detailInfo {
  background-color: #fff;
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
}
.detailInfoText {
  padding: 4.167vw;
  div:nth-child(1) {
    span:nth-child(1) {
      padding: 0 2.778vw;
      margin-right: 2.778vw;
      color: #fb7299;
      background-color: #f4f4f4;
      border-radius: 2.778vw;
    }
  }
  div:nth-child(2) {
    padding: 3.778vw 2.778vw;

    span {
      color: #aaa;
      font-size: 3.333vw;
      margin-right: 7.999px;
    }
    span:nth-child(1) {
      color: #000;
      font-size: 3.5vw;
      padding-right: 2.778vw;
    }
  }
  div:nth-child(3) {
    padding: 0 10.001px;
    display: flex;
    p {
      display: flex;
      align-items: center;
      color: #757575;
      margin-right: 15.001px;
      span:nth-child(1) {
        font-size: 22px;
        padding-right: 2.999px;
      }
      span:nth-child(2) {
        font-size: 11.999px;
      }
    }
    // 收藏成功
    .activeColor {
      color: #fb7299;
    }
  }
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailItem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
.home {
  background-color: #fff;
}
</style>
