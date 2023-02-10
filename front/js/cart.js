// on récupère d'abord les article du basket dans le LS
let basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket)

// on crée un tableau pour récupérer les ID de chaque product du basket
let itemsId = [];

displayBasket(basket);

/*récupération produit sous forme de type complexe*/
/*function getBasket(){
    let basket = localStorage.getItem("basket");
    
    if(basket == null){
        return []
    }else{
        return JSON.parse(basket);
        console.log(basket);
    }
}*/

//Affichage du panier
function displayBasket(basket){
    for(choosenProduct of basket){
        let imgProduct = document.createElement("img");
        document.querySelector(".cart__item__img").appendChild(imgProduct);
        imgProduct.src = choosenProduct.img;
        imgProduct.alt = choosenProduct.altTxt;
        let nameProduct = document.getElementById("productName");
        nameProduct.innerHTML = choosenProduct.name;
        let priceProduct = document.getElementById("priceProduct");
        priceProduct.innerHTML = choosenProduct.price;
    }
}



/*retire du panier*/
function removeFromCart(product){
    let cart = getCart();
    cart = cart.filter(p => p.id != product.id);
    saveCart(cart);
}

/*change la quantité*/
function changeQuantity(product,quantity){
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id);
    if (foundProduct != undefined){
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0){
            removeFromCart(foundProduct);
        }else{
            saveCart(cart);
        }
    }
}

function getNumberOfProducts(){
    let cart = getCart();
    let number = 0;
    for (let product of cart){
        number += product.quantity;
    }
    return number
}

function getTotalPrice(){
    let cart = getCart();
    let total = 0;
    for (let product of cart){
        total += product.quantity * product.price;
    }
    return number
}



