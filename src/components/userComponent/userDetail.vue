<template>
  <div class="userDetail">
    <div>
      <div class="user_img">
          <img v-if="userInfo.user_img" :src="userInfo.user_img" alt="">
        <img v-else src="@/assets/head_img.jpg" alt="" />
      </div>
      <div class="user_edit">
        <div>
          <p>
            <span>0</span>
            <span class="user_text">粉丝</span>
          </p>
          <p>
            <span>66</span>
            <span class="user_text">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="user_text">获赞</span>
          </p>
        </div>
        <div @click="$router.push('/edit')">
          <div class="user_editBtn">编辑资料</div>
        </div>
      </div>
    </div>
    <div>
      <h2>{{userInfo.name}}</h2>
      <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
      <p v-else>这个人很捞，什么都没有写</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['userInfo']
};
</script>

<style lang="less" scoped>
.userDetail {
  background-color: #fff;
  padding: 0 3.333vw;
  > div:nth-child(1) {
    display: flex;
    align-items: center;

    .user_img {
      margin-right: 5.556vw;
      img {
        height: 23.611vw;
        width: 23.611vw;
        border-radius: 50%;
      }
    }
    .user_edit {
      flex: 1;
      div:nth-child(1) {
        display: flex;
        p {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 3.611vw;
          .user_text {
            color: #aaa;
          }
        }
        p:nth-child(1),
        p:nth-child(2) {
          border-right: 0.278vw solid #ccc;
        }
      }
      div:nth-child(2) {
        padding: 1.389vw 2.778vw 0vw;
        .user_editBtn {
          margin-top: 2.778vw;
          border: 0.278vw solid #fb7a9f;
          color: #fb7a9f;
          padding: 0.556vw;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 1.111vw;
        }
      }
    }
  }
  > div:nth-child(2) {
      h2 {
          font-weight: 400;
          margin: 2.778vw 0 0.833vw 0;
      }
      p {
          padding: 0;
          margin: 2.778vw 0;
          color: #aaa;
      }
  }
}
</style>
