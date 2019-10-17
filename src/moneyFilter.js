export function toMoney(money){
 
    let newMoney = parseFloat(money);
    if(newMoney){
        newMoney = newMoney.toFixed(2)
    }else{
        newMoney=0
        newMoney=newMoney.toFixed(2)
    }
    return newMoney
 
}
