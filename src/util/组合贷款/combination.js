import {commercialLoanRate, commercialLoanTerm, commercialLoanTotal} from "./getCommercial";
import {providentFundLoanTotal, providentFundLoanTerm, providentFundLoanRate} from "./getProvidentFund";


function combination(storeState) {
    //组合商业部分
    let commercialTotal = commercialLoanTotal(storeState);
    let commercialTerm = commercialLoanTerm(storeState);
    let commercialRate = commercialLoanRate(storeState);
    //组合公积金部分
    let providentFundTotal = providentFundLoanTotal(storeState);
    let providentFundTerm = providentFundLoanTerm(storeState);
    let providentFundRate = providentFundLoanRate(storeState);
    if (commercialTotal && commercialTerm && commercialRate && providentFundTotal && providentFundTerm && providentFundRate) {
        return [{commercialTotal, commercialTerm, commercialRate}, {
            providentFundTotal,
            providentFundTerm,
            providentFundRate
        }];
    }
}

export default combination;