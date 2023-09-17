
const cart = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const verMasButton = document.getElementById('btn-load');
const products = [
    {
        id: 1,
        name: "Dulce de leche latte",
        price: 1000,
        category: "bebidas calientes",
        cardImg: "./assets/dulcedelechelatte.png",
    },
    {
        id: 2,
        name: "Vainilla latte",
        price: 1100,
        category: "bebidas calientes",
        cardImg: "./assets/vainillalatte.png",
    },
    {
        id: 3,
        name: "Latte",
        price: 1200,
        category: "bebidas calientes",
        cardImg: "./assets/latte.png",
    },
    {
        id: 4,
        name: "Capuccino helado",
        price: 1200,
        category: "bebidas frías",
        cardImg: "./assets/capuccinohelado.png",
    },
    {
        id: 5,
        name: "Mocha helado",
        price: 1200,
        category: "bebidas frías",
        cardImg: "./assets/mochahelado.png",
    },
    {
        id: 6,
        name: "Cheese avocado toast",
        price: 1500,
        category: "comidas",
        cardImg: "./assets/CheeseAvocadoToast.png",
    },
    {
        id: 7,
        name: "Croissant relleno de avellana",
        price: 1300,
        category: "comidas",
        cardImg: "./assets/CroissantRellenoAvellana.png",
    },
    {
        id: 8,
        name: "Shaken Lemonade Hibiscus",
        price: 1500,
        category: "bebidas frías",
        cardImg: "./assets/tehibiscus.png",
    },
    {
        id: 9,
        name: "Shaken Lemonade Green Tea",
        price: 1100,
        category: "bebidas frías",
        cardImg: "./assets/teverde.png",
    },
    {
        id: 10,
        name: "Porridge Avena Chocolate y Maní",
        price: 1400,
        category: "comidas",
        cardImg: "./assets/Porridge.png",
    }
];

let carrito = JSON.parse(localStorage.getItem("cart")) || [];
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(carrito));
    }

const productsEachPage = 6;
let actualPage = 1;
let productsDisplayed = 0;
let currentCategory = 'all';

function displayProducts(category) {
    const productsContainer = document.getElementById('products-container');

    if (currentCategory !== category){
        productsDisplayed = 0;
        currentCategory = category;
        productsContainer.innerHTML = '';
    }
    
    const startIndex = (actualPage - 1) * productsEachPage;
    const endIndex = startIndex + productsEachPage;
    
    const productsToShow = products.filter(product =>{
        return category === 'all' || product.category === category;
    });

    productsToShow.slice(productsDisplayed, endIndex).forEach((product) => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
            <h3> ${product.name}</h3>
            <img src=${product.cardImg}>
            <p>$${product.price} ARS</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
            `;
            productsContainer.appendChild(card);
            productsDisplayed++;
        
    });
    
    if (productsDisplayed >= products.length){
        verMasButton.style.display = 'none';
    } else{
        verMasButton.style.display = 'block';
    }
}

const categoryButtons = document.querySelectorAll('#categories button');
categoryButtons.forEach((button) =>{
    button.addEventListener('click', () =>{
        const category = button.getAttribute('data-category');
        displayProducts(category);
    });
});
    

function updateQuantity(productId, quantity){
    const cartElements = document.querySelectorAll(`#cart-items li[data-product-id="${productId}"]`);
    cartElements.forEach((cartElement) => {
        const quantityElement = cartElement.querySelector('.quantity');
        if(quantityElement){
            quantityElement.textContent = `Cantidad: ${quantity}`;
        }
    });
}


function updateCartUI() {
    cartItems.innerHTML = '';
    
    let total = 0;
    for (const productId in cart){
        const cartItem = cart[productId];
        if (cartItem && cartItem.product) {
            const product = cartItem.product;
            const quantity = cartItem.quantity;
            const cartItemElement = document.createElement('li');
            cartItemElement.innerHTML = `
            <div class="cart-item">
            <p>${product.name} - $${product.price} - <img src=${product.cardImg}></p>
            <div class="cart-item-details">
            <p class="quantity">Cantidad: ${quantity}</p>
            <button onclick="removeFromCart(${product.id})">Eliminar</button>
            <div>
            <div>
            `;
            cartItems.appendChild(cartItemElement);
            total += product.price * quantity;
        }
    }
    cartTotal.textContent = total.toFixed(2);
}

function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (product) {
        if (cart[productId]) {
            cart[productId].quantity++;
        } else {
            cart[productId] = {
                product: product,
                quantity: 1,
            };
        }
        updateCartUI();
        updateQuantity(productId, cart[productId].quantity);
    }
}


function removeFromCart(productId) {
    if (cart[productId]) {
            if (cart[productId].quantity > 1) {
                cart[productId].quantity--;
        }else{
            delete cart[productId];
        }
        updateCartUI();
        updateQuantity(productId, cart[productId] ? cart[productId].quantity : 0);
    }
}


verMasButton.addEventListener("click", function(){
    actualPage++;
    displayProducts('all');
});


displayProducts('all');
