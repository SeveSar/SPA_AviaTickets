class Favorite {
  constructor() {
    this.favorites = []
    this.counter = 0;
    this.containerFavorite = document.querySelector('#dropdown1');
    this.buttonFavorite = document.querySelector('.dropdown-trigger');
    this.messageNoFavorite = document.querySelector('.modal-message-favorite');
  }
  getFavoriteTickets(ticket) {
      this.favorites.push(ticket)
      localStorage.setItem('favorites',JSON.stringify(this.favorites))
  }
  isFavorite() {
    if (localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'))
    }
  }
  showMsgNoFavorite () {
    if (this.favorites.length === 0) {
      this.messageNoFavorite.style.opacity = 1;
      setTimeout(() => {
        this.messageNoFavorite.style.opacity = 0;
      },1000)
    }
  }
  delFavoriteTickets(ticketId) {
    this.favorites.splice(ticketId,1)
    localStorage.setItem('favorites',JSON.stringify(this.favorites))
    this.renderFavoriteTicket()
    if (this.favorites.length === 0) {
      this.buttonFavorite.style.position = 'static';
      this.buttonFavorite.textContent = "FAVORITES"
      this.containerFavorite.style.opacity = '0';
      this.containerFavorite.style.display = "none";
    }
  }
  renderFavoriteTicket() {
    this.clearContainerFavorite();
    let fragment = ""
    this.favorites.forEach((item) => {
      fragment += this.templateFavorite(item)
    })
    this.containerFavorite.insertAdjacentHTML('afterbegin', fragment);
  }

  clearContainerFavorite() {
    this.containerFavorite.textContent = ""
  }
  showOrCloseContainer (button) {
    if (this.containerFavorite.style.opacity === "1" && this.containerFavorite.style.display === "block") {
      this.containerFavorite.style.opacity = '0';
      this.containerFavorite.style.display = "none";
      button.style.position = 'static';
      button.textContent = "FAVORITES"
    } else {
      if (this.favorites.length !== 0) {
        this.containerFavorite.style.opacity = '1';
        this.containerFavorite.style.display = "block";
        button.style.position = 'relative';
        button.style.left = 40 + "px";
        button.textContent = "CLOSE"
      }
    }
  }
  templateFavorite({
    airline_logo,
    origin_name,
    destination_name,
    departure_at,
    price,
    transfers,
    flight_number
  }) {
    return `
      <div class="favorite-item  d-flex align-items-start">
      <img src="${airline_logo}" class="favorite-item-airline-img"/>
      <div class="favorite-item-info d-flex flex-column">
        <div
          class="favorite-item-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="favorite-item-city" data-origin>${origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="favorite-item-city" data-destination>${destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${departure_at}</span>
          <span class="ticket-price ml-auto">${price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">${transfers}</span>
          <span class="ticket-flight-number">${flight_number}</span>
        </div>
        <a
          class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
          >Delete</a
        >
      </div>
    </div>
    `
  }

}

const favorites = new Favorite();

export default favorites