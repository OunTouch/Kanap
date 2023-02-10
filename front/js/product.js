/*-----------------------------------------------
    Création d'une fonction async auto-appelée
------------------------------------------------*/
(async function () {
    // On récupère d'abord l'id du produit dans l'url
    const productId = getProductId();
    //console.log(productId)

    // On récupère le produit grâce à l'id
    const product = await getProduct(productId)
    console.log(product);

    // Puis on l'affiche
    displayProduct(product);
    
    // et on permet l'ajout de produit au panier
    addToCart(product);
    
})()

/*------------------------------------------------------------
    Creation de la fonction qui récupère l'id du produit
-------------------------------------------------------------*/
function getProductId() {
    return new URL(location.href).searchParams.get('_id')
}

/*--------------------------------------------------------
    Création de la fonction qui récupère le produit
        au sein de l'API via son id
---------------------------------------------------------*/
function getProduct(productId) {
    return fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function (product) {
            return product
        })
        .catch(function (error) {
            alert(error)
        })
}

/*------------------------------------------------------
    Création d'une fonction d'affichage d'un produit
            de l'API sur la page produit
-------------------------------------------------------*/
function displayProduct(product){
    let imgProduct = document.createElement("img");
    document.querySelector(".item__img").appendChild(imgProduct);
    imgProduct.src = product.imageUrl;
    imgProduct.alt = product.altTxt;
    let nameProduct = document.getElementById("title");
    nameProduct.innerHTML = product.name;
    let priceProduct = document.getElementById("price");
    priceProduct.innerHTML = product.price;
    let descriptionProduct = document.getElementById("description");
    descriptionProduct.innerHTML = product.description;
    for (let colors of product.colors){
        let colorsProduct = document.createElement("option");
        document.getElementById("colors").appendChild(colorsProduct);
        colorsProduct.value = colors;
        colorsProduct.innerHTML = colors;
    }
}

/*---------------------------------------------------------------------
        Création de la fonction d'ajout de produits au panier
----------------------------------------------------------------------*/
function addToCart(product) {
    // on cible le bouton 'Ajouter au panier'
    const button = document.getElementById('addToCart')

    // on écoute l'event au click sur le btn et on lui dit ce qu'il doit faire
    button.addEventListener("click", (e) => {
        // valeur de la couleur sélectionnée par l'utilisateur
        const color = document.getElementById('colors').value
        // valeur de la qty sélectionnée par l'utilisateur
        const qty = document.getElementById('quantity').value
        //on récupère l'id du produit en question
        const id = getProductId()

        // on vérifie que la color et qty sont conformes aux attentes
        if (color == undefined || color === "" || qty < 1 || qty > 100 || qty === undefined) {
            alert(`Veuillez sélectionner une couleur et/ou une quantité.`);
        } else {
            // on stocke les valeurs du produit choisit dans un objet
            let choosenProduct = {
                id: id,
                name: product.name,
                img: product.imageUrl,
                altTxt: product.altTxt,
                color: color,
                quantity: parseInt(qty, 10),
                price: product.price,
                totalPrice: product.price * parseInt(qty, 10)
            }
            console.log(choosenProduct)

            // on déclare une variable contenant le LS
            let localStorageBasket = JSON.parse(localStorage.getItem("basket"));

            // puis on vérifie si le basket existe déjà dans le LS
            if (localStorageBasket) {
                // on vérifie avec .find() si l'id et la couleur d'un article sont déjà présents et égaux
                let item = localStorageBasket.find(
                    (item) => item.id == choosenProduct.id && item.color == choosenProduct.color
                );
                // SI OUI > on ajoute la nouvelle quantité à l'ancienne
                if (item) {
                    const newItemQty = item.quantity + choosenProduct.quantity;
                    console.log(newItemQty)
                    // SI l'addition dépasse 100 ça ne marche pas et on alerte l'utilisateur
                    if (newItemQty > 100) {
                        return alert('Vous ne pouvez pas commander plus de 100 exemplaires.')
                    }
                    // et on réassigne item.quantity seulement si ça ne dépasse pas 100
                    item.quantity = newItemQty;

                    localStorage.setItem("basket", JSON.stringify(localStorageBasket));
                    return;
                   
                }
                 console.log(basket);
                // si le produit n'existe pas déjà dans le LS on le push
                localStorageBasket.push(choosenProduct);
                localStorage.setItem("basket", JSON.stringify(localStorageBasket));
            } else {
                //  sinon on crée un nouveau tableau dans lequel on push choosenProduct
                let newBasketLS = [];
                newBasketLS.push(choosenProduct);
                localStorage.setItem("basket", JSON.stringify(newBasketLS));
            }
            document.getElementById('addToCart').textContent = 'Produit ajouté!';
            //window.location.href = "cart.html" ?
        }
    })
}