
const calcFee = function(status) {
    let fee = 0;
    fee = status === 'paid' ? 3 : 5;
    return fee; 
}

const discountFee = function(status, price) {
    const fee = calcFee(status);
    const discount = price * fee / 100;
    return price - discount
}

const calculatePaymentDate = function(status, createdAt) {
    if (status === 'paid') {
        return new Date(createdAt);
    }
    var result = new Date(createdAt);
    result.setDate(result.getDate() + 30);
    return result;
}

const checkCardType = function(type) {
    let cardType = '';
    cardType = type === 'debit' ? 'paid' : 'waiting_funds';
    return cardType
} 

module.exports = {
    calcFee,
    checkCardType,
    discountFee,
    calculatePaymentDate
}