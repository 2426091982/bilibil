<template>
  <div>
    <login-top middleTop="登录BiliBili">
      <div slot="right" class="link" @click="$router.push('/register')">
        切换到注册
      </div>
    </login-top>
    <login-text
      label="账号"
      rule="^.{6,16}$"
      placeholder="请输入账号"
      style="margin:4.167vw 0"
      @inputChange="(res) => (model.username = res)"
    />
    <login-text
      label="密码"
      rule="^.{6,16}$"
      placeholder="请输入密码"
      type="password"
      @inputChange="(res) => (model.password = res)"
    />

    <login-btn btnText="登录" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
// 导入导航条
import loginTop from "@/components/common/LoginTop.vue";
// 导入输入框
import loginText from "@/components/common/LoginText.vue";
// 导入按钮组件
import loginBtn from "@/components/common/LoginBtn.vue";

export default {
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
    };
  },
  components: {
    loginTop,
    loginText,
    loginBtn,
  },
  methods: {
    async registerSubmit() {
      let rule = /^.{6,16}$/;
      if (rule.test(this.model.username) && rule.test(this.model.password)) {
        const { data: res } = await this.$http.post("/login", this.model);

        this.$toast(res.msg);
        // 判断 code
        if(res.code == 301 || res.code == 302) return

        console.log(res);

        localStorage.setItem("id", res.id);
        localStorage.setItem("token", res.token);
        setTimeout(() => {
          this.$router.push("/Home");
          this.$router.go(0);
        }, 1000);
      } else {
        this.$toast.fail("格式不正确请重新输入");
      }
    },
  },
};
</script>
<style scoped>
.link {
  font-size: 3.611vw !important;
}
</style>
