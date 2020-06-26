<template>
  <div class="home">
    <!-- 顶部导航 -->
    <Navbar />
    <div class="categorytab">
      <!-- 设置分类图标 -->
      <div class="category-ico" @click="$router.push('/editcategory')">
        <van-icon name="setting-o" />
      </div>
      <!-- 滚动导航 -->
      <van-tabs v-model="active" swipeable sticky>
        <van-tab v-for="item in Category" :key="item.id" :title="item.title">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="我也是有底线的!"
            @load="onLoad"
            :immediate-check="false"
          >
            <div class="detailparent">
              <cover
                class="detailItem"
                :detailItem="cateItem"
                v-for="(cateItem, cateI) in item.list"
                :key="cateI"
              />
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 视频组件 -->
  </div>
</template>

<script>
// 导入 顶部导航组件
import Navbar from "@/components/common/Navbar.vue";
//  导入视频组件
import cover from "@/views/cover.vue";
export default {
  data() {
    return {
      // 导航栏数据
      Category: [],
      // 选中的导航栏
      active: 0,
    };
  },
  components: {
    Navbar,
    cover,
  },
  created() {
    this.selectCategory();
  },
  activated() {
    // 判断是否有 localstorage数据
    if (localStorage.getItem("newCat")) {
      let newCat = JSON.parse(localStorage.getItem("newCat"));
      this.Category = this.changeCategory(newCat);
      this.selectArticle();
    }
  },
  methods: {
    // 获取 category数据
    async selectCategory() {
      // 如果 localstorage有数据return
      if (localStorage.getItem("newCat")) {
        return;
      }
      const res = await this.$http.get("/Category");
      if (res.status !== 200) {
        return;
      }
      this.Category = this.changeCategory(res.data);
      this.selectArticle();
    },
    // 修改 category的数据
    changeCategory(data) {
      const Category1 = data.map((item, i) => {
        item.list = [];
        item.page = 1;
        item.pagesize = 10;
        item.finished = false;
        item.loading = false;
        return item;
      });
      return Category1;
    },
    // 获取视频数据
    async selectArticle() {
      const res = await this.$http.get("/detail/" + this.CategoryItem._id, {
        params: {
          page: this.CategoryItem.page,
          pagesize: this.CategoryItem.pagesize,
        },
      });
      // 把视频数据添加到 list
      this.CategoryItem.list.push(...res.data);
      this.CategoryItem.loading = false;
      // 当没有数据的时候
      if (res.data.length < this.CategoryItem.pagesize) {
        this.CategoryItem.finished = true;
      }
    },
    // 触发 load 事件
    onLoad() {
      setTimeout(() => {
        this.CategoryItem.page++;
        this.selectArticle();
        this.$toast("数据已更新");
      }, 1000);
    },
  },
  watch: {
    active() {
      this.selectArticle();
    },
  },
  computed: {
    // 选中的导航
    CategoryItem() {
      const categoryItem = this.Category[this.active];
      return categoryItem;
    },
  },
};
</script>

<style lang="less" scoped>
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
.categorytab {
  position: relative;
  .category-ico {
    position: absolute;
    z-index: 5;
    right: 0;
    top: 1.944vw;
    padding: 1.389vw 2.778vw;
    background-color: white;
  }
}
</style>
