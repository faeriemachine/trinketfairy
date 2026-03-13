var myVar;

function preloader() {
    myVar = setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loader").classList.add('hidden');
  document.getElementById("loaded").classList.add('visible');
}
