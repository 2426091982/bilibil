<template>
  <div class="commentItems">
    <div class="commentItem">
      <div class="userImg">
        <img src="@/assets/default_img.jpg" alt="" />
      </div>
      <div class="commentContent">
        <p>
          <span>蜡笔小新</span>
          <span>04-27</span>
        </p>
        <div>
          每天休息的时候就打开主播真会玩，
        </div>
      </div>
    </div>
    <div class="commentItem">
      <div class="userImg">
        <img src="@/assets/default_img.jpg" alt="" />
      </div>
      <div class="commentContent">
        <p>
          <span>蜡笔小新</span>
          <span>04-27</span>
        </p>
        <div>
          多怀念两年之前的日子啊。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.commentItems {
  padding: 0 40px;
}
.commentItem {
  display: flex;
  padding: 5px 0;
  .userImg {
    margin-right: 10px;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }
  .commentContent {
    flex: 1;
    p {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #555;
      margin-bottom: 5px;
    }
    div {
      font-size: 13px;
    }
  }
}
</style>
