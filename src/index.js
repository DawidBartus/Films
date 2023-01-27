const bttn = document.querySelector('[type="submit"]');
const form = document.querySelector('form');
const input = document.querySelector('#film_input');
const key = 'cd99a2449e6daaffb205ea92bac682a0';
const filmHolder = document.querySelector('.film_holder');

const { log } = console;

// const films = e => {
//   e.preventDefault();
//   const film = input.value.replaceAll(' ', '%20');

//   log('film', film);

//   if (film) {
//     let link = `
//     https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${film}`;
//     log(link);
//     fetchFilm(link).then(res => {
//       log(res.results[0]);
//     });
//   } else {
//     log('sorry');
//   }
// };

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
  link = `https://api.themoviedb.org/3/trending/all/week?api_key=${key}`;
  fetchFilm(link).then(res => DOMElement(res.results));
};

const DOMElement = ele => {
  //   log(ele);
  ele.map(async film => {
    let name = film.name || film.title;
    let backdrop = film.backdrop_path;
    let generes = await getGenres(film.id);

    let HTMLelement = ` <div>
  <img src="${backdrop}" alt="" />
  <p>${name}</p>
  <p>${generes}</p>
  </div>`;

    filmHolder.innerHTML = filmHolder.innerHTML + HTMLelement;
  });
};

const getGenres = async id => {
  let link = `https://api.themoviedb.org/3/movie/${id}?api_key=cd99a2449e6daaffb205ea92bac682a0`;
  let gen;
  await fetchFilm(link).then(res => {
    if (res.success === false) {
      let link = `https://api.themoviedb.org/3/tv/${id}?api_key=cd99a2449e6daaffb205ea92bac682a0&language=en-US`;
      fetchFilm(link).then(res => {
        gen = res.genres.map(ele => ele.name).join(' ');
        log(gen);
        return gen;
      });
    } else {
      gen = res.genres.map(ele => ele.name).join(' ');
    }
  });
  return gen;
};

tranding();

// form.addEventListener('submit', films);

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
