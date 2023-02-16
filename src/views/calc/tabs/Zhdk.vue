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
  <!-- 商业贷款总额 -->
  <van-field v-model="commercialLoansTotal" type="number" label="商业贷款总额" input-align="right" placeholder="请输入商贷总额">
    <template #extra>万元</template>
  </van-field>
  <!-- 商业贷款期限 -->
  <van-cell-group>
    <van-field title="贷款期限" label="贷款期限" readonly>
      <template #extra>{{ commercialLoanTerm }}年({{ commercialLoanTerm * 12 }}期)</template>
    </van-field>
    <van-field name="slider">
      <template #input>
        <van-slider  style="width: 80%;margin-left: 10%;" v-model="commercialLoanTerm" step="1" min="1" max="30" button-size="15"/>
      </template>
      <template #extra>{{ commercialLoanTerm }}年</template>
    </van-field>
  </van-cell-group>
  <!-- 利率方式 -->
  <van-cell title="利率方式" is-link :value="(commercialLoanInterestRateMethod == 'a')?'按最新LPR':'按旧版基准利率'" clickable
            @click="$store.commit('lprActionSheetExhibition',true)"/>
  <!--      ------------------start 最新版LPR start-----------  -->
  <template v-if="commercialLoanInterestRateMethod == 'a'">
    <!-- LPR -->
    <van-field v-model="commercialLoanLPRBenchmark" type="number" label="LPR" input-align="right" placeholder="请输入利率">
      <template #label>LPR
        <van-icon name="question-o" size="17" @click="$store.commit('whatLPRShow',true)"/>
      </template>
      <template #extra>%</template>
    </van-field>
    <!-- 基点 -->
    <van-field v-model="commercialLoanLPRBasisPoints" type="number" label="基点" input-align="right" placeholder="请输入基点">
      <template #extra>BP‱</template>
    </van-field>
    <!-- 利率 -->
    <van-field type="string" label="利率" input-align="right" readonly>
      <template #extra>{{ commercialLoanLPRBenchmark }}%+{{ commercialLoanLPRBasisPoints }}‱={{
          commercialLoanLPRInterestRate.toFixed(2)
        }}%
      </template>
    </van-field>
  </template>
  <!--      ------------------end 最新版LPR end-----------  -->
  <!--      -------------------旧版基准利率-----------------  -->
  <template v-if="commercialLoanInterestRateMethod == 'b'">
    <van-cell title="利率方式" is-link :value="`${oldCommercialLoanLPRBenchmark}%`" clickable
              @click="$router.replace('/custom/sy')"/>
  </template>
  <!--      -------------------end 旧版基准利率 end-----------------  -->

  <!-- 公积金贷款总额 -->
  <van-field v-model="providentFundLoansTotal" type="number" label="公积金贷款总额" input-align="right"
             style="white-space: nowrap;" placeholder="请输入公积金贷款总额">
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
  <van-cell title="公积金贷款利率" is-link :value="`${providentFundLoanInterestRate}%`" clickable
            @click="$router.replace('/custom/gjj')"/>
</template>

<script>
export default {
  name: "Zhdk",
  watch: {
    commercialLoanLPRBenchmark(val) {
      let lprRate = val + this.commercialLoanLPRBasisPoints / 100;
      this.$store.commit('commercialLoanLPRInterestRate', lprRate);
    },
    commercialLoanLPRBasisPoints(val) {
      let lprRate = this.commercialLoanLPRBenchmark + val / 100;
      this.$store.commit('commercialLoanLPRInterestRate', lprRate);
    }
  },
  computed: {
    repaymentMethod() {
      return this.$store.state.repaymentMethod;
    },
    //商业贷款
    commercialLoansTotal: {
      get() {
        return this.$store.state.commercialLoansTotal;
      },
      set(val) {
        this.$store.commit('commercialLoansTotal', val);
      }
    },
    commercialLoanTerm: {
      get() {
        return this.$store.state.commercialLoanTerm;
      },
      set(val) {
        this.$store.commit('commercialLoanTerm', val);
      }
    },
    commercialLoanInterestRateMethod() {
      return this.$store.state.commercialLoanInterestRateMethod;
    },
    commercialLoanLPRBenchmark: {
      get() {
        return this.$store.state.commercialLoanLPRBenchmark;
      },
      set(value) {
        this.$store.commit('commercialLoanLPRBenchmark', value);
      }
    },
    commercialLoanLPRInterestRate() {
      return this.$store.state.commercialLoanLPRInterestRate;
    },
    commercialLoanLPRBasisPoints: {
      get() {
        return this.$store.state.commercialLoanLPRBasisPoints;
      },
      set(val) {
        this.$store.commit('commercialLoanLPRBasisPoints', val);
      }
    },
    oldCommercialLoanLPRBenchmark() {
      return this.$store.state.oldCommercialLoanLPRBenchmark;
    },
    //公积金贷款
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
  methods: {}
}
</script>

<style scoped>

</style>