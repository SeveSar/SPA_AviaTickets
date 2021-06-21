// import api from "../js/services/service";
// api.countries().then((response) => console.log(response))
// api.cities().then((response) => console.log(response))
// стили будут собираться сборщиком и создаваться новый файла
import "../css/style.css"
// мы указываем просто папку(оттуда будет браться index.js)
import './plugins';
import locations from './store/locations';
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticket from './views/ticket'
import favorites from './store/favorites'
document.addEventListener("DOMContentLoaded", () => {
  favorites.isFavorite();
  const form = formUI.form;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  })
  initApp()
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList)
  }
  async function onFormSubmit() {
    if (formUI.originValue && formUI.destinationValue && formUI.departDateValue && formUI.returnDateValue) {
      const origin = locations.getCityCodeByKey(formUI.originValue);
      const destination = locations.getCityCodeByKey(formUI.destinationValue);
      const depart_date = formUI.departDateValue;
      const return_date = formUI.returnDateValue;
      const currency = currencyUI.currencyValue;
      console.log(currencyUI.getCurrencySymbol(currency))
        await locations.fetchTickets({
          origin,
          destination,
          depart_date,
          return_date,
          currency
        });
        ticket.renderTickets(locations.lastSearch);
        [formUI.origin, formUI.destination, formUI.depart, formUI.return].forEach((item) => {
          item.style.borderColor = "#9e9e9e"
        })
    } else {
      [formUI.origin, formUI.destination, formUI.depart, formUI.return].forEach((item) => {
        if (!item.value) {
          item.style.borderColor = 'red'
        } else {
          item.style.borderColor = "#9e9e9e"
        }

      })
    }

  }

  // favorites
  document.body.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('add-favorite')) {
      const pushInfoTickets = {
        airline_logo: e.target.closest('.col.s12.m6').querySelector('.ticket-airline-img').src,
        origin_name: e.target.closest('.col.s12.m6').querySelector('[data-origin]').textContent,
        destination_name: e.target.closest('.col.s12.m6').querySelector('[data-destination]').textContent,
        departure_at: e.target.closest('.col.s12.m6').querySelector('.ticket-time-departure').textContent,
        price: e.target.closest('.col.s12.m6').querySelector('.ticket-price').textContent,
        transfers: e.target.closest('.col.s12.m6').querySelector('.ticket-transfers').textContent,
        flight_number: e.target.closest('.col.s12.m6').querySelector('.ticket-flight-number').textContent
      }
      favorites.getFavoriteTickets(pushInfoTickets)
      e.target.classList.add('d-none');
      favorites.renderFavoriteTicket();

    } else if (e.target && e.target.classList.contains('dropdown-trigger')) {
      favorites.showMsgNoFavorite();
      favorites.renderFavoriteTicket();
      favorites.showOrCloseContainer(e.target);
    } else if (e.target && e.target.classList.contains('delete-favorite')) {
      const buttonsDel = document.querySelectorAll('.delete-favorite');
      if (buttonsDel) {
        buttonsDel.forEach((item,i) => {
          if (e.target === item) {
            favorites.delFavoriteTickets(i)
          }
        })
      }
    }
  })
})
