//création d'une fonction d'affichage des produits
async function displayProducts(){
    //appel à l'api
    const response = await fetch('http://localhost:3000/api/products');
    //conversion de la réponse au format JSON
    const datas = await response.json();
    //affichage de chaque élément présent dans la réponse
    for (let element of datas){
        //création d'une chaîne de caractère représentant les éléments HTML en fonction du produit
        const product = `
        <a href="./product.html?id=${element._id}">
        <article>
          <img src="${element.imageUrl}" alt="${element.altTxt}">
          <h3 class="productName">${element.name}</h3>
          <p class="productDescription">${element.description}</p>
        </article>
      </a>`;
    //sélection du noeud HTML auquel rattacher l'affichage
    const items = document.querySelector('#items');
    //création de l'HTML depuis la chaîne de carcatère
    items.insertAdjacentHTML('afterbegin', product);
    }
}

//appel de la fonction d'affichage
displayProducts();