<template>
  <!--还款方式 -->
  <van-cell>
    <template #title>
      <span class="custom-title">还款方式</span>
    </template>
    <template #extra>
      <van-checkbox-group v-model="repaymentMethod" :max="1" direction="horizontal">
        <van-checkbox name="a" @click="$store.commit('repaymentMethod','a')">等额本息</van-checkbox>
        <van-checkbox name="b" @click="$store.commit('repaymentMethod','b')">等额本金</van-checkbox>
      </van-checkbox-group>
    </template>
  </van-cell>
  <!-- 公积金贷款总额 -->
  <van-field v-model="providentFundLoansTotal" type="number" label="公积金贷款总额" input-align="right" style="white-space: nowrap;" placeholder="请输入公积金贷款总额">
    <template #extra>万元</template>
  </van-field>
  <!-- 公积金贷款期限 -->
  <van-cell-group>
    <van-field title="贷款期限" label="贷款期限" readonly>
      <template #extra>{{ providentFundLoanTerm }}年({{ providentFundLoanTerm * 12 }}期)</template>
    </van-field>
    <van-field name="slider">
      <template #input>
        <van-slider  style="width: 80%;margin-left: 10%;" v-model="providentFundLoanTerm" step="1" min="1" max="30" button-size="15"/>
      </template>
      <template #extra>{{ providentFundLoanTerm }}年</template>
    </van-field>
  </van-cell-group>
  <!--  公积金贷款利率 弹出界面按钮-->
  <van-cell title="公积金贷款利率" is-link :value="`${providentFundLoanInterestRate}%`" clickable @click="$router.replace('/custom/gjj')"/>
</template>

<script>
export default {
  name: "Gjjdk",
  computed: {
    repaymentMethod() {
      return this.$store.state.repaymentMethod;
    },
    providentFundLoansTotal: {
      get() {
        return this.$store.state.providentFundLoansTotal;
      },
      set(value) {
        this.$store.commit('providentFundLoansTotal', value);
      }
    },
    providentFundLoanTerm: {
      get() {
        return this.$store.state.providentFundLoanTerm;
      },
      set(val) {
        this.$store.commit('providentFundLoanTerm', val);
      }
    },
    providentFundLoanInterestRate() {
      return this.$store.state.providentFundLoanInterestRate;
    },
  },
}
</script>

<style scoped>

</style>