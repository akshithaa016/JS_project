document.getElementById('addEventForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const birthDate = document.getElementById('birthDate').value;
  
    if (eventName && eventDate && birthDate) {
      addEventToDashboard(eventName, eventDate, birthDate);
      document.getElementById('addEventForm').reset();
    } else {
      alert('Please fill out all fields.');
    }
  });
  
  function addEventToDashboard(name, date, birthDate) {
    const eventList = document.getElementById('eventList');
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');
  
    const age = calculateAge(birthDate); 
  
    eventCard.innerHTML = `
      <h2>${name}</h2>
      <p>Date: ${date}</p>
      <p>Age: ${age} years old</p> <!-- Display age -->
      <p>Countdown: <span class="countdown">Calculating...</span></p>
      <button class="gift-suggestion" onclick="suggestGift()">Suggest Gift</button>
      <div class="gift-result"></div>
    `;
  
    eventList.appendChild(eventCard);
  
    const countdownElement = eventCard.querySelector('.countdown');
    updateCountdown(date, countdownElement);
  }
  
  function calculateAge(birthDate) {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
  
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
  
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
  
    return age;
  }
  
  function updateCountdown(eventDate, element) {
    const interval = setInterval(() => {
      const now = new Date();
      const eventTime = new Date(eventDate).getTime();
  
      const timeLeft = eventTime - now.getTime();
  
      if (timeLeft <= 0) {
        element.textContent = 'Event is happening now!';
        clearInterval(interval);
        return;
      }
  
      const monthsLeft = getMonthsLeft(now, new Date(eventDate));
      const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
      element.textContent = `${monthsLeft}m ${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    }, 1000);
  }
  
  function getMonthsLeft(fromDate, toDate) {
    let months = toDate.getMonth() - fromDate.getMonth();
    if (months < 0) {
      months += 12; // adjust for negative month difference
    }
    return months;
  }  
  function suggestGift() {
    const giftSuggestions = [
      'A personalized photo album',
      'A smartwatch',
      'A bottle of wine with a custom label',
      'A cozy sweater',
      'A spa gift basket',
      'A tech gadget (e.g., Bluetooth speaker)',
      'A framed photo of a special moment',
      'A thoughtful handwritten letter',
      'A gourmet chocolate box'
    ];
  
    const randomIndex = Math.floor(Math.random() * giftSuggestions.length);
    const randomGift = giftSuggestions[randomIndex];
  
    // Display the gift suggestion
    alert(`Gift Suggestion: ${randomGift}`);
  }
    