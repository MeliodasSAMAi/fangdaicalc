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
  <!-- 计算方式 -->
  <van-cell>
    <template #title>
      <span class="custom-title">计算方式</span>
    </template>
    <template #extra>
      <van-checkbox-group v-model="commercialCalculationMethod" :max="1" direction="horizontal">
        <van-checkbox name="a" @click="$store.commit('commercialCalculationMethod','a')">按贷款总额</van-checkbox>
        <van-checkbox name="b" @click="$store.commit('commercialCalculationMethod','b')">按单价</van-checkbox>
      </van-checkbox-group>
    </template>
  </van-cell>
  <!--计算方式展示的模块-->
  <!--  直接输入 总额-->
  <template v-if="commercialCalculationMethod == 'a'">
    <!-- 商业贷款总额 -->
    <van-field v-model="commercialLoansTotal" type="number" label="商业贷款总额" input-align="right" placeholder="请输入商贷总额">
      <template #extra>万元</template>
    </van-field>
  </template>
  <!-- (单价*平方数) - 首付 -->
  <template v-if="commercialCalculationMethod == 'b'">
    <!--单价-->
    <van-field v-model="commercialUnitPrice" type="number" label="单价" input-align="right" placeholder="请输入单价">
      <template #extra>元/㎡</template>
    </van-field>
    <!--面积-->
    <van-field v-model="commercialFloorSpace" type="number" label="面积" input-align="right" placeholder="请输入面积">
      <template #extra>㎡</template>
    </van-field>
    <!--首付-->
    <van-cell title="首付" is-link :value="downPaymentCollections[ratioIndex].text" clickable
              @click="downPaymentShow = true"/>
  </template>

  <!-- 贷款期限 -->
  <van-cell-group>
    <van-field title="贷款期限" label="贷款期限" readonly>
      <template #extra>{{ commercialLoanTerm }}年({{ commercialLoanTerm * 12 }}期)</template>
    </van-field>
    <van-field name="slider">
      <template #input>
        <van-slider style="width: 80%;margin-left: 10%;" v-model="commercialLoanTerm" step="1" min="1" max="30" button-size="15"/>
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


  <!--    额外的内容-->
  <teleport to="body">
    <!--      首付比例选择框-->
    <van-popup v-model:show="downPaymentShow" round position="bottom">
      <van-picker
          ref="ratioPicker"
          :default-index="ratioIndex"
          :columns="downPaymentCollections"
          @change="downPaymentChange"
          @cancel="downPaymentCancel"
          @confirm="downPaymentRatioConfirm"
      />
    </van-popup>
  </teleport>

</template>

<script>
export default {
  name: "Sydk",
  data() {
    return {
      /*-----------------计算总额方式----------------------*/
      //2·单价计算
      downPaymentRatio: 2,
      //首付比例
      ratioIndex: 0,
      pickerSelect: 0,
      downPaymentCollections: [
        {
          text: '2成',
          ratio: 0.2,
          index: 0
        },
        {
          text: '3成',
          ratio: 0.3,
          index: 1
        },
        {
          text: '4成',
          ratio: 0.4,
          index: 2
        },
        {
          text: '5成',
          ratio: 0.5,
          index: 3
        },
        {
          text: '6成',
          ratio: 0.6,
          index: 4
        },
        {
          text: '7成',
          ratio: 0.7,
          index: 5
        },
        {
          text: '8成',
          ratio: 0.8,
          index: 6
        },
        {
          text: '9成',
          ratio: 0.9,
          index: 7
        },
      ],
      downPaymentShow: false,
    }
  },
  watch: {
    commercialUnitPrice(value) {
      if (value === "") {
        this.$store.commit('commercialLoansTotalTypeB', null);
      } else {
        this.downPaymentTotal();
      }
    },
    commercialFloorSpace(value) {
      if (value === "") {
        this.$store.commit('commercialLoansTotalTypeB', null);
      } else {
        this.downPaymentTotal();
      }
    },
    commercialLoanLPRBenchmark: {
      handler(val) {
        let lprRate = val + this.commercialLoanLPRBasisPoints / 100;
        this.$store.commit('commercialLoanLPRInterestRate', lprRate);
      },
      immediate: true
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

    commercialCalculationMethod() {
      return this.$store.state.commercialCalculationMethod;
    },
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
    commercialLoanLPRBasisPoints: {
      get() {
        return this.$store.state.commercialLoanLPRBasisPoints;
      },
      set(val) {
        this.$store.commit('commercialLoanLPRBasisPoints', val);
      }
    },
    commercialUnitPrice: {
      get() {
        return this.$store.state.commercialUnitPrice;
      },
      set(value) {
        this.$store.commit('commercialUnitPrice', value ? Number(value) : value);
      }
    },
    commercialFloorSpace: {
      get() {
        return this.$store.state.commercialFloorSpace;
      },
      set(value) {
        this.$store.commit('commercialFloorSpace', value ? Number(value) : value);
      }
    },
    commercialLoanLPRInterestRate() {
      return this.$store.state.commercialLoanLPRInterestRate;
    },
    oldCommercialLoanLPRBenchmark() {
      return this.$store.state.oldCommercialLoanLPRBenchmark;
    },
  },
  methods: {
    downPaymentChange(e) {
      this.pickerSelect = e.index;
    },
    //计算商业贷款按单价模式 计算总价
    downPaymentTotal() {
      let total = null;
      this.commercialUnitPrice && this.commercialFloorSpace && (total = this.commercialUnitPrice * this.commercialFloorSpace - (this.commercialUnitPrice * this.commercialFloorSpace) * this.downPaymentCollections[this.ratioIndex].ratio);
      this.$store.commit('commercialLoansTotalTypeB', total ? Number(total) : total);
    },
    downPaymentRatioConfirm() {
      this.downPaymentShow = false;
      this.ratioIndex = this.pickerSelect;
      this.downPaymentTotal();
    },
    downPaymentCancel() {
      this.downPaymentShow = false;
      this.pickerSelect = this.ratioIndex;
      this.$refs.ratioPicker.setValues(this.ratioIndex);
    },
  }
}
</script>

<style scoped>

</style>