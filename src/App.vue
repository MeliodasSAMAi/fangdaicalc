<template>
  <van-nav-bar fixed :left-text="($route.path == '/land')?'':'返回'" :left-arrow="!($route.path == '/land')" @click-left="$router.replace($store.state.lastPath)" title="房贷计算器"/>
  <van-config-provider :theme-vars="themeVars">
    <div style="padding-top: 46px;">
      <router-view></router-view>
    </div>
  </van-config-provider>
</template>

<script>
import lpr from "../public/lpr";
export default {
  name: 'App',
  data() {
    return {
      themeVars: {
        tabsBottomBarColor: 'red',
        checkboxCheckedIconColor: 'red',
        sliderActiveBackgroundColor: 'red',
        buttonPrimaryBorderColor: 'red',
        buttonPrimaryBackgroundColor: 'red',
      }
    }
  },
  created() {
    this.setLPR();
  },
  mounted() {
    window.changeTheme = this.changeThemeVars;
  },
  methods: {
    changeThemeVars(themeColor) {
      for (const argumentsKey in this.themeVars) {
        this.themeVars[argumentsKey] = themeColor.toString();
      }
      this.$store.state.themeColor = themeColor.toString();
    },
    setLPR(){
      this.$store.commit('commercialLoanLPRBenchmark',lpr.lprRate);
      this.$store.commit('providentFundLoanInterestRate',lpr.gjjRate);
    }
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
}
</style>
