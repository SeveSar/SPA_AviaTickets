import currencyUI from "./currency";
class TicketUI {
  constructor(currency) {
    this.container = document.querySelector('.tickets-sections .row')
    this.currency = currency.getCurrencySymbol.bind(currencyUI);
  }
  renderTickets(tickets) {
    this.clearContainer()
    if(!tickets.length) {
      this.showEmptyMsg()
      return
    }
    const currency = this.currency()
    console.log(currency)
    let fragment = "";
    tickets.forEach(ticket => {
      const template = TicketUI.ticketTemplate(ticket, currency);
      fragment += template
    })
    this.container.insertAdjacentHTML("afterbegin", fragment);
  }
  clearContainer() {
    this.container.textContent = "";
  }
  showEmptyMsg() {
    const template = TicketUI.emptyMsgTemplate()
    this.container.insertAdjacentHTML('afterbegin', template);
  }
  static emptyMsgTemplate() {
    return `
      <div class="tickets-empty-res-msg">
        По вашему запросу билетов не найдено.
      </div>
    `;
  }
  static ticketTemplate({
    airline_logo,
    airline_name,
    origin_name,
    destination_name,
    departure_at,
    return_at,
    price,
    transfers,
    flight_number
  },currency) {
    return `
      <div class="col s12 m6">
      <div class="card ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <img
            src="${airline_logo}"
            class="ticket-airline-img"
          />
          <span class="ticket-airline-name"
            >${airline_name}</span
          >
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city" data-origin>${origin_name} </span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city" data-destination>${destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${departure_at}</span>
          <span class="ticket-price ml-auto">${currency}${price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${flight_number}</span>
        </div>
        <a
          class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto"
          >Add to favorites</a
        >
      </div>
    </div>
    `
  }
}

const ticket = new TicketUI(currencyUI);

export default ticket;