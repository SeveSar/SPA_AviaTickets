import "materialize-css/dist/css/materialize.min.css"
import "materialize-css/dist/js/materialize.min.js";

// INIT SELECT to work it
const selects = document.querySelectorAll('select');
M.FormSelect.init(selects);

// нам понадобиться получать его значения(селекта) , как то получить его из материалайза


// для вызова каких то методов селекта делаем следующие(есть на документации материалайза)
export function getSelectInstance(elem) {
    return M.FormSelect.getInstance(elem);
}

// init autocomplete

const autocompletes = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocompletes, {
    data: {
        "Apple": null,
        "Microsoft": null,
        "Google": 'https://placehold.it/250x250'
    },
});

export function getAutocompletesInstance(elem) {
    return M.Autocomplete.getInstance(elem);
}

// init datePicker

const datepickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepickers, {
    showClearBtn: true,
    format: 'yyyy-mm'

});

export function getDatepickersInstance(elem) {
    return M.Datepicker.getInstance(elem);
}