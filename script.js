const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const payButton = document.getElementById("payButton");
const unbookButton = document.getElementById("unbookButton");
const deleteButton = document.getElementById("deleteButton");

let ticketPrice = +movieSelect.value;

// Save movie and price data
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update selected count and total
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Populate UI from localStorage
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Pay button functionality
payButton.addEventListener("click", () => {
  alert(`Paid $${total.innerText} for ${count.innerText} tickets`);
});

// Unbook button functionality
unbookButton.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  selectedSeats.forEach((seat) => seat.classList.remove("selected"));
  updateSelectedCount();
});

// Delete button functionality
deleteButton.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, ticketPrice);
  updateSelectedCount();
});

// Seat selection
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Populate UI on load
populateUI();
updateSelectedCount();
