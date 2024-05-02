document.addEventListener("DOMContentLoaded", () => showProducts("Men"));

function showProducts(category) {
  fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
    .then(response => response.json())
    .then(data => {
      const categoryData = data.categories.find(cat => cat.category_name === category);

      if (categoryData) {
        const productContainer = document.getElementById("product-container");
        productContainer.innerHTML = "";

        categoryData.category_products.forEach(createProductCard);


        styleTabs(category);
      }
    })
    .catch(error => console.error("Error fetching data:", error));
}

function styleTabs(selectedCategory) {
  const tabButtons = document.querySelectorAll("#tabs button");
  tabButtons.forEach(button => {
    button.style.backgroundColor = "white";
    button.style.color = "black";
  });

  const selectedButton = document.querySelector(`#tabs button.${selectedCategory.toLowerCase()}`);
  if (selectedButton) {
    selectedButton.style.backgroundColor = "black";
    selectedButton.style.color = "white";
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.title;
  image.className = "product-image";

  if (product.badge_text) {
    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = product.badge_text;
    card.appendChild(badge);
  }

  const title = document.createElement("h3");
  title.textContent = product.title;

  const vendor = document.createElement("p");
  vendor.textContent = `• ${product.vendor}`;
  title.style.float = "left";
  vendor.style.marginLeft = "1px";

  const price = document.createElement("p");
  price.textContent = `Rs ${product.price}.00`;

  const compareAtPrice = document.createElement("p");
  compareAtPrice.textContent = `${product.compare_at_price}.00`;
  compareAtPrice.style.textDecoration = "line-through";
  compareAtPrice.style.color = "grey";

  const discount = document.createElement("p");
  const discountPercentage = calculateDiscount(product.price, product.compare_at_price);
  discount.textContent = `${discountPercentage}% off`;
  discount.style.color = "red";

  price.style.display = "inline-block";
  compareAtPrice.style.display = "inline-block";
  discount.style.display = "inline-block";
  price.style.padding ="5%";
  compareAtPrice.style.padding ="5%";
  discount.style.padding ="5%";

  const addToCartButton = document.createElement("button");
  addToCartButton.className = "button";
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.addEventListener("click", showAlert); 

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(vendor);
  card.appendChild(price);
  card.appendChild(compareAtPrice);
  card.appendChild(discount);
  card.appendChild(addToCartButton);

  document.getElementById("product-container").appendChild(card);
}

function calculateDiscount(price, compareAtPrice) {
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

function showAlert() {
  alert("Product added to cart");
}
