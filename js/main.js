const body = document.querySelector("body")
const countriesContainer =document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')

      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose");
      let getMode = localStorage.getItem("mode");
          if(getMode && getMode === "dark-mode"){
            body.classList.add("dark");
          }
    ////// ------- dark and light mode ------- //////
      modeToggle.addEventListener("click" , () =>{
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");
        if(!body.classList.contains("dark")){
            localStorage.setItem("mode" , "light-mode");
        }else{
            localStorage.setItem("mode" , "dark-mode");
        }
      });
// filter
let allCountainerData
fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data)
        allCountainerData = data
    })
    ////// ------- dropdown button ------- //////    
filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data)
    })
})
function renderCountries(data) {
   countriesContainer.innerHTML = ''
        data.forEach((country) => {               
            const countryCard = document.createElement('a')
            countryCard.classList.add('country-card')
            countryCard.href = `/country.html?name=${country.name.common}`
            countryCard.innerHTML = `
                <img src="${country.flags.svg}" alt="${country.name.common} flag">
                        <div class="card-text">
                            <h3 class="card-title">${country.name.common}</h3>
                            <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                            <p><b>Region: </b>${country.region}</p>
                            <p><b>Capital: </b>${country.capital?.[0]}</p>              
                        </div> `
            countriesContainer.append(countryCard)
        }) 
}
////// ------- search box ------- //////
    searchInput.addEventListener('input', (e) => {
        // console.log(e.target.value);
        // console.log(allCountainerData);
       const filteredCountries = allCountainerData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
       renderCountries(filteredCountries);
    })








