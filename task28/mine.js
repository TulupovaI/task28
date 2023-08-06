
const URLS = {
  starships: 'https://swapi.dev/api/starships',
  people: 'https://swapi.dev/api/people',
  planets: 'https://swapi.dev/api/planets',
}

const peopleList = document.querySelector('#characters');
const planetsList = document.querySelector('#planets');
const starshipsList = document.querySelector('#starships');
const card = document.querySelector('#card');
const cardInfo = document.querySelector('.card-info');



function getData(url, listElement) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayData(data.results, listElement);
    })
    .catch(error => console.error('Fetch Error :-S', error));
}


function displayData(data, listElement) {
  listElement.innerHTML = '';
  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item.name;
    listItem.addEventListener('click', () => {
      card.style.display = "block";
      displayCard(item.name, item);
    });
    listElement.appendChild(listItem);
  });
}


function displayCard(name, item) {
  const cardTitle = document.querySelector('.card-title');
  const cardSubtitle = document.querySelector('.card-subt');
  const cardText = document.querySelector('.card-text1');

  cardTitle.textContent = name;
  cardSubtitle.textContent = `Category: ${item.hasOwnProperty('gender') ? 'Character' : item.hasOwnProperty('climate') ? 'Planet' : 'Starship'}`;

  if (item.hasOwnProperty('gender')) {
    const characterInfo = `
    <ul>
      <li>Height: ${item.height}</li>
      <li>Mass: ${item.mass}</li>
      <li>Hair Color: ${item.hair_color}</li>
      <li>Skin Color: ${item.skin_color}</li>
      <li>Eye Color: ${item.eye_color}</li>
      <li>Birth Year: ${item.birth_year}</li>
      <li>Gender: ${item.gender}</li>
    </ul>  
    `;
    cardText.innerHTML = characterInfo;
  } else if (item.hasOwnProperty('climate')) {
    const planetInfo = `
    <ul>
      <li>Rotation Period: ${item.rotation_period}</li>
      <li>Orbital Period: ${item.orbital_period}</li>
      <li>Diameter: ${item.diameter}</li>
      <li>Climate: ${item.climate}</li>
      <li>Gravity: ${item.gravity}</li>
      <li>Terrain: ${item.terrain}</li>
      <li>Surface Water: ${item.surface_water}</li>
      <li>Population: ${item.population}</li>
    </ul>  
    `;
    cardText.innerHTML = planetInfo;
  } else if (item.hasOwnProperty('starship_class')) {
    const starshipInfo = `
    <ul>
      <li>Model: ${item.model}</li>
      <li>Manufacturer: ${item.manufacturer}</li>
      <li>Starship Class: ${item.starship_class}</li>
      <li>Crew: ${item.crew}</li>
      <li>Passengers: ${item.passengers}</li>
      <li>Cargo Capacity: ${item.cargo_capacity}</li>
      <li>Hyperdrive Rating: ${item.hyperdrive_rating}</li>
      <li>MGLT: ${item.MGLT}</li>
      <li>Consumables: ${item.consumables}</li>
    </ul>  
    `;
    cardText.innerHTML = starshipInfo;
  }

  // Clear any existing Close button in the card
  const existingCloseButton = card.querySelector('.closeButton');
  if (existingCloseButton) {
    existingCloseButton.remove();
  }

  // Add the Close button to the card
  const closeButton = document.createElement('button');
  closeButton.classList.add('closeButton');
  closeButton.textContent = 'Close';
  card.appendChild(closeButton);

  // Add event listener to the Close button
  closeButton.addEventListener('click', () => {
    card.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const charactersBtn = document.querySelector('.first');
  charactersBtn.addEventListener('click', () => getData(URLS.people, peopleList));

  const planetsBtn = document.querySelector('.second');
  planetsBtn.addEventListener('click', () => getData(URLS.planets, planetsList));

  const starshipsBtn = document.querySelector('.third');
  starshipsBtn.addEventListener('click', () => getData(URLS.starships, starshipsList));
});