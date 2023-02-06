const form = document.querySelector('form');
const input = document.querySelector('#film_input');
const key = 'cd99a2449e6daaffb205ea92bac682a0';
const filmHolder = document.querySelector('.film_holder');
const buttons = document.querySelector('.buttons');
const prevBttn = document.querySelector('.prev');
const nextBttn = document.querySelector('.next');
const bttnHolder = document.querySelector('.pages_number');
const pageBttn = document.querySelectorAll('.page');
const filmDetails = document.querySelector('.film_details');

let page = 1;
let pages;
let pageArray = [];

const { log } = console;

const films = e => {
  e.preventDefault();
  const film = input.value.replaceAll(' ', '%20');

  if (film) {
    let link = `
    https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${film}`;

    fetchFilm(link).then(res => {
      log(res.results[0]);
    });
  } else {
    log('sorry');
  }
};

// const fetchFilm = link => {
//   return fetch(link).then(res => {
//     if (!res.ok) {
//       throw new Error(res.status);
//     } else {
//       return res.json();
//     }
//   });
// };

const fetchFilm = link => {
  return fetch(link)
    .then(res => {
      return res.json();
    })
    .catch(error => log(error));
};

const tranding = () => {
  link = `https://api.themoviedb.org/3/trending/all/week?api_key=${key}&page=${page}`;
  fetchFilm(link).then(res => {
    pages = res.total_pages;

    DOMElement(res.results);
    generateBttn(page);
  });
  if (page === 1) {
    prevBttn.disabled = true;
  } else {
    prevBttn.disabled = false;
  }
  if (page === pages) {
    nextBttn.disabled = true;
  }
};

const changePage = e => {
  log(e.target);

  if (e.target === prevBttn) {
    page -= 1;
    filmHolder.innerHTML = '';
    tranding();
  } else if (e.target === nextBttn) {
    page = parseInt(page) + 1;
    filmHolder.innerHTML = '';
    tranding();
  } else {
    page = e.target.innerHTML;
    filmHolder.innerHTML = '';
    tranding();
  }
};
const generateBttn = page => {
  log('im working', page);
  bttnHolder.innerHTML = '';
  if (page >= 1 && page < 3) {
    for (let i = 1; i <= 5; i++) {
      let bttn = `<button class="page" >${i}</button>`;
      bttnHolder.innerHTML = bttnHolder.innerHTML + bttn;
    }
  } else {
    for (let i = parseInt(page) - 2; i <= parseInt(page) + 2; i++) {
      let bttn = `<button class="page" >${i}</button>`;

      bttnHolder.innerHTML = bttnHolder.innerHTML + bttn;
    }
  }
};

const DOMElement = ele => {
  log(ele);
  pageArray = ele;
  ele.map(async film => {
    let name = film.name || film.title;
    let poster = film.poster_path;
    let id = film.id;
    let genres = await getGenres(film.id);

    let HTMLelement = ` <div class="film__element" data-id="${id}">
  <img class="film__backdrop" src="https://image.tmdb.org/t/p/original${poster}" alt="" />
  <p class="film__name">${name}</p>
  <p class="film__genres">${genres}</p>
  </div>`;

    filmHolder.innerHTML = filmHolder.innerHTML + HTMLelement;
  });
  log('im page ele array', pageArray);
};

const getGenres = async id => {
  let link = `https://api.themoviedb.org/3/movie/${id}?api_key=cd99a2449e6daaffb205ea92bac682a0`;
  let gen;
  await fetchFilm(link).then(res => {
    if (res.success === false) {
      let link = `https://api.themoviedb.org/3/tv/${id}?api_key=cd99a2449e6daaffb205ea92bac682a0&language=en-US`;
      return fetchFilm(link).then(res => {
        gen = res.genres.map(ele => ele.name);
        // return gen;
      });
    } else {
      gen = res.genres.map(ele => ele.name).join(' ');
    }
  });
  return gen;
};

const details = e => {
  log(e.target.parentElement.dataset.id);

  let takToMaWygladac = `<img src="" alt="" srcset="" />
  <div>
    <ul>
      <li>
        <p></p>
        <p></p>
      </li>
      <li>
        <p></p>
        <p></p>
      </li>
      <li>
        <p></p>
        <p></p>
      </li>
      <li>
        <p></p>
        <p></p>
      </li>
    </ul>
    <h4></h4>
    <p></p>
  </div>`;
};

tranding();
form.addEventListener('submit', films);
buttons.addEventListener('click', changePage);
filmHolder.addEventListener('click', details);
// await fetchFilm(link).then(res => {
//     log(res);
//     if (res.genres) {
//       gen = res.genres.map(ele => ele.name).join(' ');
//       } else {
//         let link = `https://api.themoviedb.org/3/tv/${id}?api_key=cd99a2449e6daaffb205ea92bac682a0&language=en-US`;
//         fetchFilm(link).then(res => {
//           log(res);
//           gen = res.genres.map(ele => ele.name).join(' ');
//           log(gen);
//         });
//     }
//   });
