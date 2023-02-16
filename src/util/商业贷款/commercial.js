//房贷计算器
/*商业贷款*/
import {Toast} from "vant";

//贷款总额
function commercialLoanTotal(storeState) {
    let loanTotal = null;
    let calcType = storeState.commercialCalculationMethod;
    switch (calcType) {
        case "a":
            console.log('商业贷款计算方式:按总额');
            storeState.commercialLoansTotal && (loanTotal = storeState.commercialLoansTotal * 10000);
            break;
        case "b":
            console.log('商业贷款计算方式:按单价');
            loanTotal = storeState.commercialLoansTotalTypeB;
            break;
        default:
            console.log('未知的贷款选项');
    }
    //处理错误
    if (calcType === 'a' && loanTotal === null) {
        Toast('请输入贷款总额');
    } else if (calcType === 'b' && loanTotal === null) {
        Toast('请输入正确单价和面积信息');
    } else {
        return loanTotal;
    }

}

//贷款期限
function commercialLoanTerm(storeState) {
    return storeState.commercialLoanTerm;
}

//贷款利率
function commercialLoanRate(storeState) {
    let rate = 0;
    let rateMode = storeState.commercialLoanInterestRateMethod;
    switch (rateMode) {
        case "a":
            console.log('商业贷款利率方式:按最新LPR');
            rate = storeState.commercialLoanLPRInterestRate;
            break;
        case "b":
            console.log('商业贷款利率方式:按旧版');
            rate = storeState.oldCommercialLoanLPRBenchmark;
            break;
        default:
            console.log('未知的贷款选项');
    }
    return rate;
}

export {
    commercialLoanTotal,
    commercialLoanTerm,
    commercialLoanRate,
}