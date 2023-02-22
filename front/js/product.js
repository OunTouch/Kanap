//récupération des parmètres de l'URL
const urlSearch = window.location.search;
const urlParams = new URLSearchParams(urlSearch);
const productId = urlParams.get('id');

//création d'un fonction d'affichage du produit sélectionné
async function displayProduct(){
    //appel à l'api et conversion au format JSON
    const response = await fetch('http://localhost:3000/api/products/' + productId)
    const product = await response.json();

    //affichage du titre de la page
    const initialTitle = document.querySelector('title');
    const pageTitle = document.createElement('title');
    pageTitle.textContent = product.name;
    initialTitle.replaceWith(pageTitle);

    //affichage de l'image du produit
    const imgParent = document.getElementsByClassName('item__img');
    const imgProduct = document.createElement('img');
    imgProduct.src = product.imageUrl;
    imgProduct.alt = product.altTxt;
    imgParent[0].appendChild(imgProduct);

    //affichage du titre, prix et description du produit
    const productTitle = document.createElement('h1');
    productTitle.textContent = product.name;
    document.querySelector('#title').appendChild(productTitle);

    const priceProduct = document.createElement('p');
    priceProduct.textContent = product.price;
    document.querySelector('#price').appendChild(priceProduct);

    const descriptionProduct = document.createElement('p');
    descriptionProduct.textContent = product.description;
    document.querySelector('#description').appendChild(descriptionProduct);

    //affichage des options de couleur du produit
    for (let color of product.colors){
        const colorProduct = `<option value="${color}">${color}</option>`;
        document.querySelector('#colors').insertAdjacentHTML('beforeend',colorProduct);
    }


}

//appel de la fonction d'affichage du produit
displayProduct();

/*
//gestion de l'ajout au panier
document.querySelectorAll('#addToCart').addEventListener('click', () => {
        //récupération de la couleur et la quantité séléctionnées par l'utilisateur
        const colorPicked = document.querySelector('#colors').value;
        const quantityPicked = document.querySelector('#quantity').value;
    
        //vérification du choix d'une couleur et d'une quantité
        if (colorPicked == ''){
            alert('Choisissez une couleur'); 
            return
        }
        if (quantityPicked < 1 || quantityPicked > 100){
            alert('Mettez une quantité valide');
            return
        }
        
        //appel de la fonction d'ajout au panier
        addToCart();
});

/*

//création de la fonction d'ajout au panier
function addToCart(){
    //récupération du panier depuis le localStorage
    const cart = localStorage.getItem('cart') != null ||
    localStorage.getItem('cart') != undefined ? JSON.parse(localStorage.getItem('cart')) : [];
   /* explication 
   const maVariable = (condition) ? ceQueMaVariableVaContenirSiLaConditionEstVraie : ceQueMaVariableVaContenirSiLaConditionEstFausse;*/
/*
    //récupération des données saisies par l'utilisateur
    const color = document.querySelector('#colors').value;
    const quantity = parseInt(document.querySelector('#quantity').value);
    const name = document.querySelector('#title').textContent;
    const image = document.querySelector('.item__img').innerHTML;
    const productPicked = {
        id: productId, color, image, name, quantity,
    };

    //ajout du produit si le panier est vide
    if (cart.length <= 0){
        cart.push(productPicked);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Produit ajouté au panier');
        return
    };

    //mise à jour de la quantité si le produit existe déjà dans le panier
    const index = cart.findIndex((product) => productPicked.id === productId && productPicked.color === color);
    if (index != -1){
        const newQuantity = quantity + cart[index].quantity;

        //validation de la quantité
        if (newQuantity > 100){
            alert('Quantité limitée à 100'); 
            return
        }

        //mise à jour de la quantité
        cart[index].quantity += quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('La quantité a été mise à jour');
        return;
    }

    //ajout du produit au panier
    cart.push(productPicked);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produit ajouté au panier');
}

*/
    // Gestion de l'ajout au panier
document.querySelector('#addToCart').addEventListener('click', () => {
    // Récupération de la couleur et de la quantité sélectionnées par l'utilisateur
    const color = document.querySelector('#colors').value;
    const quantity = document.querySelector('#quantity').value;
  
    // Validation de la couleur et de la quantité
    // Si la couleur est vide
    if (color == '') {
      alert('Choisissez une couleur');
      return;
    }
    // Si la quantité n'est pas valide
    if (quantity < 1 || quantity > 100) {
      alert('Mettre une quantité valide');
      return;
    }
  
    // Lancement de la fonction addToCart
    addToCart();
  });
  
  // Fonction d'ajout au panier
  function addToCart() {
    // Récupération du panier dans le local storage
    const cart =
      localStorage.getItem('cart') != null ||
      localStorage.getItem('cart') != undefined
        ? JSON.parse(localStorage.getItem('cart'))
        : [];
  
    // Récupération des données du produit
    const color = document.querySelector('#colors').value;
    const quantity = parseInt(document.querySelector('#quantity').value);
    const name = document.querySelector('#title').textContent;
    const image = document.querySelector('.item__img').innerHTML;
    const product = {
      id: productId,
      color,
      image,
      name,
      quantity,
    };
  
    // Si le panier est vide, ajout du produit
    if (cart.length <= 0) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Produit ajouté au panier');
      return;
    }
  
    // Si le produit existe déjà dans le panier, mise à jour de la quantité
    const index = cart.findIndex(
      (product) => product.id === productId && product.color === color
    );
    if (index != -1) {
      const newQuantity = quantity + cart[index].quantity;
  
      // Validation de la quantité
      if (newQuantity > 100) {
        alert('Trop de produits');
        return;
      }
  
      // Mise à jour de la quantité
      cart[index].quantity += quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('La quantité du produit a été mise à jour');
      return;
    }
  
    // Ajout du produit au panier
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produit ajouté au panier');
  }
  
