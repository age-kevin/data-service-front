<template>
  <div id="app">
    <router-view v-if="isRouteAlive" />
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouteAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouteAlive = false
      this.$nextTick(function(){
        this.isRouteAlive = true
      })
    }
  },
  created () {}
}
</script>

<style lang="scss" type="text/css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding:0;
}
body{
  margin: 0;
  padding:0;
  overflow: hidden;
  /*font-size: 14px;*/
}
</style>
