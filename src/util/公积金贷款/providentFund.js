//房贷计算器
/*公积金贷款*/
import {Toast} from "vant";

//贷款总额
function providentFundLoanTotal(storeState) {
    let loanTotal = null;
    //处理错误
    if (storeState.providentFundLoansTotal == null) {
        Toast('请输入贷款总额');
    } else {
        loanTotal = storeState.providentFundLoansTotal * 10000
        return loanTotal;
    }
}

//贷款期限
function providentFundLoanTerm(storeState) {
    return storeState.providentFundLoanTerm;
}

//贷款利率
function providentFundLoanRate(storeState) {
    let rate = 0;
    rate = storeState.providentFundLoanInterestRate;
    return rate;
}

export {
    providentFundLoanTotal,
    providentFundLoanTerm,
    providentFundLoanRate,
}