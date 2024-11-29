// Generate seating rows and seats with COVID-19 restrictions
function generateSeating(rows = 10, seatsPerRow = 10, covidSeatsPercentage = 20) {
  seatingContainer.innerHTML = "";
  const totalSeats = rows * seatsPerRow;
  const covidSeatsCount = Math.floor((covidSeatsPercentage / 100) * totalSeats);
  const covidSeats = new Set();

  // Randomly assign COVID-19 restricted seats
  while (covidSeats.size < covidSeatsCount) {
    const randomSeat = Math.floor(Math.random() * totalSeats);
    covidSeats.add(randomSeat);
  }

  let seatIndex = 0;
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < seatsPerRow; j++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");

      // Mark as unavailable if in COVID-19 restricted set
      if (covidSeats.has(seatIndex)) {
        seat.classList.add("unavailable");
      }
      row.appendChild(seat);
      seatIndex++;
    }
    seatingContainer.appendChild(row);
  }

  populateUI();
}
