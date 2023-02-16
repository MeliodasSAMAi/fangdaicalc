/*组合  商业贷款*/
import {Toast} from "vant";

//贷款总额
function commercialLoanTotal(storeState) {
    let loanTotal = null;
    //处理错误
    if (storeState.commercialLoansTotal === null) {
        Toast('请输入贷款总额');
    } else {
        loanTotal = storeState.commercialLoansTotal * 10000;
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