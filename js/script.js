

class Movies{
    constructor(image, year, title, rating, genre, descirption, id){
      this.id = id;
        this.image = image;
        this.year = year;
        this.title = title;
        this.rating = rating;
        this.genre = genre
        this.descirption = descirption
    }
};

!async function () {
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8'
  }
};

let data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(response => response.json())
  .then((result) => {return result})
  .catch(err => console.error(err));

console.log(data);
console.log(data.results[0].title);

const Genre = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8'
  }
};

let genredata = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', Genre)
  .then(response => response.json())
  .then((result) => {return result})
  .catch(err => console.error(err));

  console.log(genredata);




let movielist = [];

for (let i = 0; i < data.results.length; i++) {
    let image = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
    let year = data.results[i].release_date;
    let title = data.results[i].title;
    let rating = data.results[i].vote_average;
    let descirption = data.results[i].overview;
    let id = data.results[i].id;
    let genreid = data.results[i].genre_ids[0];
    let genrename = "";

 for (let k = 0; k < genredata.genres.length; k++) {
    if (genreid == genredata.genres[k].id) {
      genrename = genredata.genres[k].name;
    break; 
    }
  }

   movielist.push(new Movies(image, year, title, rating, genrename,descirption, id));
  }

console.log("all movies:", movielist);

  movielist.forEach(Movie => {

  const containerid = `movieCards_${Movie.genre}`;
  const container = document.getElementById(containerid);
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  const isInWatchlist = watchlist.some(item => item.id === Movie.id);
  

  if (container) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${Movie.image}" class="card-img-top" alt="Image Not Found">
      <h5 class="card-title">${Movie.title}</h5>
      <p class="card-text">Rating: ${Movie.rating}</p>
      <a href="#" class="btn-primary" ${isInWatchlist ? 'disabled' : ''}>
        ${isInWatchlist ? 'Added' : 'Add to Watchlist'}
      </a>
    `;

card.addEventListener('click', (e) => {
  if (!e.target.classList.contains('btn-primary')) {
    window.location.href = `(d)individualMoviePage.html?id=${Movie.id}`;

  } else{
    e.preventDefault();
    addToWatchlist(Movie);
    e.target.textContent = "Added";
    e.target.disabled = true; 
  }
    });

    container.appendChild(card);
  }

});




}();

//Movie Details Page

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

async function getMovieDetails() {
  const options2 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8'
}
};
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options2);
    const movie = await response.json();


    document.getElementById('movieTitle').textContent = movie.title;
    document.getElementById('movieImage').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    document.getElementById('movieRating').textContent = `Rating: ${movie.vote_average}`;
    document.getElementById('movieDescription').textContent = movie.overview;
    document.getElementById('movieGenre').textContent = movie.genres.map(g => g.name).join(", ");
    document.getElementById('movieYear').textContent = movie.release_date;

  } catch (err) {
    console.error(err);
  }
}

getMovieDetails();


function addToWatchlist(movie) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  const exists = watchlist.some(item => item.id === movie.id);
  if (!exists) {
    watchlist.push(movie);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  } else {
    alert(`${movie.title} is already in your watchlist.`);
  }
  console.log("Current Watchlist:", watchlist);
}

//Watchlist

  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  const container = document.getElementById('watchlistContainer');

console.log("Current Watchlist:", watchlist);

  if (watchlist.length === 0) {
    container.innerHTML = "<p>Your watchlist is empty.</p>";
  } else {
watchlist.forEach(Movie => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${Movie.image}" class="card-img-top" alt="Image Not Found">
    <h5 class="card-title">${Movie.title}</h5>
    <p class="card-text">Rating: ${Movie.rating}</p>
    <a href="#" class="btn-primary">Remove From Watchlist</a>
  `;

  
  card.addEventListener('click', (e) => {
  if (!e.target.classList.contains('btn-primary')){
    window.location.href = `(d)individualMoviePage.html?id=${Movie.id}`;
  }else{
    e.preventDefault();

    let updatedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    updatedWatchlist = updatedWatchlist.filter(item => item.id !== Movie.id);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));

    card.remove();

    if (updatedWatchlist.length === 0) {
      container.innerHTML = "<p>Your watchlist is empty.</p>";
    }
  }
  });

  container.appendChild(card);
});
  };









