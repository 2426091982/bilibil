<template>
  <div>
    <div class="editBanner" @click="bannerClick">
        <span>{{left}}</span>
        <span>
            <slot  name="right" />
        </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['left'],
  methods: {
      bannerClick() {
          this.$emit('bannerClick')
      }
  }
};
</script>

<style scoped>
.editBanner {
    padding: 4.167vw;
    font-size: 3.889vw;
    background-color: #fff;
    color: #333;
    border-bottom: 0.278vw solid #eee;
    display:flex;
    justify-content: space-between;
    align-items: center;
}
</style>
