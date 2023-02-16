import {commercialLoanRate, commercialLoanTerm, commercialLoanTotal} from "./商业贷款/commercial";
import {providentFundLoanTotal, providentFundLoanTerm, providentFundLoanRate} from "./公积金贷款/providentFund";
import combination from "./组合贷款/combination";

function loanInfo(storeState) {
    let loanTotal = 0;
    let loanTerm = 0;
    let loanRate = 0;
    let loanType = storeState.loanType;
    switch (loanType) {
        case "a":
            console.log('商业贷款');
            loanTotal = commercialLoanTotal(storeState);
            loanTerm = commercialLoanTerm(storeState);
            loanRate = commercialLoanRate(storeState);
            break;
        case "b":
            console.log('公积金贷款');
            loanTotal = providentFundLoanTotal(storeState);
            loanTerm = providentFundLoanTerm(storeState);
            loanRate = providentFundLoanRate(storeState);
            break;
        case "c":
            console.log('组合贷款');
            break;
        default:
            console.log('未知的贷款选项');
    }
    //组合贷款判断
    if (loanType == 'c') {
        return combination(storeState);
    } else {
        if (loanTotal && loanTerm && loanRate) {
            return {loanTotal, loanTerm, loanRate};
        }
    }
}

export default loanInfo;