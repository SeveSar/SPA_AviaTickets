// VIEWS - здесь храняться все сущности которые работают с разметкой
import locations from "../store/locations";
import {getAutocompletesInstance,getDatepickersInstance} from "../plugins/materialize";
class FormUI {
    constructor(autocompletesInstance, datepickersInstance) {
        this._form = document.forms['locationControls'];
        this.origin = document.getElementById("autocomplete-origin");
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-depart');
        this.return = document.getElementById('datepicker-return');
        this.originAutocomplete = autocompletesInstance(this.origin);
        this.destinationAutocomplete = autocompletesInstance(this.destination);
        this.departDatePicker = datepickersInstance(this.depart);
        this.returnDatePicker = datepickersInstance(this.return);
    }
    // get чтобы мы могли навешовать event на форму
    get form() {
        return this._form;
    }
    get originValue() {
        return this.origin.value
    }
    get destinationValue() {
        return this.destination.value
    }
    get departDateValue() {
        return this.depart.value
    }
    get returnDateValue() {
        return this.return.value
    }
    setAutocompleteData(data) {
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}

const formUI = new FormUI(getAutocompletesInstance, getDatepickersInstance);
export default formUI;
