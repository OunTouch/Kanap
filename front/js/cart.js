//récupération de la string "cart" depuis le localStorage sous forme d'objet
let productInLocalStorage = JSON.parse(localStorage.getItem('cart'));

//déclaration de la variable qui contiendra les données des produits
let datas = [];


//récupération des données depuis l'API
async function getDatas(){
    let response = await fetch ('http://localhost:3000/api/products/');
    let datas = await response.json();
    //appel de fonction ayant pour paramètres les donées des produits
    showCart(datas);
    removeProduct();
    updateQuantity(datas);
    getAllPrices(datas);
    totalArticles();    
}

//appel de la fonction getDatas si le localStorage contient quelque chose
if (productInLocalStorage.length > 0){
    getDatas();
}

//affichage des produits du localStorage
function showCart(datas){
    for (let data of productInLocalStorage){
        //récupération de l'index du produit dans l'array datas
        const index = datas.findIndex((product) => product._id === data.id);
        console.log(index);
        //affichage HTML
        const product = `<article class="cart__item" data-id="${data.id}" data-color="${data.color}">
        <div class="cart__item__img">
          ${data.image}
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${data.color}</p>
            <p>${datas[index].price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${data.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
      //insertion HTML dans la page
      document.getElementById('cart__items').insertAdjacentHTML('beforeend', product)
    }
}

//création de la fonction de suppression
function removeProduct(){
    const deleteItem = document.getElementsByClassName('deleteItem');
    for (let a= 0; a < deleteItem.length; a++){
    //ajout d'un gestionnaire d'évènements à l'élément "Supprimer"
    deleteItem[a].addEventListener('click', (event) =>{
        //prévient le comportement par défaut de la page
        event.preventDefault();

        //enregistre l'id et la couleur du produit à supprimer
        let deleteId = productInLocalStorage[a].id;
        let deleteColor = productInLocalStorage[a].color;
        

        //filtre les produits à conserver dans le panier
        productInLocalStorage = productInLocalStorage.filter((element) => element.id !== deleteId || element.color !== deleteColor);

        //mise à jour du localStorage avec les produits filtrés
        localStorage.setItem('cart', JSON.stringify(productInLocalStorage));

        alert('Votre article a bien été retiré du panier!');

        //actualise la page
        window.location.href = 'cart.html';
        });
    }
}

//création de la fonction calculant le nombre total d'articles dans le panier
function totalArticles(){
  let totalItems = 0;

  for (e in productInLocalStorage){
    //conversion de la quantité en entier et ajout à totalItems
    const newQuantity = parseInt(productInLocalStorage[e].quantity);
    totalItems += newQuantity;
  }

  //affichage du nombre total d'articles
  const totalQuantity = document.getElementById('totalQuantity');
  totalQuantity.textContent = totalItems;
}

//création de la fonction de mise à jour de la quantité de produits

function updateQuantity(datas){
  let itemQuantity = document.querySelectorAll('itemQuantity');
  for (let i = 0; i < itemQuantity.length; i++){
    //ajout d'un gestionnaire d'évènement de type "change"
    itemQuantity[i].addEventListener('change', (event) =>{
      //empêche le comportement par défaut de l'agent utilisateur
      event.preventDefault();
      //récupération de la quantité et création d'un objet avec les nouveaux produits
      let newItemQuantity = itemQuantity[i].value;
      const newLocalStorage = {
        id: productInLocalStorage[i].id,
        image: productInLocalStorage[i].image,
        alt: productInLocalStorage[i].alt,
        name: productInLocalStorage[i].name,
        color: productInLocalStorage[i].color,
        quantity: parseInt(newItemQuantity),
      };
      //message d'erreur si erreur de quantité
      if(newItemQuantity > 100 || newItemQuantity <= 0){
        alert('Veuillez renseigner une quantité valide');
        return
      }
      //stockage dans le localStorage
      productInLocalStorage[i] = newLocalStorage;
      localStorage.setItem('cart', JSON.stringify(productInLocalStorage));
      //appel aux fonctions de nombre d'articles et de prix
      totalArticles();
      getAllPrices(datas);
    })
  }
}

//création de la fonction de calcul du prix
function getAllPrices(datas) {
  // Utiliser reduce pour réduire productInLocalStorage en une seule valeur
  console.log(productInLocalStorage);
  const result = productInLocalStorage.reduce(
    (acc, currentValue) => {
      const index = datas.findIndex(
        (product) => product._id === currentValue.id
      );
      // Accumuler la quantité et le prix du produit courant
      acc.nbProduct += parseInt(currentValue.quantity);
      acc.totalPrice += parseInt(currentValue.quantity * datas[index].price);
      
      console.log(index);
      console.log(acc);
 
      return acc;
    },
    
    { nbProduct: 0, totalPrice: 0 }
  ); // Valeur initiale de l'accumulateur
  console.log(result);
  // Affiche le nombre total de produits et le prix total

  document.querySelector('#totalPrice').textContent = result.totalPrice;
}

//création du formulaire

//récupération des champs HTML à remplir
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.querySelector('#email');

//ajout d'un gestionnaire d'évènements sur le bouton de commande
const sendOrder = document.getElementById('order');
sendOrder.addEventListener('click', () => {
  //appel des fonctions de vérification du formulaire
  firstNameValid();
  lastNameValid();
  addressValid();
  cityValid();
  emailValid();
});

//création de la fonction de vérification du champ firstname

function firstNameValid(){
    let firstNameMessage = document.querySelector('#firstNameErrorMsg');
    const firstNameValue = firstName.value.trim();

    //si le champ firstname n'est pas rempli
    if (firstNameValue === ''){
      firstNameMessage.textContent= 'Veuillez renseigner ce champ';
    }
    //si la valeur du champ firstname ne correspond pas au motif de caractères alphabétques et d'espaces
    else if (!firstNameValue.match(/^[a-zA-Z-\s]+$/)){
      firstNameMessage.textContent= 'Ne doit pas contenir de chiffres';
    }
    //si aucune erreur n'est détectée
    else{
      firstNameMessage.textContent='';
    }
}

//création de la fonction de vérification du champ lastname
function lastNameValid(){
  let lastNameMessage = document.querySelector('#lastNameErrorMsg');
  const lastNameValue = lastName.value.trim();

  if(lastNameValue === ''){
    lastNameMessage.textContent = 'Veuillez renseigner ce champ';
  }
  else if (!lastNameValue.match(/^[a-zA-Z-\s]+$/)){
    lastNameMessage.textContent = 'Ne doit pas contenir de chiffres';
  } else {
    lastNameMessage.textContent = '';
  }
}

//création de la fonction de vérification du champ address
function addressValid(){
  let addressNameMessage = document.querySelector('#addressErrorMsg');
  const addressNameValue = address.value.trim();
  if (addressNameValue === ''){
    addressNameMessage.textContent = 'Veuillez renseigner ce champ';
  } else {
    addressNameMessage.textContent = '';
  }
}

//création de la fonction de vérification du champ city
function cityValid(){
  let cityNameMessage =document.querySelector('#cityErrorMsg');
  const cityNameValue = city.value.trim();
  if (cityNameValue === ''){
    cityNameMessage.textContent = 'Veuillez renseigner ce champ'
  } else {
    cityNameMessage.textContent = '';
  }
}

//création de la fonction de vérification du champ email
function emailValid(){
  let emailMessage = document.querySelector('#emailErrorMsg');
  const emailValue = email.value.trim();
  if (emailValue === ''){
    emailMessage.textContent = 'Veuilez renseigner ce champ';
  } else
  //vérification de la conformité de l'adresse email grâce à une expression régulière 
  if (!emailValue.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
    emailMessage.textContent = 'Veuillez renseigner un email valide'
  } else {
    emailMessage.textContent = '';
  }
}

//gestion du passage de la commande
sendOrder.addEventListener('click', function (e){
  //annulation du comportement par défaut de la page
  e.preventDefault();
  //récupération des produits sous forme d'objets
  let products = JSON.parse(localStorage.getItem('cart'));
  //alerte en cas de panier vide
  if (products === null || products.length < 1){
    alert('Vote panier est vide');
    return;
  }
  //array contenant les produits de la commande
  const productsId = [];
  //ajout de chaque produit présent dans le panier à l'array contenant les produits 
  products.forEach((product) => {
    productsId.push(product.id)
  });
  //objet contenant toutes les informations de la commande
  const order = {
    contact : {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products: productsId,
  };
  //vérifications que les informations saisies sont exactes
  if (
    firstNameValid && lastNameValid && addressValid && cityValid && emailValid
  ){
    //appel à la fonction d'envoi de la commande au serveur
    orderProduct(order);
  }
});

//création de la fonction d'envoi de la commande
function orderProduct(order) {
  //appel à l'API avec la méthode post
  fetch('http://localhost:3000/api/products/order', {
    method:'POST',
    //spécification à l'PI du format des données
    headers: {
      'Content-Type': 'application/json',
    },
    //envoi de l'obet JSON
    body: JSON.stringify(order),
  })
  //vérification que le serveur a bien reçu la commande
  .then(function (res){
    if (res.ok){
      return res.json();
    }
  })
  //récupération de l'identifiant de commande dans la réponse du serveur
  .then(function (value) {
    window.location = `./confirmation.html?orderId=${value.orderId}`;
    //effacement du localStorage
    localStorage.clear
  })
  //gestion d'une erreur lors de l'appel à l'API
  .catch(function (err){
    alert("Désolé, votre commande n'a pas pu être envoyée");
  })
}