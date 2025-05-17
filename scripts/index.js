const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// Profile Elements
const editModalBtn = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Form Elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["edit-profile"];
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

// Add Card Modal Elements
const cardModal = document.querySelector("#add-card-modal");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardModalForm = document.forms["add-card"]; // Correctly select the form

// Card Elements
const cardTemplate = document.querySelector("#card-template").content;
const cardElementTemplate = cardTemplate.querySelector(".card"); // get the card element
const cardsList = document.querySelector(".cards__list");

// Image Preview Elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImageElement = previewModal.querySelector(".modal__image");
const previewModalCaptionElement =
  previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");

function getCardElement(data) {
  const cardElement = cardElementTemplate.cloneNode(true); // clone the card element

  const cardName = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked"); // toggle the class
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageElement.src = data.link;
    previewModalImageElement.alt = data.name;
    previewModalCaptionElement.textContent = data.name;
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
  modal.addEventListener("mousedown", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("mousedown", handleOverlayClick);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

// Edit Form Submit Handler for editing profile information.
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  editFormElement.reset(); // Reset the form
  closeModal(editModal);
}

// Add Card Form Submit Handler for adding new cards.
function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); // Prevent the default form submission behavior
  const cardNameInput = cardModalForm.querySelector("#add-card-caption");
  const cardLinkInput = cardModalForm.querySelector("#add-card-link");

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const cardElement = getCardElement(newCardData);
  cardsList.prepend(cardElement);

  cardModalForm.reset(); // Reset the form

  // Reset the button state
  const inputs = Array.from(cardModalForm.querySelectorAll(".modal__input"));
  const submitButton = cardModalForm.querySelector(".modal__button");
  toggleButtonState(inputs, submitButton);

  closeModal(cardModal);
}

editModalBtn.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(editFormElement, editModal.querySelectorAll(".modal__input"));
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardModalForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});
