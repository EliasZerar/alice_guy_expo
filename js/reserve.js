const heures = Array.from({ length: 9 }, (_, i) => `${10 + i}:00`);
let joursSemaine = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'];

const selectedSlotsByDate = {};
const minDate = new Date('2025-03-24');
const trueMaxDate = new Date('2025-05-24');
let maxDate;

let daysPerPage;

function updateDaysPerPage() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 450) {
    daysPerPage = 3;
    maxDate = new Date('2025-05-25');
  } else if (screenWidth >= 450 && screenWidth <= 550) {
    daysPerPage = 4;
    maxDate = new Date('2025-05-26');
  } else if (screenWidth >= 550 && screenWidth <= 640) {
    daysPerPage = 5;
    maxDate = new Date('2025-05-27');
  } else if (screenWidth >= 640 && screenWidth <= 768) {
    daysPerPage = 6;
    maxDate = new Date('2025-05-28');
  } else if (screenWidth >= 768 && screenWidth <= 900) {
    daysPerPage = 3;
    maxDate = new Date('2025-05-25');
  } else if (screenWidth >= 900 && screenWidth <= 1000) {
    daysPerPage = 4;
    maxDate = new Date('2025-05-26');
  } else if (screenWidth >= 1000 && screenWidth <= 1100) {
    daysPerPage = 5;
    maxDate = new Date('2025-05-27');
  } else if (screenWidth >= 1100 && screenWidth <= 1200) {
    daysPerPage = 6;
    maxDate = new Date('2025-05-28');
  } else {
    daysPerPage = 7;
    maxDate = new Date('2025-05-25');
  }
}

window.addEventListener('resize', () => {
  updateDaysPerPage();
  generateDays();
});

updateDaysPerPage();
let currentStartIndex = 0;

const datesContainer = document.getElementById("datesContainer");

let currentLanguage = localStorage.getItem('selectedLang') || navigator.language.split('-')[0]; 

if (currentLanguage !== 'fr' && currentLanguage !== 'en') {
  currentLanguage = 'fr';
}


function formatDate(date) {
  if (currentLanguage === 'fr') {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  } else if (currentLanguage === 'en') {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  }
}


function getSlotKey(date) {
  return date.toISOString().slice(0, 10);
}

function generateDays() {
  datesContainer.innerHTML = "";

  const days = [];
  let date = new Date(minDate);
  while (date <= maxDate) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  const visibleDays = days.slice(currentStartIndex, currentStartIndex + daysPerPage);

  visibleDays.forEach((date, i) => {
    const dayCol = document.createElement("div");
    dayCol.className = "day";

    const dayName = document.createElement("div");
    dayName.className = "day-name"; 
    dayName.textContent = joursSemaine[date.getDay() === 0 ? 6 : date.getDay() - 1];

    const dayDate = document.createElement("div");
    dayDate.className = "day-date";
    dayDate.textContent = formatDate(date);

    const slotsDiv = document.createElement("div");
    slotsDiv.className = "slots";

    const selectedSlot = selectedSlotsByDate[getSlotKey(date)];

    heures.forEach(heure => {
      const btn = document.createElement("button");
      btn.className = "slot";
      btn.textContent = heure;

      const slotKey = `${getSlotKey(date)} ${heure}`;

      if (date > trueMaxDate || isSlotInPast(getSlotKey(date), heure)) {
        btn.classList.add("past-slot");
        btn.disabled = true;
      }

      if (selectedSlot === slotKey) btn.classList.add("selected");

      btn.addEventListener("click", () => {
        document.querySelectorAll('.slot').forEach(s => s.classList.remove("selected"));
        btn.classList.add("selected");
        selectedSlotsByDate[getSlotKey(date)] = slotKey;
        updateNextButtonState();
      });

      slotsDiv.appendChild(btn);
    });

    dayCol.appendChild(dayName);
    dayCol.appendChild(dayDate);
    dayCol.appendChild(slotsDiv);
    datesContainer.appendChild(dayCol);
  });
}

document.querySelector('.language').addEventListener('change', function(event) {
  currentLanguage = event.target.value; 
  generateDays(); 
});



function isSlotInPast(dateString, timeString) {
  const now = new Date();
  const slotDateTime = new Date(`${dateString}T${timeString}:00`);
  return slotDateTime < now;
}

document.getElementById("prevWeekBtn").addEventListener("click", () => {
  if (currentStartIndex > 0) {
    currentStartIndex -= daysPerPage;
    generateDays();
  }
});

document.getElementById("nextWeekBtn").addEventListener("click", () => {
  const totalDays = Math.floor((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
  if (currentStartIndex + daysPerPage < totalDays) {
    currentStartIndex += daysPerPage;
    generateDays();
  }
});

generateDays();

let currentStep = 0;
const steps = document.querySelectorAll(".form-step");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

function updateValidation() {
  const step2Inputs = document.querySelectorAll('#step-2 input, #step-2 select');
  step2Inputs.forEach(input => {
    if (input.id !== 'promo') {
      if (currentStep === 0) {
        input.removeAttribute('required');
      } else {
        input.setAttribute('required', 'true');
      }
    }
  });
}

function showStep(index) {
  steps.forEach((step, i) => {
    if (i === index) {
      step.classList.add("active");
      step.classList.remove("previous");
    } else if (i < index) {
      step.classList.remove("active");
      step.classList.add("previous");
    } else {
      step.classList.remove("active");
      step.classList.remove("previous");
    }
    dots[i].classList.toggle("active", i === index);
  });

  prevBtn.style.display = index === 0 ? "none" : "inline-block";
  nextBtn.style.display = index === steps.length - 1 ? "none" : "inline-block";
  submitBtn.style.display = index === steps.length - 1 ? "inline-block" : "none";

  updateValidation();

  if (index === 2) {
    updateSummary();
  }

  updateNextButtonState();
}

function updateSummary() {
  const lastname = document.getElementById("lastname").value;
  const firstname = document.getElementById("firstname").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const participants = document.getElementById("participants").value;
  const promo = document.getElementById("promo").value;

  const selectedEntry = Object.entries(selectedSlotsByDate).find(([date, slot]) => !!slot);

  let formattedDate = "";
  let selectedTime = "";

  if (selectedEntry) {
    const [selectedDate, slot] = selectedEntry;
    const [_, time] = slot.split(" ");
    selectedTime = time;

    const locale = currentLanguage === 'fr' ? 'fr-FR' : 'en-US';
    formattedDate = new Date(selectedDate).toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  document.getElementById("recap-lastname").textContent = lastname;
  document.getElementById("recap-firstname").textContent = firstname;
  document.getElementById("recap-email").textContent = email;
  document.getElementById("recap-phone").textContent = phone;
  document.getElementById("recap-datetime").textContent = formattedDate && selectedTime ? `${formattedDate} ${currentLanguage === 'fr' ? 'à' : 'at'} ${selectedTime}` : "Aucun créneau sélectionné";
  document.getElementById("recap-participants").textContent = participants;
  document.getElementById("recap-promo").textContent = promo ? `${promo} (-10%)` : "Aucun";
}


function updateNextButtonState() {
  if (currentStep === 0) {
    const hasSelectedSlot = Object.keys(selectedSlotsByDate).some((dateKey) => {
      const index = new Date(dateKey) - minDate;
      const dayOffset = Math.floor(index / (1000 * 60 * 60 * 24));
      return (
        dayOffset >= currentStartIndex &&
        dayOffset < currentStartIndex + daysPerPage &&
        selectedSlotsByDate[dateKey]
      );
    });

    nextBtn.disabled = !hasSelectedSlot;
    nextBtn.style.backgroundColor = hasSelectedSlot ? "#EA5B28" : "#ccc";
  } else if (currentStep === 1) {
    const isFormValid = document.getElementById("multiStepForm").checkValidity();
    const promoCode = document.getElementById("promo").value.trim();
    const isPromoValid = promoCode === "" || promoCode.toUpperCase() === "SOLAX10";
    nextBtn.disabled = !isFormValid || !isPromoValid;
    nextBtn.style.backgroundColor = isFormValid && isPromoValid ? "#EA5B28" : "#ccc";
  }
}

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    if (currentStep === 1) {
      const isFormValid = document.getElementById("multiStepForm").reportValidity();
      const promoCode = document.getElementById("promo").value.trim();
      const isPromoValid = promoCode === "" || promoCode.toUpperCase() === "SOLAX10";
      if (!isFormValid || !isPromoValid) {
        validatePromoCode(document.getElementById("promo"));
        return;
      }
    }
    currentStep++;
    showStep(currentStep);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

document.getElementById("multiStepForm").addEventListener("submit", e => {
  e.preventDefault();
});

document.querySelectorAll("#step-2 input, #step-2 select").forEach(input => {
  input.addEventListener("blur", () => {
    validateInput(input);
    updateNextButtonState();
  });
});

function validateInput(input) {
  if (currentStep !== 1) return;

  const errorMessageId = `${input.id}-error`;
  const errorMessageElement = document.getElementById(errorMessageId);

  if (!input.checkValidity()) {
    errorMessageElement.textContent = getErrorMessage(input);
    errorMessageElement.style.display = "block";
  } else {
    errorMessageElement.textContent = "";
    errorMessageElement.style.display = "none";
  }
}


const promoInput = document.getElementById("promo");
promoInput.addEventListener("blur", () => {
  validatePromoCode(promoInput);
  updateNextButtonState();
});

function validatePromoCode(input) {
  const promoErrorElement = document.getElementById("promo-error");
  const promoValidateMessage = document.getElementById("validate-promo");
  const value = input.value.trim();
  if (value && value.toUpperCase() !== "SOLAX10") {
    promoErrorElement.textContent = "Code promo invalide.";
    promoErrorElement.style.display = "block";
    promoValidateMessage.classList.remove("active");
  } else {
    promoErrorElement.style.display = "none";
    if (value) {
      promoValidateMessage.classList.add("active");
    } else {
      promoValidateMessage.classList.remove("active");
    }
  }
}

function getErrorMessage(input) {
  const messages = {
    fr: {
      valueMissing: "Ce champ est requis.",
      typeMismatch: "Format invalide.",
      patternMismatch: "Format incorrect.",
      default: "Champ invalide."
    },
    en: {
      valueMissing: "This field is required.",
      typeMismatch: "Invalid format.",
      patternMismatch: "Incorrect format.",
      default: "Invalid field."
    }
  };

  const langMessages = messages[currentLanguage] || messages.fr;

  if (input.validity.valueMissing) {
    return langMessages.valueMissing;
  }
  if (input.validity.typeMismatch) {
    return langMessages.typeMismatch;
  }
  if (input.validity.patternMismatch) {
    return langMessages.patternMismatch;
  }
  return langMessages.default;
}


document.getElementById("multiStepForm").addEventListener("submit", e => {
  if (!document.getElementById("multiStepForm").checkValidity()) {
    e.preventDefault();
  }
});

submitBtn.addEventListener("click", () => {
  const last_name = document.getElementById("lastname").value;
  const first_name = document.getElementById("firstname").value;
  const email = document.getElementById("email").value;
  const phone_number = document.getElementById("phone").value;
  const participants = document.getElementById("participants").value;
  const promo_code = document.getElementById("promo").value.toUpperCase() === "SOLAX10" ? "1" : "0";

  const selectedEntry = Object.entries(selectedSlotsByDate).find(([date, slot]) => !!slot);
  const date_time = selectedEntry ? `${selectedEntry[0]} ${selectedEntry[1].split(" ")[1]}` : null;


  const data = {
    last_name,
    first_name,
    email,
    phone_number,
    participants,
    promo_code,
    date_time
  };

  try {
    fetch("https://tahar.projetsmmichamps.fr/API/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        const form = document.getElementById('multiStepForm');
        const confirmationMessage = document.getElementById('confirmationMessage');
        form.style.display = 'none';
        confirmationMessage.style.display = 'block';
      })
      .catch(error => {
        alert("L'adresse e-mail n'existe pas ou vous tentez d'effectuer une réservation depuis un autre domaine que celui autorisé (www.aliceguy.eu).");
        console.error("Error:", error);
      });
  }
  catch (error) {
    alert("Une erreur est survenue lors de l'enregistrement de la réservation.");
    console.error("Error:", error);
  }
});

showStep(currentStep);
updateNextButtonState();