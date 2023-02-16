<template>
  <div class="title">自定义</div>
  <div class="input">
    <div>
      <input type="number" v-model="oldCommercialLoanLPRBenchmark">% X <input type="number" v-model="multiple"> 倍 =
      <input
          type="number"
          :value="oldCommercialLoanLPRBenchmark*multiple">
      %
      <van-button type="primary" size="small" @click="confirmClick">确定</van-button>
    </div>
  </div>
  <div class="title">或选择贷款利率</div>
  <div class="select-contain">
    <div class="select-item" :class="(item === oldCommercialLoanLPRBenchmark)?'active':''" v-for="(item,i) in list"
         :key="i"
         v-text="`最新商业贷款基准利率(${item}%)`"
         @click="oldCommercialLoanLPRBenchmark = item"></div>
  </div>
</template>

<script>
export default {
  name: "SyDk",
  data() {
    return {
      lastPath: '',
      multiple: 1,
      list: [4.9, 6.86, 5.88, 5.64, 5.39, 5.15, 4.66, 4.41, 4.17, 3.92, 3.43]
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.lastPath = from.path;
    });
  },
  computed: {
    oldCommercialLoanLPRBenchmark: {
      get() {
        return this.$store.state.oldCommercialLoanLPRBenchmark;
      },
      set(value) {
        this.$store.commit('oldCommercialLoanLPRBenchmark', value);
      }
    }
  },
  methods: {
    confirmClick() {
      this.$store.commit('oldCommercialLoanLPRBenchmark', this.oldCommercialLoanLPRBenchmark * this.multiple);
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