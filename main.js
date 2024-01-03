//HamBurger Menu / rotation
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const bar3 = document.getElementById('bar3');

menuIcon.addEventListener('click', function() {
  menuIcon.classList.toggle('is-active');
  navLinks.classList.toggle('show-nav'); 

  bar1.classList.toggle('rotate-bar1');
  bar2.classList.toggle('hide-bar2');
  bar3.classList.toggle('rotate-bar3');

 
  if (navLinks.classList.contains('show-nav')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

//Modal-Images
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

document.getElementById("get-started-link").addEventListener("click", function(e) {
    e.preventDefault();
    const recipesSection = document.getElementById("Recipes");
    const scrollOptions = {
      behavior: "smooth",
      block: "start"
    };
    recipesSection.scrollIntoView(scrollOptions);
  });


    const searchButton = document.getElementById("searchButton");
    const searchIcon = document.getElementById("searchIcon");
    searchButton.addEventListener("click", fetchRecipes);
    searchIcon.addEventListener("click", fetchRecipes);


  async function fetchRecipes() {

    try {
      const apiID = "1f3f8a2e";
      const apiKey = "d7102e3b11405430ed81fb0f2db19233";
      const apiUrl = 'https://api.edamam.com/api/recipes/v2';
      const query = document.getElementById('search').value.trim(); 
      // data = {
      //  q: query,
      //  app_id:  apiID,
      //  app_key: apiKey,
      // }

      if (!query) {
        alert('Please enter a food name');
        return;
      }

      const response = await fetch(`${apiUrl}?q=${query}&app_id=${apiID}&app_key=${apiKey}&type=any`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response failed');
      }
  
      const data = await response.json();
      console.log(data);
      displayRecipes(data.hits);
    } 
    catch (error) {
      console.error('Error fetching data', error);
    }
  }
  
  function displayRecipes(recipes){
    const carouselTrack = document.getElementById('carouselTrack');
    carouselTrack.innerHTML = '';
  
    if(recipes.length === 0) {
      document.getElementById('results-container').innerHTML = '<p>No Recipes were Found</p>';
      return;
    }
  
    recipes.forEach(recipe => {
      const recipeCard = `
        <div class="carousel-item">
          <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}" />
          <h3 class="recipe-info rcp">${recipe.recipe.label}</h3>
          <p class="recipe-info">Preparation Time: ${recipe.recipe.totalTime}</p>
          <p class="recipe-info">Calories: ${Math.round(recipe.recipe.calories)}</p>
          <p class="recipe-info">Ingredients: ${recipe.recipe.ingredientLines.join(', ')}</p>
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

  

