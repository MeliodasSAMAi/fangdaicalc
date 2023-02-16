<template>
  <div>
    <van-tabs v-model:active="loanType" border>
      <van-tab title="商业贷款" name="a">
        <Sydk></Sydk>
      </van-tab>
      <van-tab title="公积金贷款" name="b">
        <Gjjdk></Gjjdk>
      </van-tab>
      <van-tab title="组合贷款" name="c">
        <Zhdk></Zhdk>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Sydk from "./tabs/Sydk";
import Gjjdk from "./tabs/Gjjdk";
import Zhdk from "./tabs/Zhdk";

export default {
  name: "Loan",
  components: {
    Sydk,
    Gjjdk,
    Zhdk
  },
  computed: {
    loanType: {
      get() {
        return this.$store.state.loanType;
      },
      set(val) {
        this.$store.commit('loanType', val);
      }

    }
  }
}
</script>

<style scoped>

</style>