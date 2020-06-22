<template>
  <div>
    <Navbar />
    <div class="detailInfo">
        <div class="video">
            <video controls :src="videoLink"></video>
        </div>
        <div class="detailInfoText">
            <div>jojo的奇妙冒险第四部</div>
            <div>
                <span>{{model.date}}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// 导入 顶部导航组件
import Navbar from "@/components/common/Navbar.vue";
export default {
  data() {
    return {
        // 详情页数据
        model: {
        },
        // 一个视频链接
        videoLink:'https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/60_6c4b1d3160308e7d75b7e0f277b524b6.mp4'
    };
  },
  components: {
      Navbar,
  },
  created() {
      this.articleItemData()
  },
  methods: {
      async articleItemData() {
          const res = await this.$http.get('/article/'+ this.$route.params.id)
          this.model = res.data[0];
      }
  }
};
</script>

<style scoped lang="less">
.detailInfo {
    .video {
        width: 100%;
        video {
            width: 100%;
        }
    }
}
.detailInfoText {
    padding: 4.167vw;
}
</style>
