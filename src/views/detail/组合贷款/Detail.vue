<template>
  <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <ul>
      <li style="position: sticky;top:46px;background-color: white;">
        <div style="width: 10vw;">期数</div>
        <div>月供总额</div>
        <div>月供本金</div>
        <div>月供利息</div>
      </li>
      <li v-for="(item,i) in detailList" :key="i" :class="(i%2 == 0)?'bg-color':''">
        <div style="width: 10vw;">{{ i + 1 }}</div>
        <div>{{ item.total.toFixed(2) }}</div>
        <div>{{ item.self.toFixed(2) }}</div>
        <div>{{ item.rate.toFixed(2) }}</div>
      </li>
    </ul>
  </van-list>
</template>

<script>
import loanInfo from "../../../util/loanInfo";
import {equalInterestDetail, equalPrincipalDetail} from "../../../util/calc";

export default {
  name: "Detail",
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.type = vm.$route.params.id;
      vm.$store.commit('lastPath', '/result');
    });
  },
  computed: {
    repaymentMethod() {
      return this.$store.state.repaymentMethod;
    },
  },
  data() {
    return {
      active: 2,
      detailList: [],
      loading: false,
      finished: false,
      type: '',
    }
  },
  mounted() {
    this.detailList = [];
  },
  methods: {
    onLoad() {
      // 异步更新数据
      let result = loanInfo(this.$store.state);

      if (this.type == 'a') {
        for (let i = 0; i < result[0].commercialTerm * 12; i++) {
          if (this.repaymentMethod == 'a') {
            this.detailList = equalInterestDetail(result[0].commercialTotal, result[0].commercialTerm, result[0].commercialRate);
          } else if (this.repaymentMethod == 'b') {
            this.detailList = equalPrincipalDetail(result[0].commercialTotal, result[0].commercialTerm, result[0].commercialRate);
          }
        }
      } else {
        for (let i = 0; i < result[1].providentFundTerm * 12; i++) {
          if (this.repaymentMethod == 'a') {
            this.detailList = equalInterestDetail(result[1].providentFundTotal, result[1].providentFundTerm, result[1].providentFundRate);
          } else if (this.repaymentMethod == 'b') {
            this.detailList = equalPrincipalDetail(result[1].providentFundTotal, result[1].providentFundTerm, result[1].providentFundRate);
          }
        }
      }

      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.list.length >= 1) {
        this.finished = true;
      }
    },
  },
}
</script>

<style scoped>
ul {
  width: 100vw;
}

li {
  display: flex;
  justify-content: flex-start;
  justify-items: center;
  align-content: center;
  align-items: center;
  height: 30px;
  font-size: small;
}

li > div {
  flex-shrink: 0;
  width: 30vw;
  text-align: center;
}

.bg-color {
  background-color: whitesmoke;
}
</style>