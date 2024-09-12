const DEFAULT_IMG = `https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80`;
const MOVIE_DB_API_KEY = import.meta.env.MOVIE_DB_API_KEY;

const API_URL = `https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc&api_key=${MOVIE_DB_API_KEY}`;

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const quote = document.querySelector(".quote");

// getRandomMovieQuote(MOVIE_QUOTE_URL);

getMovies(API_URL);
//${API_KEY}
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieSection = document.createElement("div");

    movieSection.classList.add("movie");

    let imagePath = poster_path === null ? DEFAULT_IMG : IMG_PATH + poster_path;

    movieSection.innerHTML = `
        <img
          src=${imagePath}
          alt=${title}
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class=${setClassByVote(vote_average)}>${vote_average.toFixed(1)}
          </span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
    `;

    main.appendChild(movieSection);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerms = search.value;
  console.log("DEBUG SEARCh => ", SEARCH_URL + searchTerms);
  if (searchTerms) {
    getMovies(SEARCH_URL + searchTerms + "&" + "api_key=" + API_KEY);
    search.value = "";
  } else {
    window.location.reload();
  }
});

function setClassByVote(votes) {
  if (votes >= 8) {
    return "green";
  } else if (votes >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
