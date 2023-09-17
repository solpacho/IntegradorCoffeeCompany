const overlay = document.querySelector('.overlay'); // Cambié el selector a '.overlay'

const nav = document.getElementById('nav');
const abrir = document.getElementById('abrir');
const cerrar = document.getElementById('cerrar');
const openCartButton = document.getElementById('openCart'); // Cambié el ID a 'openCart'
const closeCartButton = document.getElementById('closeCart');
const registrationForm = document.getElementById('contactForm');

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});
cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});

openCartButton.addEventListener("click", () => {
    cart.classList.add("visible");
});
closeCartButton.addEventListener("click", () => {
    cart.classList.remove("visible");
});

function handleClickOutside(event) {
    if (!nav.contains(event.target) && !cart.contains(event.target) &&
        event.target !== abrir && event.target !== openCartButton) {
            nav.classList.remove("visible");
            cart.classList.remove("visible");
        }
    }
    
    document.addEventListener('mousedown', handleClickOutside);

    registrationForm.addEventListener('submit', function(event){
    event.preventDefault();

const nombre = document.getElementById("nombre").value;
const email = document.getElementById("email").value;
const number = document.getElementById("celular").value;
const mensaje = document.getElementById("consulta").value;

if (nombre.length < 6){
    alert("Por favor, ingrese un nombre válido");
    return;
}

let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)){
    alert("Por favor, ingrese un email válido");
    return;
}

if (number.length > 8) {
    alert("El número debe tener al menos 8 caracteres.");
    return;
}

if (mensaje.length > 10){
    alert("La consulta debe tener al menos 10 caracteres.");
    return;
}

this.submit();
});

