document.getElementById("menu-icon").addEventListener("click", function () {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("active");
});


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

  document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const searchIcon = document.getElementById("searchIcon");
  
    searchButton.addEventListener("click", fetchRecipes);
    searchIcon.addEventListener("click", fetchRecipes);
  })

  async function fetchRecipes() {
    try {
      const apiKey = "d7102e3b11405430ed81fb0f2db19233";
      const apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.edamam.com/search';
      const query = document.querySelector('input[name="search"]').value.trim(); 
  
      if (!query) {
        alert('Please enter a food name');
        return;
      }
  
      const response = await fetch(`${apiUrl}?q=${query}&app_id=${apiKey}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Network response failed');
      }
  
      const data = await response.json();
      displayRecipes(data.hits);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }
  
  function displayRecipes(recipes) {
    const carouselTrack = document.getElementById('carouselTrack');
    carouselTrack.innerHTML = '';
  
    if (recipes.length === 0) {
      document.getElementById('searchResults').innerHTML = '<p>No Recipes were Found</p>';
      return;
    }
  
    recipes.forEach(recipe => {
      const recipeCard = `
        <div class="carousel-item">
          <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}" />
          <h3>${recipe.recipe.label}</h3>
          <p>Preparation Time: ${recipe.recipe.totalTime}</p>
          <p>Calories: ${Math.round(recipe.recipe.calories)}</p>
          <p>Ingredients: ${recipe.recipe.ingredientLines.join(', ')}</p>
          <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div>
      `;
      carouselTrack.innerHTML += recipeCard;
    });
  
    initCarousel();
  }
  
  function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    let currentIndex = 0;
  
    function updateButtons() {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === items.length - 1;
    }
  
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        const offset = currentIndex * items[0].clientWidth;
        track.style.transform = `translateX(-${offset}px)`;
        updateButtons();
      }
    });
  
    nextBtn.addEventListener('click', () => {
      if (currentIndex < items.length - 1) {
        currentIndex++;
        const offset = currentIndex * items[0].clientWidth;
        track.style.transform = `translateX(-${offset}px)`;
        updateButtons();
      }
    });
  
    updateButtons();
  }

  

