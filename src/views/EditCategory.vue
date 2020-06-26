<template>
  <div>
    <nav-bar></nav-bar>
    <van-divider
      dashed
      :style="{ color: '#1a73e8', borderColor: '#1a73e8', padding: '0 16px' }"
      >现有栏目</van-divider
    >
    <div class="new-category newcategory">
      <p
        @click="handleCategoryClick(index)"
        v-for="(item, index) in newCat"
        :key="index"
      >
        {{ item.title }}
      </p>
    </div>
    <van-divider
      dashed
      :style="{ color: '#ee0a24', borderColor: '#ee0a24', padding: '0 16px' }"
      >已删除栏目</van-divider
    >
    <div class="new-category delcategory">
      <p
        @click="deleteCategoryClick(index)"
        v-for="(item, index) in delCat"
        :key="index"
      >
        {{ item.title }}
      </p>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/Navbar.vue";
export default {
  data() {
    return {
        // 已有栏目
      newCat: [],
      // 已删除栏目
      delCat: [],
    };
  },
  components: {
    NavBar,
  },
  methods: {
      // 获取栏目数据
    async SelectCategory() {
      const res = await this.$http.get("/category");
      this.newCat = res.data;
    },
    // 点击删除栏目数据
    handleCategoryClick(index) {
        // 至少保留三个栏目
      if (this.newCat.length < 4) {
        this.$toast.fail("最少保留三个栏目");
        return;
      }
      this.delCat.push(this.newCat[index]);
      this.newCat.splice(index, 1);
    },
    // 点击添加栏目数据
    deleteCategoryClick(index) {
      this.newCat.push(this.delCat[index]);
      this.delCat.splice(index, 1);
    },
  },
  watch: {
      // 监听栏目变化
    newCat() {
        // 存储数据到 localStorage
      localStorage.setItem("newCat", JSON.stringify(this.newCat));
      localStorage.setItem("delCat", JSON.stringify(this.delCat));
    },
  },
  created() {
      // 如果能拿到 localstorage 数据 就用 localstorage的数据
    if (localStorage.getItem("newCat") && localStorage.getItem("delCat")) {
      this.newCat = JSON.parse(localStorage.getItem("newCat"));
      this.delCat = JSON.parse(localStorage.getItem("delCat"));
      return;
    }

    this.SelectCategory();
  },
};
</script>

<style lang="less">
.new-category {
  padding: 0 2.778vw;
  display: flex;
  flex-wrap: wrap;
  p {
    width: 20%;
    text-align: center;
    margin: 1.389vw 1.944vw;
    padding: 1.944vw 0vw;
  }
}
.newcategory {
  p {
    color: #1a73e8;
    border: 0.278vw solid #1a73e8;
  }
}
.delcategory {
  p {
    color: #ee0a24;
    border: 0.278vw solid #ee0a24;
  }
}
</style>
