<template>
  <div style="border: 1px solid lightgray;margin: 10px 20px;">
    <van-tabs v-model:active="repaymentMethod" :line-width="'4em'" border>

      <van-tab title="等额本息" name="a">

        <van-row style="margin-top: 10px;">
          <van-col offset="2" span="20" style="color:#868E9E;font-size: 12px;">每月月供参考(元)</van-col>
        </van-row>
        <van-row style="margin-top: 10px;">
          <van-col offset="2" span="20" style="color:#394259;font-size: 29px;">{{ monthMoney.toFixed(2) }}</van-col>
        </van-row>

        <van-row justify="center" style="margin-top: 20px;">
          <van-col offset="1" span="7" style="color:#868E9E;font-size: 12px;">还款总额(万元)</van-col>
          <van-col span="7" style="color:#868E9E;font-size: 12px;">贷款总额(万元)</van-col>
          <van-col span="7" style="color:#868E9E;font-size: 12px;">支付利息(万元)</van-col>
        </van-row>
        <van-row justify="center" style="margin-top: 10px;">
          <van-col offset="1" span="7" style="color:#394259;font-size: 20px;">{{ (bxTotal / 10000).toFixed(2) }}</van-col>
          <van-col span="7" style="color:#394259;font-size: 20px;">{{ loanTotal }}</van-col>
          <van-col span="7" style="color:#394259;font-size: 20px;">{{ (bxInterestTotal / 10000).toFixed(2) }}</van-col>
        </van-row>

        <van-row style="margin-top: 20px;">
          <van-col offset="2" span="20" style="font-size: small;color:lightgray;">
            等额本息：每月还款额固定，其中本金部分逐月递增、利息部分逐月递减
          </van-col>
        </van-row>

      </van-tab>


      <van-tab title="等额本金" name="b">

        <van-row style="margin-top: 10px;">
          <van-col offset="2" span="20" style="color:#868E9E;font-size: 12px;">每月月供参考(元)</van-col>
        </van-row>
        <van-row style="margin-top: 10px;">
          <van-col offset="2" span="20" style="color:#394259;font-size: 29px;">{{ monthMoney.toFixed(2) }}</van-col>
        </van-row>

        <van-row justify="center" style="margin-top: 20px;">
          <van-col offset="1" span="7" style="color:#868E9E;font-size: 12px;">还款总额(万元)</van-col>
          <van-col span="7" style="color:#868E9E;font-size: 12px;">贷款总额(万元)</van-col>
          <van-col span="7" style="color:#868E9E;font-size: 12px;">支付利息(万元)</van-col>
        </van-row>
        <van-row justify="center" style="margin-top: 10px;">
          <van-col offset="1" span="7" style="color:#394259;font-size: 20px;">{{ (bjTotal / 10000).toFixed(2) }}</van-col>
          <van-col span="7" style="color:#394259;font-size: 20px;">{{ loanTotal }}</van-col>
          <van-col span="7" style="color:#394259;font-size: 20px;">{{ (bjInterestTotal / 10000).toFixed(2) }}</van-col>
        </van-row>

        <van-row style="margin-top: 20px;">
          <van-col offset="2" span="20" style="font-size: small;color:lightgray;">
            等额本金：每月还款额递减，其中本金部分固定、利息部分逐月递减
          </van-col>
        </van-row>

      </van-tab>

    </van-tabs>

    <div style="display: flex;justify-content: center;justify-items: center;margin-top: 20px;">
      <van-button type="primary" round @click="$router.replace('/detail')" v-if="loanType !=='c'">查看月供详情</van-button>
      <van-button type="primary" round @click="$router.replace('/detail/zh/a')" style="margin-right: 5vw;"
                  v-if="loanType == 'c'">商业月供详情
      </van-button>
      <van-button type="primary" round @click="$router.replace('/detail/zh/b')" style="margin-left: 5vw;"
                  v-if="loanType == 'c'">公积金月供详情
      </van-button>
    </div>
    <van-divider></van-divider>
  </div>
</template>

<script>
import loanInfo from "../../util/loanInfo";
import {equalInterest, equalPrincipal} from "../../util/calc";

export default {
  name: "Result",
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path !== '/land') {
        vm.$store.commit('lastPath', '/land');
      } else {
        vm.$store.commit('lastPath', '/land');
      }
    });
  },
  data() {
    return {
      total: 0,
      //等额本息利息
      bxInterestTotal: 0,
      bxTotal: 0,
      //等额本金利息
      bjInterestTotal: 0,
      bjTotal: 0,
      monthMoney: 0
    }
  },
  computed: {
    loanTotal() {
      return (this.total / 10000).toFixed(2);
    },
    loanType() {
      return this.$store.state.loanType;
    },
    repaymentMethod: {
      get() {
        return this.$store.state.repaymentMethod;
      },
      set(val) {
        this.$store.commit('repaymentMethod', val);
      }
    },
  },
  watch: {
    repaymentMethod: {
      handler() {
        this.calcRepayMode();
      },
      immediate: true
    },
  },
  methods: {
    calcRepayMode() {
      let result = loanInfo(this.$store.state);
      if (this.loanType == 'c') {
        //  组合贷款方式
        console.log('组合贷款');
        console.log(result);
        this.total = result[0].commercialTotal + result[1].providentFundTotal;
        if (this.repaymentMethod == 'a') {
          //商业
          let commercialResult = equalInterest(result[0].commercialTotal, result[0].commercialTerm, result[0].commercialRate);
          let commercialRateTotal = commercialResult['Y'];
          let commercialRateB = commercialResult['b'];
          let commercialLoanTotal = commercialResult.loanTotal;
          //公积金
          let providentFundResult = equalInterest(result[1].providentFundTotal, result[1].providentFundTerm, result[1].providentFundRate);
          let providentFundRateTotal = providentFundResult['Y'];
          let providentFundB = providentFundResult['b'];
          let providentFundRateLoanTotal = providentFundResult.loanTotal;

          this.bxInterestTotal = commercialRateTotal + providentFundRateTotal;
          this.bxTotal = commercialLoanTotal + providentFundRateLoanTotal;
          this.monthMoney = commercialRateB + providentFundB;
        } else if (this.repaymentMethod == 'b') {
          let commercialResult = equalPrincipal(result[0].commercialTotal, result[0].commercialTerm, result[0].commercialRate);
          let commercialRateTotal = commercialResult['Y'];
          let commercialRateB = commercialResult['b'];
          let commercialLoanTotal = commercialResult.loanTotal;
          //公积金
          let providentFundResult = equalPrincipal(result[1].providentFundTotal, result[1].providentFundTerm, result[1].providentFundRate);
          let providentFundRateTotal = providentFundResult['Y'];
          let providentFundB = providentFundResult['b'];
          let providentFundRateLoanTotal = providentFundResult.loanTotal;

          this.bjInterestTotal = commercialRateTotal + providentFundRateTotal;
          this.bjTotal = commercialLoanTotal + providentFundRateLoanTotal;
          this.monthMoney = commercialRateB + providentFundB;
        }
      } else {
        this.total = result.loanTotal;
        //普通贷款方式
        if (this.repaymentMethod == 'a') {
          let calcResult = equalInterest(result.loanTotal, result.loanTerm, result.loanRate);
          this.bxInterestTotal = calcResult['Y'];
          this.bxTotal = calcResult.loanTotal;
          this.monthMoney = calcResult['b'];
        } else if (this.repaymentMethod == 'b') {
          let calcResult = equalPrincipal(result.loanTotal, result.loanTerm, result.loanRate);
          this.bjInterestTotal = calcResult['Y'];
          this.bjTotal = calcResult.loanTotal;
          this.monthMoney = calcResult['b'];
        }
      }

    },
  }
}
</script>

<style scoped>

</style>