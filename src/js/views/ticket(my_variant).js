import currency from "./currency";
class TicketUI {
  constructor(currency) {
    this.container = document.querySelector('.tickets-sections .row')
    this.currency = currency.getCurrencySymbol.bind(currencyUI);
  }
  createCard({
    airline_logo,
    airline_name,
    origin_name,
    destination_name,
    departure_at,
    return_at,
    price,
    transfers,
    flight_number
  }, currency) {
      const card = document.createElement('div');
      card.className = "col s12 m6";
      card.innerHTML = `
      <div class="card ticket-card">
      <div class="ticket-airline d-flex align-items-center">
        <img src="${airline_logo}" class="ticket-airline-img"/>
        <span class="ticket-airline-name"
          >${airline_name}</span
        >
      </div>
      <div class="ticket-destination d-flex align-items-center">
        <div class="d-flex align-items-center mr-auto">
          <span class="ticket-city">${origin_name}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="ticket-city">${destination_name}</span>
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
    </div>
      `;
      return card
  }
  renderCard(ticket) {
    if (ticket.length === 0) {
      const template = `
      <div class="tickets-empty-res-msg">
        По вашему запросу билетов не найдено.
      </div>
      `;
      this.container.insertAdjacentHTML('afterbegin',template)
      return;
    }
      const currency = this.currency()
      console.log(currency);
      this.clearAreaOfTeackets();
      const cards = ticket.map(obj => {
        return this.createCard(obj,currency)
      });
      this.container.append(...cards);

  }
  clearAreaOfTeackets() {
    this.container.textContent = "";
  }
}

const tickets = new TicketUI(currencyUI);

export default tickets