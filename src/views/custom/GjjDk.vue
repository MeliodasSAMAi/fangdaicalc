<template>
  <div class="title">自定义</div>
  <div class="input">
    <div>
      <input type="number" v-model="providentFundLoanInterestRate">% X <input type="number" v-model="multiple"> 倍 =
      <input type="number"
             :value="providentFundLoanInterestRate*multiple">
      %
      <van-button type="primary" size="small" @click="confirmClick">确定</van-button>
    </div>
  </div>
  <div class="title">或选择公积金利率</div>
  <div class="select-contain">
    <div class="select-item" :class="(item === providentFundLoanInterestRate)?'active':''" v-for="(item,i) in list"
         :key="i"
         v-text="`最新公积金贷款基准利率(${item}%)`"
         @click="providentFundLoanInterestRate = item"></div>
  </div>
</template>

<script>
export default {
  name: "GjjDk",
  data() {
    return {
      lastPath: '',
      multiple: 1,
      list: [3.25, 3.9, 3.58]
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.lastPath = from.path;
    });
  },
  computed: {
    providentFundLoanInterestRate: {
      get() {
        return this.$store.state.providentFundLoanInterestRate;
      },
      set(value) {
        this.$store.commit('providentFundLoanInterestRate', value);
      }
    }
  },
  methods: {
    confirmClick() {
      this.$store.commit('providentFundLoanInterestRate', this.providentFundLoanInterestRate * this.multiple);
      this.$router.replace(this.lastPath);
    }
  }
}
</script>

<style scoped>
.title {
  padding-left: 20px;
  width: 100vw;
  height: 50px;
  line-height: 50px;
  color: #666;
  font-size: 16px;
  font-weight: bold;
  background-color: #eee;
}

.input {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  justify-items: center;
  align-content: center;
  align-items: center;
  padding-left: 20px;
}

.input input {
  border: 0;
  color: gray;
  width: 10vw;
  display: inline-block;
}

.select-contain {
  padding-left: 20px;
}

.select-item {
  height: 40px;
  line-height: 40px;
}

.select-item::after {
  margin-left: -20px;
  content: '';
  display: block;
  width: 100vw;
  height: 1px;
  transform: scaleY(0.2);
  background-color: gray;
}

.active {
  color: red;
}
</style>