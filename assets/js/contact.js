/* jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", function () {
  // Hambuger nav menu
  //const hambuger = document.querySelector(".hamburger-bar");
  //const nav = document.querySelector(".header-nav-container");
  const hambuger = document.getElementById("hamburger-bar-id");
  const nav = document.getElementById("header-nav-container-id");

  hambuger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
  //JS for: contact form

  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const sendBtn = document.getElementById("contact-form-send-button");
  const errorMessage = document.getElementById("contact-form-error-text");

  function checkValidEmail(testEmail) {
    // helper function to validate email address
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9.-]+$/;
    return emailRegex.test(testEmail);
  }
  function checkValidName(testName) {
    // helper function to validate name
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(testName);
  }
  function checkValidMessage(testMessage) {
    if (testMessage.length < 7) {
      errorMessage.style.display = "block";
      errorMessage.innerHTML = "Please enter a valid message!";
      return false;
    } else {
      return true;
    }
  }
  function resetErrorMessage() {
    errorMessage.style.display = "none";
    sendBtn.style.display = "block";
  }
  emailInput.addEventListener("focusout", function (event) {
    if (checkValidEmail(emailInput.value)) {
      resetErrorMessage();
      emailInput.style.border = "";
    } else {
      errorMessage.style.display = "block";
      errorMessage.innerHTML = "Please enter a valid Email!";
      sendBtn.style.display = "none";
      emailInput.style.border = "solid 3px var(--error-text)";
    }
  });
  nameInput.addEventListener("focusout", function (event) {
    if (checkValidName(nameInput.value)) {
      resetErrorMessage();
      nameInput.style.border = "";
    } else {
      errorMessage.style.display = "block";
      errorMessage.innerHTML = "Please enter a valid Name!";
      sendBtn.style.display = "none";
      nameInput.style.border = "solid 3px var(--error-text)";
    }
  });
  messageInput.addEventListener("focusout", function (event) {
    if (checkValidMessage(messageInput.value)) {
      resetErrorMessage();
      messageInput.style.border = "";
    } else {
      errorMessage.style.display = "block";
      errorMessage.innerHTML = "Please enter a valid Message!";
      messageInput.style.border = "solid 3px var(--error-text)";
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    // Validate Name: Only letters and spaces (minimum 2 characters)
    if (!checkValidName(nameInput.value)) {
      isValid = false;
    }
    // Validate Email: Standard email format validation
    if (!checkValidEmail(emailInput.value)) {
      isValid = false;
    }
    // Validate Message: Ensure it is not empty or less than 10 characters
    if (!checkValidMessage(messageInput)) {
      isValid = false;
    }

    // If all fields are valid, form can be submitted
    if (isValid) {
      errorMessage.style.display = "none";
      form.submit();
    } else {
      errorMessage.style.display = "block";
      errorMessage.innerHTML = "Please enter correct details and send again!";
    }
  });
});
