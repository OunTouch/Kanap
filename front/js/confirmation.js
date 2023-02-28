//récupération de l'url de la page actuelle
let onPageUrl = window.location
console.log(onPageUrl);
//création d'un objet url à partir de l'url de la page
let url = new URL(onPageUrl);
console.log(url);
//récupération de l'identifiant de l'url
let id = url.searchParams.get('orderId');
console.log(id);
//affectation de l'identifiant en tant que numéro de commande
let target = document.getElementById('orderId');
target.textContent = id; 

