document.addEventListener("DOMContentLoaded", function () {
    const modalLinks = document.querySelectorAll(".modal-link");
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalClose = document.querySelector(".modal-close");
    const modalImage = document.querySelector(".modal-image");
  

    modalLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const imageSrc = this.querySelector("img").src;
        modalImage.src = imageSrc;
        modalOverlay.style.display = "block";
      });
    });
  
    modalClose.addEventListener("click", function () {
      modalOverlay.style.display = "none";
    });
  
    modalOverlay.addEventListener("click", function (event) {
      if (event.target === modalOverlay) {
        modalOverlay.style.display = "none";
      }
    });
  });
  function submitForm(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const successMessage = document.getElementById("success-message");

  
    if (emailInput.value.trim() !== "") {
  
      successMessage.textContent = "Thank you for subscribing!";
      successMessage.style.color = "#4CAF50";
      emailInput.value = ""; 
    } else {
      
      successMessage.textContent = "Please enter a valid email address.";
      successMessage.style.color = "#FF0000";
    }
  }

  const newsletterForm = document.getElementById("newsletter-form");
  newsletterForm.addEventListener("submit", submitForm);