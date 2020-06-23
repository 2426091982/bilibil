<template>
  <div
    v-if="detailItem"
    class="detailItem"
    @click="pathPush"
  >
    <div class="imgParent">
      <img :src="detailItem.img" alt="" style="width:100%;height:100%" />
      <div class="bottom">
        <div class="icon-play2"><span class="video ">127万</span></div>
        <div class="icon-file-text">
          <span class="comment">{{ detailItem.commentlen }}</span>
        </div>
      </div>
    </div>
    <p>{{ detailItem.name }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["detailItem"],
  methods: {
    pathPush() {
      // 判断是否重复跳转路径
      if(this.$route.path != '/Article/' + this.detailItem.id) {
      this.$router.push('/Article/' + this.detailItem.id)
      }
    }
  },

};
</script>

<style lang="less" scoped>
.detailItem {
  position: relative;
  p {
    font-size: 3.333vw;
    padding: 0.833vw 0;
  }
}
.imgParent {
  position: relative;
  .bottom {
    padding: 4px 10px;
    margin-bottom: 1.389vw;
    position: absolute;
    bottom: 0.556vw;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
    justify-content: space-between;
    color: white;
    display: flex;
    left: 0;
    right: 0;
  }
}
</style>
