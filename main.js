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
document.getElementById("get-started-link").addEventListener("click", function(event) {
    event.preventDefault();
    const recipesSection = document.getElementById("Recipes");
    const scrollOptions = {
      behavior: "smooth",
      block: "start"
    };
    recipesSection.scrollIntoView(scrollOptions);
  });

 async function fetchRecipes() {
  try {
    const apiKey = 
    "d7102e3b11405430ed81fb0f2db19233—"
    const apiUrl = 'https://api.edamam.com/search';
    const query = document.querySelector('search').value.trim();
  
   if (!query) {
    alert('Please enter a food name');
    return;
   }
  
   const response = await fetch(`${apiUrl}?q=${query}&app_id=${apiKey}`, {method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Network response failed')
  }

  const data = await response.json();
  displayReciepes(data.hits);
} catch (error) {
  console.error('error fetching data', error);
}
}
function displayReciepes(reciepes) {
  const searchResultsContainer = document.querySelector('search-Results');
  searchResultsContainer.innerHTML = '';

  if  (reciepes.length === 0) {
    searchResultsContainer.innerHTML = '<p>No Reciepes were Found</p>';
    return;
  }
}

