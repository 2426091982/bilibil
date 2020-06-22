<template>
  <div v-if="model" class="editViews">
    <div style="margin-bottom: 4.167vw">
      <!-- 顶部导航 -->
      <Navbar/>
    </div>
    <!-- 个人信息 -->
    <div class="uploadFile">
      <van-uploader
        class="uploadImg"
        preview-size="360px"
        :after-read="afterRead"
      />
      <edit-banner left="头像">
        <img v-if="model.user_img" :src="model.user_img" slot="right" alt="" />
        <img v-else src="@/assets/head_img.jpg" slot="right" alt="" />
      </edit-banner>
    </div>
    <edit-banner left="昵称" @bannerClick="show = true">
      <a href="javascript:;" slot="right">
        {{ model.name }}
      </a>
    </edit-banner>
    <edit-banner left="账号">
      <a href="javascript:;" slot="right">
        {{ model.username }}
      </a>
    </edit-banner>
    <edit-banner left="性别" @bannerClick="gendershow = true">
      <a href="javascript:;" slot="right">
        <div v-if="model.gender == 0">男</div>
        <div v-else>女</div>
      </a>
    </edit-banner>
    <edit-banner left="个性签名" @bannerClick="showText = true">
      <a href="javascript:;" slot="right">
        {{ model.user_desc }}
      </a>
    </edit-banner>

    <!-- 返回按钮 -->
    <div class="editBack" @click="$router.back()">返回个人中心</div>
  
    <!-- 昵称弹出框 -->
    <van-dialog
      v-model="show"
      title="修改昵称"
      show-cancel-button
      @confirm="modifyNameClick"
      @cancel="content = ''"
    >
      <van-field v-model="content" autofocus />
    </van-dialog>
    <!-- 个性前面弹出框 -->
    <van-dialog
      v-model="showText"
      title="修改个性签名"
      show-cancel-button
      @confirm="modifyTextName"
      @cancel="content = ''"
    >
      <van-field v-model="content" type="textarea" autofocus />
    </van-dialog>

    <van-action-sheet
      v-model="gendershow"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
      @select="onSelect"
    />
  </div>
</template>

<script>
// 导入 顶部导航组件
import Navbar from "@/components/common/Navbar.vue";
// 导入信息组件
import EditBanner from "@/components/common/EditBanner.vue";
export default {
  data() {
    return {
      // 修改昵称弹出框
      show: false,
      // 个性签名弹出框
      showText: false,
      // 性别选项
      gendershow: false,
      model: {},
      content: "",
      actions: [
        { name: "男", val: 0 },
        { name: "女", val: 1 },
      ],
    };
  },
  components: {
    Navbar,
    EditBanner,
  },
  created() {
    this.selectUser();
  },
  methods: {
    // 获取用户数据渲染页面
    async selectUser() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      console.log(res);
      this.model = res.data[0];
    },
    // 上传头像触发
    async afterRead(obj) {
      const fromdata = new FormData();
      // 把数据添加到 fromdata
      fromdata.append("file", obj.file);
      const res = await this.$http.post("/upload", fromdata);
      // 修改图片
      this.model.user_img = res.data.url;

      this.userUpdate();
    },
    // 更新用户数据
    async userUpdate() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if(res.data.code === 200) {
        this.$toast.fail('修改成功');
      }
    },
    // 修改昵称
    modifyNameClick() {
      if(this.content.trim().length === 0) {
        return this.$toast.fail('内容不能为空')
      }
      this.model.name = this.content;
      this.userUpdate();
      this.content = "";
    },
    // 修改个性签名
    modifyTextName() {
      if(this.content.trim().length === 0) {
        return this.$toast.fail('内容不能为空')
      }
      this.model.user_desc = this.content;
      this.userUpdate();
      this.content = "";
    },
    // 选中选项
    onSelect(data) {
      this.model.gender = data.val;
      this.userUpdate();
      this.$toast.fail('修改成功');
    },
    // 点击取消
    onCancel() {
      this.$toast.fail('已取消');
    }
  },
};
</script>

<style lang="less" scoped>
.editViews a {
  color: #333;
}
.editViews img {
  width: 12.778vw;
  height: 12.778vw;
  border-radius: 50%;
}
.uploadFile {
  position: relative;
  overflow: hidden;
  .uploadImg {
    opacity: 0;
    position: absolute;
  }
}
.editBack {
  background-color: #fff;
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4.167vw 0;
  font-size: 4vw;
  margin-top: 5.556vw;
}
</style>
