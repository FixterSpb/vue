import {formatFloat} from "@/formats/formats.ru";

class PriceCalc {
    static getPriceWithoutTax(price, taxRate = 0){
        debugger;
        price = +price.replace(',', '.');

        return (price / (1 + taxRate / 100)).toFixed(2);
    }
    static getPriceTax(price, taxRate){
        return (price - this.getPriceWithoutTax(price, taxRate = 0)).toFixed(2);
    }
}

export default PriceCalc;