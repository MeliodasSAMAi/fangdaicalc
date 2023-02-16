import {createStore} from 'vuex'

export default createStore({
    state: {
        //公用
        themeColor: 'red',
        loanType: 'a',
        repaymentMethod: 'a',//还款方式
        //商业贷款
        commercialCalculationMethod: 'a',//商业贷款计算方式
        commercialLoansTotal: null, // 万元
        commercialLoansTotalTypeB: null, //元
        commercialUnitPrice: null,
        commercialFloorSpace: null,
        commercialLoanTerm: 1,
        commercialLoanInterestRateMethod: 'a',//利率模式
        commercialLoanLPRBenchmark: 0, //lpr基准
        commercialLoanLPRBasisPoints: 0,//lpr基点
        commercialLoanLPRInterestRate: 0,//lpr利率
        oldCommercialLoanLPRBenchmark: 4.9, //商业基准利率
        //公积金贷款
        providentFundLoansTotal: null,
        providentFundLoanTerm: 1,
        providentFundLoanInterestRate: 0,
        //组合贷款

        //全局组件 共用状态
        lprActionSheetExhibition: false,
        whatLPRShow:false,
        lastPath:''
    },
    getters: {
        lrpCollections: (state) => {
            return [
                {name: '按最新LPR', mode: 'a', color: state.themeColor},
                {name: '按旧版基准利率', mode: 'b', color: null}
            ];
        }
    },
    mutations: {
        //公用
        loanType: (state, type) => state.loanType = type,
        repaymentMethod: (state, mode) => state.repaymentMethod = mode,
        //商业贷款
        commercialCalculationMethod: (state, mode) => state.commercialCalculationMethod = mode,
        commercialLoansTotal: (state, number) => state.commercialLoansTotal = number?Number(number):null,
        commercialLoansTotalTypeB: (state, number) => state.commercialLoansTotalTypeB = number,
        commercialUnitPrice: (state, price) => state.commercialUnitPrice = price?Number(price):null,
        commercialFloorSpace: (state, space) => state.commercialFloorSpace = space?Number(space):null,
        commercialLoanTerm: (state, term) => state.commercialLoanTerm = term,
        commercialLoanInterestRateMethod: (state, mode) => state.commercialLoanInterestRateMethod = mode,
        commercialLoanLPRBenchmark: (state, benchmark) => state.commercialLoanLPRBenchmark = Number(benchmark),
        commercialLoanLPRBasisPoints: (state, points) => state.commercialLoanLPRBasisPoints = Number(points),
        commercialLoanLPRInterestRate: (state, rate) => state.commercialLoanLPRInterestRate = Number(rate),
        oldCommercialLoanLPRBenchmark: (state, benchmark) => state.oldCommercialLoanLPRBenchmark = benchmark,
        //公积金贷款
        providentFundLoansTotal: (state, number) => state.providentFundLoansTotal = number?Number(number):null,
        providentFundLoanTerm: (state, term) => state.providentFundLoanTerm = term,
        providentFundLoanInterestRate: (state, rate) => state.providentFundLoanInterestRate = rate,
        //组件全局状态共用
        lprActionSheetExhibition: (state, status) => state.lprActionSheetExhibition = status,
        whatLPRShow: (state, status) => state.whatLPRShow = status,
        lastPath: (state, path) => state.lastPath = path,
    },
    actions: {},
    modules: {}
})
