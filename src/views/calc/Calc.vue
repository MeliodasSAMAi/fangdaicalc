<template>
  <van-cell-group>
    <router-view></router-view>
  </van-cell-group>
  <!--开始计算-->
  <van-field>
    <template #input>
      <van-button type="primary" block style="width: 100%;" @click="calcLoan">开始计算</van-button>
    </template>
  </van-field>

  <!--  弹窗动作  -->
  <teleport to="body">
    <!--LPR 动作面板-->
    <van-action-sheet
        v-model:show="lprActionSheetExhibition"
        :actions="lrpCollections"
        cancel-text="取消"
        close-on-click-action
        @select="lprActionSheetSelect"

    />
    <!-- LPR解释弹出框 -->
    <van-dialog class="whatLPRShow" v-model:show="whatLPRShow" title="什么是LPR？" :showConfirmButton="false"
                :allow-html="true">
      <article>
        <p>
          LPR全称贷款市场报价利率，自2019年10月8日起，新发放商业性个人住房贷款利率以最近一个月相应期限的LPR为定价基准加点行程。每月20日（遇节假日顺延），央行会公布最近一个月期限的LPR数值公众可在央行网站查询。</p>
        <table class="table table-hover" border="1" cellspacing="0">
          <tr>
            <td style="background-color: #efefef; width: 50%">贷款年限</td>
            <td style="background-color: #efefef; width: 50%">LPR</td>
          </tr>
          <tr>
            <td>一年</td>
            <td>一年期LPR</td>
          </tr>
          <tr>
            <td>一至五年</td>
            <td>银行自主选择一年期或五年期LPR</td>
          </tr>
          <tr>
            <td>五年以上</td>
            <td>五年期LPR</td>
          </tr>
        </table>
      </article>
      <van-button size="mini" :color="$store.state.themeColor" @click="$store.commit('whatLPRShow',false)">知道了</van-button>
    </van-dialog>
  </teleport>

</template>

<script>
import loanInfo from "../../util/loanInfo";

export default {
  name: "Calc",
  computed: {
    lprActionSheetExhibition: {
      get() {
        return this.$store.state.lprActionSheetExhibition;
      },
      set(val) {
        this.$store.commit('lprActionSheetExhibition', val);
      }
    },
    lrpCollections() {
      return this.$store.getters.lrpCollections;
    },
    whatLPRShow: {
      get() {
        return this.$store.state.whatLPRShow;
      },
      set(value) {
        this.$store.commit('whatLPRShow', value);
      }
    }
  },
  methods: {
    lprActionSheetSelect(e) {
      this.lrpCollections.forEach(item => {
        if (item.name === e.name) {
          item.color = this.$store.state.themeColor;
        } else {
          item.color = null;
        }
      })
      this.$store.commit('commercialLoanInterestRateMethod', e.mode);
    },
    calcLoan() {
      let loanTotal = loanInfo(this.$store.state);
      if (loanTotal) {
        this.$router.replace('/result');
      } else {
        console.log(loanTotal);
      }
    },
    //  商业贷款 等额本息
    businessLoanTotalLPR() {
      let total = this.$store.state.businessLoanTotal * 10000;
      let time = this.$store.state.commercialLoansTotal * 12;
      let r = (5.25 / 12) / 100;
      let zlx = 0;
      let ze = Number((total * (r * Math.pow((1 + r), time)) / (Math.pow((1 + r), time) - 1)).toFixed(2));
      console.log('总额:', total, '总期数:', time, '月利率', r);
      for (let i = 1; i <= time; i++) {
        console.log(`第${i}期`);
        let lx = Number(((total * 0.0525) / 12).toFixed(2));
        console.log(`  还款金额:`, ze);
        console.log(`  利息:`, lx);
        console.log(`  本金:`, Number((ze - lx).toFixed(2)));
        total -= (Number((ze - lx).toFixed(2)));
        zlx += lx;
      }
      console.log(zlx);
    },
    //本金
    businessLoanTotalLPRbj() {
      let total = this.$store.state.businessLoanTotal * 10000;
      let time = this.$store.state.commercialLoansTotal * 12;
      let zlx = 0;
      let meq = Number((total / time));
      let r = (5.25 / 12) / 100;
      let ygh = 0;
      for (let i = 1; i <= time; i++) {
        console.log(`第${i}期`);
        let me = (total / (time - (i - 1))) + (800000 - ygh) * r;
        me = Number(me);
        let mothLx = Number((me - meq));
        total -= meq;
        ygh += meq;
        console.log('月供总额', me.toFixed(2));
        console.log('月供本金', meq.toFixed(2));
        console.log('月供利息', mothLx.toFixed(2));
        zlx += mothLx;
      }
      console.log(ygh);
      console.log(zlx);
    },
  }
}
</script>

<style scoped>
.whatLPRShow {
  box-sizing: border-box;
  padding: 0 15px;
}

.whatLPRShow .van-dialog__header {
  text-align: left;
  font-size: 16px;
  font-weight: 550;
}

.whatLPRShow article {
  font-size: 14px;
  color: #333;
  text-align: justify;
}

.whatLPRShow .van-dialog__footer {
  display: none !important;
}

.whatLPRShow button {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 40px;
}

.whatLPRShow table {
  width: 100%;
  text-align: center;
  border: none;
  border-collapse: collapse;
  color: #333;
  font-size: 14px;
}

.whatLPRShow table td {
  padding: 12px 10px;
}
</style>