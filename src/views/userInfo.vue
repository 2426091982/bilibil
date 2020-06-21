<template>
  <div class="userInfo">
      <Navbar />
      <img src="@/assets/bannerTop_new.png" alt="" class="backImg">
      <userDetail :userInfo="model" />
      <userArticle />
  </div>
</template>


<script>
// 导入头部组件
import Navbar from '@/components/common/Navbar.vue'
// 导入 用户详情组件
import userDetail from '@/components/userComponent/userDetail.vue'
// 导入视频 / 动态组件
import userArticle from '@/components/userComponent/userArticle.vue'
export default {
  data() {
    return {
        model: {}
    }
  },
  components: {
      Navbar,
      userDetail,
      userArticle
  },
  created() {
      this.UserInfoData()
  },
  methods: {
      async UserInfoData() {
          const res = await this.$http.get('/user/'+ localStorage.getItem('id'))
            console.log(res);
            this.model = res.data[0];
      }
  }
}
</script>


<style lang="less" scoped>
 .userInfo {
     .backImg {
         height: 91px;
         width: 100%;
     }
 }
</style>