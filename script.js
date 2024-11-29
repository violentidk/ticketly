const seatingContainer = document.getElementById("seating-container");
const movieSelect = document.getElementById("movie");
const payButton = document.getElementById("payButton");
const unbookButton = document.getElementById("unbookButton");
const deleteButton = document.getElementById("deleteButton");
const count = document.getElementById("count");
const total = document.getElementById("total");

let ticketPrice = +movieSelect.value;

// Generate seating rows and seats
function generateSeating(rows = 10, seatsPerRow = 10) {
  seatingContainer.innerHTML = "";
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < seatsPerRow; j++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");
      if (Math.random() < 0.2) seat.classList.add("occupied"); // Random occupied seats
      row.appendChild(seat);
    }
    seatingContainer.appendChild(row);
  }
}

// Update selected count and total price
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedCount = selectedSeats.length;
  count.innerText = selectedCount;
  total.innerText = selectedCount * ticketPrice;
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// Seat click event
seatingContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Pay button functionality
payButton.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  if (selectedSeats.length === 0) {
    alert("No seats selected!");
    return;
  }
  alert(`You paid $${total.innerText} for ${count.innerText} seats.`);
  selectedSeats.forEach((seat) => seat.classList.add("occupied"));
  updateSelectedCount();
});

// Unbook button functionality
unbookButton.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  selectedSeats.forEach((seat) => seat.classList.remove("selected"));
  updateSelectedCount();
});

// Delete button functionality
deleteButton.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".row .seat");
  selectedSeats.forEach((seat) => seat.classList.remove("selected"));
  localStorage.clear();
  updateSelectedCount();
});

// Initialize seating and update
generateSeating(10, 10); // 10 rows, 10 seats per row
updateSelectedCount();
