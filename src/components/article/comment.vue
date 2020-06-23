<template>
  <div class="commentParent">
    <div>
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
            每天休息的时候就打开主播真会玩，根本不用担心没得看，什么叫群英荟萃，卢本伟，孙亚龙，pdd，大司马，骚男，那时候的主播真会玩根本不担心没有素材，内容爆炸不说，lol,女神篇，守望篇，求生篇，八卦篇，主机篇，简直是主播黄金时代，每天不重样。直到那天开始，就一切都变了。卢本伟被封，pdd抽身而退，孙亚龙苟延残喘，三台柱一个一个倒了。接下来就更有意思了，主播之间竞争不靠谁更能吸引粉丝，而是看谁更符合道德楷模，谁有黑料被人翻出来。
          </div>
        </div>
      </div>
      <comment-item />
    </div>
  </div>
</template>

<script>
// 导入 回复评论组件
import commentItem from './commentItem'
export default {
  data() {
    return {};
  },
  created() {
    this.commentData();
  },
  methods: {
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);

      console.log(res);
    },
  },
  components: {
      commentItem
  }
};
</script>

<style lang="less" scoped>
.commentParent {
  padding: 10px 10px;
  > div {
    border-bottom: 1px solid #e7e7e7;
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
}
</style>
