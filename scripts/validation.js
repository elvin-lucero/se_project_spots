const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  // Check if the error element exists
  if (errorElement) {
    errorElement.textContent = errorMessage; // Set the error message
    errorElement.classList.add("modal__error_visible"); // Optionally add a visible class
    // You can also add a class to the input element to indicate an error
    inputElement.classList.add("modal__input_type_error");
  } else {
    console.error(
      `Error element with class "${inputElement.id}-error" not found.`
    );
  }
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  // Check if the error element exists
  if (errorElement) {
    errorElement.textContent = ""; // Clear the error message
    errorElement.classList.remove("modal__error_visible"); // Optionally remove the visible class
    // Remove the error class from the input element
    inputElement.classList.remove("modal__input_type_error");
  }
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement); // Ensure this function exists
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__button");

  // Set the initial state of the button
  //toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      //toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();
