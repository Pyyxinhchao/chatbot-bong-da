const matches = [
  { id: 1, teams: "Vietnam vs Thailand", date: "2025-04-25T10:00:00", hot: true },
  { id: 2, teams: "Malaysia vs Indonesia", date: "2025-04-28T18:00:00" },
  { id: 3, teams: "Vietnam vs Malaysia", date: "2025-05-01T20:00:00" },
  { id: 4, teams: "Laos vs Cambodia", date: "2025-05-03T17:00:00" }
];

let selectedMatch = null;
const maxTickets = 4;
const seatGrid = document.getElementById("stadium");
const totalPriceEl = document.getElementById("totalPrice");

function renderMatches() {
  const list = document.getElementById("matches");
  list.innerHTML = "";
  matches.forEach(match => {
    const btn = document.createElement("button");
    btn.textContent = `${match.teams} (${new Date(match.date).toLocaleString()})`;
    btn.onclick = () => selectMatch(match);
    list.appendChild(btn);
  });
}

function selectMatch(match) {
  selectedMatch = match;
  document.getElementById("ticket-booking").classList.remove("hidden");
  renderSeats();
  setupCountdown(match.date);
}

function renderSeats() {
  seatGrid.innerHTML = "";
  for (let i = 1; i <= 25; i++) {
    const seat = document.createElement("div");
    seat.className = "seat";
    seat.textContent = i;
    seat.onclick = () => toggleSeat(seat);
    seatGrid.appendChild(seat);
  }
}

function toggleSeat(seat) {
  seat.classList.toggle("selected");
  const selected = document.querySelectorAll(".seat.selected").length;
  if (selected > maxTickets) {
    seat.classList.remove("selected");
    alert("You can select up to 4 seats only.");
  }
}

document.getElementById("ticketType").onchange = updatePrice;
document.getElementById("ticketQuantity").oninput = updatePrice;

function updatePrice() {
  const type = document.getElementById("ticketType").value;
  const qty = parseInt(document.getElementById("ticketQuantity").value);
  const price = type === "vip" ? 200000 : 100000;
  totalPriceEl.textContent = `Total: ${qty * price}đ`;
}

function confirmBooking() {
  document.getElementById("ticket-booking").classList.add("hidden");
  document.getElementById("confirmation").classList.remove("hidden");
}

function setupCountdown(dateString) {
  const countdownEl = document.getElementById("countdown");
  const targetDate = new Date(dateString);

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownEl.textContent = "Vé đang được mở bán!";
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `⏳ Mở bán sau: ${hours}h ${minutes}m ${seconds}s`;
    setTimeout(updateCountdown, 1000);
  }

  updateCountdown();
}

renderMatches();