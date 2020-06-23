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
          <p>
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </p>
          <p>
            <span class="icon-box-add"></span>
            <span>缓存</span>
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
      <commentTitle />
      <comment />
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
import comment from "@/components/article/comment.vue"
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
    };
  },
  components: {
    Navbar,
    cover,
    commentTitle,
    comment
  },
  created() {
    this.articleItemData();
    this.commendData();
  },
  methods: {
    // 获取当前item数据
    async articleItemData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
    },
    // 获取推荐视频数据
    async commendData() {
      const res = await this.$http.get("/commend");
      this.commendList = res.data;
    },
  },
  watch: {
    $route() {
      this.articleItemData();
      this.commendData();
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
