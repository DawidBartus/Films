const e=document.querySelector("form"),t=document.querySelector("#film_input"),a=document.querySelector(".film_holder"),n=document.querySelector(".buttons"),r=document.querySelector(".prev"),i=document.querySelector(".next"),l=document.querySelector(".pages_number");document.querySelectorAll(".page"),document.querySelector(".film_details");let s,c=1,o=[];const{log:d}=console,m=e=>fetch(e).then((e=>e.json())).catch((e=>d(e))),p=()=>{link=`https://api.themoviedb.org/3/trending/all/week?api_key=cd99a2449e6daaffb205ea92bac682a0&page=${c}`,m(link).then((e=>{s=e.total_pages,g(e.results),u(c)})),r.disabled=1===c,c===s&&(i.disabled=!0)},u=e=>{if(d("im working",e),l.innerHTML="",e>=1&&e<3)for(let e=1;e<=5;e++){let t=`<button class="page" >${e}</button>`;l.innerHTML=l.innerHTML+t}else for(let t=parseInt(e)-2;t<=parseInt(e)+2;t++){let e=`<button class="page" >${t}</button>`;l.innerHTML=l.innerHTML+e}},g=e=>{d(e),o=e,e.map((async e=>{let t=e.name||e.title,n=e.poster_path,r=` <div class="film__element" data-id="${e.id}">\n  <img class="film__backdrop" src="https://image.tmdb.org/t/p/original${n}" alt="" />\n  <p class="film__name">${t}</p>\n  <p class="film__genres">${await b(e.id)}</p>\n  </div>`;a.innerHTML=a.innerHTML+r})),d("im page ele array",o)},b=async e=>{let t,a=`https://api.themoviedb.org/3/movie/${e}?api_key=cd99a2449e6daaffb205ea92bac682a0`;return await m(a).then((a=>{if(!1===a.success){return m(`https://api.themoviedb.org/3/tv/${e}?api_key=cd99a2449e6daaffb205ea92bac682a0&language=en-US`).then((e=>{t=e.genres.map((e=>e.name))}))}t=a.genres.map((e=>e.name)).join(" ")})),t};p(),e.addEventListener("submit",(e=>{e.preventDefault();const a=t.value.replaceAll(" ","%20");if(a){m(`\n    https://api.themoviedb.org/3/search/multi?api_key=cd99a2449e6daaffb205ea92bac682a0&query=${a}`).then((e=>{d(e.results[0])}))}else d("sorry")})),n.addEventListener("click",(e=>{d(e.target),e.target===r?(c-=1,a.innerHTML="",p()):e.target===i?(c=parseInt(c)+1,a.innerHTML="",p()):(c=e.target.innerHTML,a.innerHTML="",p())})),a.addEventListener("click",(e=>{d(e.target.parentElement.dataset.id)}));
//# sourceMappingURL=index.d36a9e5e.js.map