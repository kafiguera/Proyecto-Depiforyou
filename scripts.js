// Carrito de compras
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDisplay() {
  const cartContainer = document.getElementById("cart-container");
  const totalElement = document.getElementById("total-amount");
  const cartCounter = document.getElementById("cart-counter");
  let total = 0;

  cartContainer.innerHTML = "";
  cart.forEach((item) => {
    total += item.amount;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>Precio: $${item.amount}</p>
            </div>
            <button class="button roboto-regular remove-from-cart" data-id="${item.id}">
                Eliminar
            </button>
        `;
    cartContainer.appendChild(cartItem);
  });

  totalElement.textContent = total;
  cartCounter.textContent = cart.length || "";
}

function addToCart(product) {
  cart.push(product);
  saveCart();
  updateCartDisplay();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id != productId);
  saveCart();
  updateCartDisplay();
}

function generateLaserHairRemovalProducts() {
  const products = [
    {
      id: 1,
      name: "Dispositivo de Depilación Láser",
      description: "Dispositivo de alta calidad para depilación láser en casa.",
      amount: 150,
      expandedDescription:
        "Este dispositivo de depilación láser de alta calidad está diseñado para uso doméstico. Cuenta con múltiples niveles de intensidad y es seguro para todo tipo de piel. Resultados profesionales desde la comodidad de tu hogar.",
    },
    {
      id: 2,
      name: "Gel Refrescante",
      description: "Gel calmante para después del tratamiento láser.",
      amount: 20,
      expandedDescription:
        "Gel refrescante especialmente formulado para calmar la piel después del tratamiento de depilación láser. Contiene aloe vera y otros ingredientes naturales que ayudan a reducir la irritación.",
    },
    {
      id: 3,
      name: "Limpiador Pre-Tratamiento",
      description: "Limpiador para preparar la piel antes de la depilación.",
      amount: 15,
      expandedDescription:
        "Limpiador suave pero efectivo que prepara tu piel para el tratamiento de depilación láser. Elimina impurezas y ayuda a obtener mejores resultados en el tratamiento.",
    },
    {
      id: 4,
      name: "Loción Post-Tratamiento",
      description:
        "Loción hidratante y protectora para después del tratamiento.",
      amount: 25,
      expandedDescription:
        "Loción hidratante especial post-tratamiento que ayuda a mantener la piel suave y protegida. Contiene ingredientes calmantes y regeneradores para el cuidado óptimo de tu piel.",
    },
  ];

  const productsContainer = document.getElementById("products-container");

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card roboto-regular";
    card.innerHTML = `
            <h3 class="roboto-medium">${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.amount}</p>
            <button class="button roboto-regular add-to-cart" data-id="${product.id}">
                Añadir al carrito
            </button>
            <br/>
            <button class="button roboto-regular expand-btn" data-id="${product.id}">
                Ver más detalles
            </button>
            <p class="expanded-description" id="desc-${product.id}" style="display: none;">
                ${product.expandedDescription}
            </p>
        `;
    productsContainer.appendChild(card);
  });

  // Event listeners
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
      const productId = e.target.getAttribute("data-id");
      const product = products.find((p) => p.id == productId);
      addToCart(product);
    }

    if (e.target.classList.contains("remove-from-cart")) {
      const productId = e.target.getAttribute("data-id");
      removeFromCart(productId);
    }

    if (e.target.classList.contains("expand-btn")) {
      const productId = e.target.getAttribute("data-id");
      const descElement = document.getElementById(`desc-${productId}`);
      if (descElement.style.display === "none") {
        descElement.style.display = "block";
        e.target.textContent = "Ver menos";
      } else {
        descElement.style.display = "none";
        e.target.textContent = "Ver más detalles";
      }
    }
  });

  // Agregar manejo del modal
  const modal = document.getElementById("cart-modal");
  const floatButton = document.getElementById("cart-float-button");
  const closeModal = document.querySelector(".close-modal");

  floatButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Modificar el evento del botón de pago
  document.getElementById("pay-button").addEventListener("click", function () {
    if (cart.length > 0) {
      alert("¡Gracias por tu compra! Tu pedido está en preparación.");
      cart = [];
      saveCart();
      updateCartDisplay();
      modal.style.display = "none";
    } else {
      alert("El carrito está vacío");
    }
  });

  // Actualizar el carrito al cargar la página
  updateCartDisplay();
}

// Ejecutar la función cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", generateLaserHairRemovalProducts);
