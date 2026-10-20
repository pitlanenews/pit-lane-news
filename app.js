const translations = {
  it: {
    navNews:"Notizie",navRace:"Gran Premi",navStandings:"Classifiche",navAbout:"Chi siamo",
    heroTag:"DENTRO IL PADDOCK",heroKicker:"VELOCITÀ. STRATEGIA. PASSIONE.",heroTitle:"La Formula 1,<br><em>senza pause.</em>",
    heroDesc:"Le notizie, le analisi e le storie che fanno parlare il paddock.",heroButton:"LEGGI LE NOTIZIE",
    tickerLabel:"IN PRIMO PIANO",latestKicker:"IL POLSO DEL PADDOCK",latestTitle:"Ultime <em>notizie</em>",
    raceKicker:"IL PROSSIMO APPUNTAMENTO",raceTitle:"Pronti per<br><em>il prossimo GP?</em>",
    raceDesc:"Segui il weekend di gara con orari, aggiornamenti e risultati.",racePlaceholder:"CALENDARIO E RISULTATI",
    raceSoon:"In arrivo",raceNote:"Collega una fonte dati per aggiornare il calendario.",
    standingsKicker:"LA LOTTA AL TITOLO",standingsTitle:"Classifiche <em>F1</em>",
    dataNotice:"Le classifiche qui sono un segnaposto: prima della pubblicazione, collegare una fonte dati affidabile e aggiornata.",
    drivers:"PILOTI",constructors:"COSTRUTTORI",connectData:"Collega i dati per visualizzare la classifica.",
    aboutKicker:"OLTRE LA BANDIERA A SCACCHI",aboutTitle:"Ogni storia merita<br>la <em>pole position.</em>",
    aboutDesc:"Pit Lane News è un progetto editoriale indipendente per chi vive la Formula 1 tra notizie, analisi e passione. Contenuti in italiano e inglese, con fonti verificate e aggiornamenti trasparenti.",
    footerNote:"Progetto indipendente. Non affiliato a Formula 1 o FIA.",backTop:"TORNA SU ↑",
    read:"LEGGI L'ARTICOLO",published:"PUBBLICATO",editorialNote:"Contenuto dimostrativo: verifica fatti, fonti e diritti prima della pubblicazione."
  },
  en: {
    navNews:"News",navRace:"Race Weekends",navStandings:"Standings",navAbout:"About",
    heroTag:"INSIDE THE PADDOCK",heroKicker:"SPEED. STRATEGY. PASSION.",heroTitle:"Formula 1,<br><em>without pause.</em>",
    heroDesc:"The news, analysis and stories everyone in the paddock is talking about.",heroButton:"READ THE NEWS",
    tickerLabel:"IN FOCUS",latestKicker:"THE PADDOCK PULSE",latestTitle:"Latest <em>news</em>",
    raceKicker:"THE NEXT STOP",raceTitle:"Ready for<br><em>the next GP?</em>",
    raceDesc:"Follow race weekend with schedules, updates and results.",racePlaceholder:"CALENDAR & RESULTS",
    raceSoon:"Coming soon",raceNote:"Connect a data source to update the calendar.",
    standingsKicker:"THE TITLE FIGHT",standingsTitle:"F1 <em>standings</em>",
    dataNotice:"Standings are placeholders. Connect a reliable, up-to-date data source before publishing.",
    drivers:"DRIVERS",constructors:"CONSTRUCTORS",connectData:"Connect data to display the standings.",
    aboutKicker:"BEYOND THE CHEQUERED FLAG",aboutTitle:"Every story deserves<br><em>pole position.</em>",
    aboutDesc:"Pit Lane News is an independent editorial project for fans who live and breathe Formula 1. News, analysis and passion in Italian and English, with verified sources and transparent updates.",
    footerNote:"Independent project. Not affiliated with Formula 1 or the FIA.",backTop:"BACK TO TOP ↑",
    read:"READ THE STORY",published:"PUBLISHED",editorialNote:"Sample content: verify facts, sources and image rights before publishing."
  }
};
let currentLang = "it";
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const news = (window.PITLANE_NEWS || []).slice().sort((a,b)=>b.date.localeCompare(a.date));
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function dateLabel(date){try{return new Intl.DateTimeFormat(currentLang==="it"?"it-IT":"en-GB",{day:"2-digit",month:"short",year:"numeric"}).format(new Date(date+"T12:00:00"));}catch{return date;}}
function field(obj,key){return (obj && (obj[key]?.[currentLang] || obj[key]?.it || obj[key]?.en)) || "";}
function applyLanguage(){
  document.documentElement.lang=currentLang;
  $$("[data-i18n]").forEach(el=>{const val=translations[currentLang][el.dataset.i18n];if(val!==undefined)el.innerHTML=val;});
  $("#langSwitch").textContent=currentLang==="it"?"EN":"IT";
  renderNews();
}
function cardMarkup(item, mode="grid"){
  const title=esc(field(item,"title")), excerpt=esc(field(item,"excerpt")), category=esc(field(item,"category"));
  const image=esc(item.image||"");
  const meta=`<div class="meta">${esc(dateLabel(item.date))} · ${esc(item.author||"Pit Lane News")}</div>`;
  if(mode==="lead") return `<div class="lead-image" style="background-image:url('${image}')"><span class="category">${category}</span></div><div class="lead-copy">${meta}<h3>${title}</h3><p>${excerpt}</p><span class="read-more">${translations[currentLang].read}<span>↗</span></span></div>`;
  if(mode==="side") return `<div class="side-image" style="background-image:url('${image}')"></div><div class="side-copy">${meta}<h3>${title}</h3><span class="read-more">${translations[currentLang].read} <span>↗</span></span></div>`;
  return `<div class="news-image" style="background-image:url('${image}')"><span class="category">${category}</span></div><div class="news-copy">${meta}<h3>${title}</h3><p>${excerpt}</p><span class="read-more">${translations[currentLang].read}<span>↗</span></span></div>`;
}
function renderNews(){
  const featured=news.find(n=>n.featured)||news[0];
  const rest=news.filter(n=>n!==featured);
  $("#leadCard").innerHTML=featured?cardMarkup(featured,"lead"):"<p>No articles yet.</p>";
  $("#leadCard").onclick=()=>featured&&openArticle(featured);
  $("#sideNews").innerHTML=rest.slice(0,2).map(n=>`<article class="side-card" data-id="${esc(n.id)}">${cardMarkup(n,"side")}</article>`).join("");
  $("#newsGrid").innerHTML=rest.slice(2).map(n=>`<article class="news-card" data-id="${esc(n.id)}">${cardMarkup(n,"grid")}</article>`).join("");
  $$("[data-id]").forEach(el=>el.addEventListener("click",()=>{const item=news.find(n=>n.id===el.dataset.id);if(item)openArticle(item);}));
}
function openArticle(item){
  const title=esc(field(item,"title")),body=esc(field(item,"body")).replace(/\n/g,"<br>");
  $("#articleBody").innerHTML=`<div class="dialog-content"><div class="dialog-image" style="background-image:url('${esc(item.image||"")}')"></div><div class="meta">${esc(field(item,"category"))} · ${translations[currentLang].published} ${esc(dateLabel(item.date))}</div><h2>${title}</h2><p>${body}</p><p class="disclaimer">${translations[currentLang].editorialNote}</p></div>`;
  $("#articleDialog").showModal();
}
$("#langSwitch").addEventListener("click",()=>{currentLang=currentLang==="it"?"en":"it";applyLanguage();});
$("#menuToggle").addEventListener("click",()=>$(".main-nav").classList.toggle("open"));
$("#dialogClose").addEventListener("click",()=>$("#articleDialog").close());
$("#articleDialog").addEventListener("click",e=>{if(e.target===$("#articleDialog"))$("#articleDialog").close();});
$("#today").textContent=new Intl.DateTimeFormat("it-IT",{day:"2-digit",month:"short",year:"numeric"}).format(new Date()).toUpperCase();
$("#year").textContent=new Date().getFullYear();
applyLanguage();
