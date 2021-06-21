class Currency {
    constructor() {
        this.currency = document.querySelector("#currency");
        this.dictionary = {
            USD: "$",
            EUR: "€"
        }
    }
    get currencyValue() {
        return this.currency.value;
    }
    getCurrencySymbol() {
        return this.dictionary[this.currencyValue]
    }

}

const currencyUI = new Currency();

export default currencyUI;