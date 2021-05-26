const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

var requestURL = 'portfolioitem.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
    var portfolioItems = request.response;
    getContent(portfolioItems)
}

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

function werteliste(querystring) {
    if (querystring == '') return;
    var wertestring = querystring.slice(1);
    var paare = wertestring.split("&");
    var paar, name, wert;
    for (var i = 0; i < paare.length; i++) {
        paar = paare[i].split("=");
        name = paar[0];
        wert = paar[1];
        name = unescape(name).replace("+", " ");
        wert = unescape(wert).replace("+", " ");
        this[name] = wert;
    }
    return {
        "name": name,
        "wert": wert
    }
}

var liste = werteliste(location.search);

function getContent(data) {
    $(".intro__img").attr("src", data[liste["wert"] - 1]["img"]);
    $(".portfolio__text").text(data[liste["wert"] - 1]["description"]);
    $(".portfolio__title").html(data[liste["wert"] - 1]["title"]);
    $(".portfolio__subtitle").text(data[liste["wert"] - 1]["subtitle"]);
    $(".portfolio__btn").attr("href", data[liste["wert"] - 1]["git-link"]);
}
