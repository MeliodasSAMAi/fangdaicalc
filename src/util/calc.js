//等额本息

/*
* 已知贷款额为a，月利率为i，年利率为I，还款月数为n，设每月还款额为b，还款利息总和为Y
1：I=12×i
2：Y=n×b－a
3：第一月还款利息为：a×i
第二月还款利息为：〔a－（b－a×i）〕×i=（a×i－b）×（1+i）^1+b
第三月还款利息为：{a－（b－a×i）－〔b－（a×i－b）×（1+i）^1－b〕}×i=（a×i－b）×（1+i）^2+b
第四月还款利息为：=（a×i－b）×（1+i）^3+b
.....
第n月还款利息为：=(a*i-b) * Math.pow(1+i,n-1)+b
求以上和为：Y=（a×i－b）×〔（1+i）^n－1〕÷i+n×b
4：以上两项Y值相等求得
月均还款: b = (a*i*Math.pow(1+i,n)) / (Math.pow(1+i,n) -1)
支付利息: Y = ((n*a*i*Math.pow(1+i,n)) / (Math.pow(1+i,n) -1)) - a
还款总额: (n*a*i*Math.pow(1+i,n)) / (Math.pow(1+i,n) - 1)
注:a^b表示a的b次方。
* */

/*
* 入参 贷款总额,还款期数,利率
* 返回值 支付利息，还款总额
* */
function equalInterest(total, term, rate) {
    // console.log(total, term, rate);
    let i = (rate / 100) / 12;
    let n = term * 12;
    let b = (total * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    let Y = ((n * total * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)) - total;
    let loanTotal = (n * total * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    return {b,Y, loanTotal};
}

function equalInterestDetail(total, term, rate) {
    let list = [];
    let i = (rate / 100) / 12;
    let n = term * 12;
    let b = (total * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    for (let j = 1; j < n + 1; j++) {
        let bRate = (total * i - b) * Math.pow(1 + i, j - 1) + b;
        let bSelf = b - bRate;
        list.push({
            total: b,
            self: bSelf,
            rate: bRate
        })
    }
    return list;
}

//等额本金
/*
* 设贷款额为a，月利率为i，年利率为I，还款月数为n，an第n个月贷款剩余本金a1=a,a2=a-a/n,a3=a-2*a/n...以次类推
还款利息总和为Y
每月应还本金：a/n
每月应还利息：an*i
每期还款a/n +an*i
支付利息Y=(n+1)*a*i/2
还款总额=(n+1)*a*i/2+a
* */

/*
* 入参 贷款总额,还款期数,利率
* 返回值 支付利息，还款总额
* */
function equalPrincipal(total, term, rate) {
    console.log(total, term, rate);
    let i = (rate / 100) / 12;
    let n = term * 12;
    let b = total/n;
    let Y = (n + 1) * total * i / 2;
    let loanTotal = (n + 1) * total * i / 2 + total;
    return {b,Y, loanTotal};
}

function equalPrincipalDetail(total, term, rate) {
    let list = [];
    let loanTotal = total;
    let i = (rate / 100) / 12;
    let n = term * 12;
    let bSelf = loanTotal / n;
    for (let j = 1; j < n + 1; j++) {
        let bRate = loanTotal * i;
        let bTotal = total/n+loanTotal*i;
        loanTotal -= bSelf;
        list.push({
            total: bTotal,
            self: bSelf,
            rate: bRate
        })
    }
    return list;
}

export {
    equalInterest,
    equalPrincipal,
    equalInterestDetail,
    equalPrincipalDetail
}