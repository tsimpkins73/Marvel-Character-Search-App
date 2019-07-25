'use strict';

const marvelAPIKey = "6d6cdc9eafffba875b67af9c8c0918d1";

const movieAPIKey = "663447d911c61d96456fdace68aad672";


var charName = '';

//localStorage.favorites = JSON.stringify(myarray);

//myarray = JSON.parse(localStorage.favorites);

function getCharacter() {
  const character = $('#characterSearch').val().toLowerCase()
  fetch('https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=' + character + '&apikey=' + marvelAPIKey)
    .then(response => response.json())
    .then(responseJson => displayCharacter(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayCharacter(responseJson) {
  console.log(responseJson);
  const picStatus = (responseJson.status);
  charName = `${responseJson.data.results[0].name}`;
  $('.results').empty();
  //if(${responseJson.data.count} === 0){
  //$('.results').append(<h1>${responseJson.data.results[0].name}</h1>
  //}
  $('.results').append(
    `<div class="characterInfo">
    <h1 class="charName">${responseJson.data.results[0].name}</h1>
    <img class="charImg" src="${responseJson.data.results[0].thumbnail.path}.${responseJson.data.results[0].thumbnail.extension}" alt="${responseJson.data.results[0].name}">
    <p class="charPar">${responseJson.data.results[0].description}</p>
    <div class="button-container">
    <button class = "moreInfoLink, stories" type="stories-API" name="Stories" value="Stories">Stories</button>
    <button class = "moreInfoLink events" type="events-API" name="Events" value="Stories">Events</button>
    <button class = "moreInfoLink movies" type="movies-API" name="Movies" value="Movies">Movies</button>
        </div>`
  );
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getCharacter();
  });
}

function watchStories() {
  $(document).on('click', 'button.stories', function (event) {
    event.preventDefault();
    getStories();
  });
}

function getStories() {
  const character = $('#characterSearch').val().toLowerCase()
  fetch('https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=' + character + '&apikey=' + marvelAPIKey)
    .then(response => response.json())
    .then(responseJson => displayStories(responseJson))
    .catch(error => alert('Something went wrong with retrieving Stories. Try again later.'));
}

function displayStories(responseJson) {
  const availableStories = (responseJson.data.results[0].stories.available);
  console.log('Fetch the Stories');
  if (availableStories > 0) {
    removeAdditions();
    $('.results').append(`<div class="characterStories">
    <h1>Stories</h1></div>`);
    for (let i = 0; i < availableStories; i++) {
      $('.characterStories').append(
        `<h2>${responseJson.data.results[0].stories.items[i].name}</h1>`
      )
    };
  } else {
    removeAdditions();
    $('.results').append(`<div class="characterStories"><h2>No stories found</h2></div>`);
  };
}

function watchEvents() {
  $(document).on('click', 'button.events', function (event) {
    event.preventDefault();
    getEvents();
  });
}

function getEvents() {
  const character = $('#characterSearch').val().toLowerCase()
  fetch('https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=' + character + '&apikey=' + marvelAPIKey)
    .then(response => response.json())
    .then(responseJson => displayEvents(responseJson))
    .catch(error => alert('Something went wrong with retrieving Events. Try again later.'));
}

function displayEvents(responseJson) {
  const availableEvents = (responseJson.data.results[0].events.available);
  console.log(availableEvents + ' Events');
  if (availableEvents > 0) {
    console.log(availableEvents + ' Events');
    removeAdditions();
    $('.results').append(`<div class="characterEvents"><h1>Events</h1></div>`);
    for (let i = 0; i < availableEvents; i++) {
      $('.characterEvents').append(
        `<h2>${responseJson.data.results[0].events.items[i].name}</h1>`
      )
    };
  } else {
    removeAdditions();
    $('.results').append(`<div class="characterEvents"><h2>No events found</h2></div>`);
  };
}

function watchMovies() {
  $(document).on('click', 'button.movies', function (event) {
    event.preventDefault();
    getMovies();
  });
}

function getMovies() {
    fetch('https://api.themoviedb.org/3/search/multi?api_key=' + movieAPIKey + '&language=en-US&query=marvel-' + charName)
    .then(response => response.json())
    .then(responseJson => displayMovies(responseJson))
    .catch(error => alert('Something went wrong with retrieving Movies. Try again later.'));
}

function displayMovies(responseJson) {
  const availableMovies = (responseJson.total_results);
  console.log(charName + ' has ' + availableMovies + ' Movies');
  if (availableMovies > 0) {
    console.log(availableMovies + ' Movies');
    removeAdditions();
        $('.results').append(`<div class="characterMovies"><h1>Movies</h1></div>`);
    for (let i = 0; i < availableMovies; i++) {
      $('.characterMovies').append(
        `<h2>${responseJson.results[i].name}</h1>`
      )
    };
  } else {
    removeAdditions();
    $('.results').append(`<div class="characterMovies"><h2>No movies found</h2></div>`);
  };
}

function removeAdditions(){
  $('.characterStories').remove();
  $('.characterEvents').remove();
  $('.characterMovies').remove();
}



$(function () {
  console.log('App loaded! Waiting for submit!');
  watchForm();
  watchStories();
  watchEvents();
  watchMovies();
});