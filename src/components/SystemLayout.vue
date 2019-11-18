<template>
  <div class="layoutPage">
    <el-scrollbar style="height: 100%;">
      <bread-crumb></bread-crumb>
      <router-view/>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
      return {
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
</style>