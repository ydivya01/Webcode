document.body.innerHTML = `<div class="container1">
<div class="websiteName">
  <div class="headline text-white">
    <h1 class="text-white headline_h">Divya Cosmetics</h1>
    <p class="headline_p">GET READY FOR SPRING</p>
  </div>
</div>`

const breweryContent = document.createElement("div");
breweryContent.innerHTML =
  "<p class='text-center'>Divya Cosmetics</p>";

var apiUrl = "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";

var allProductsData = [];
var totalPages = 0;
var perPageRows = 5;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    allProductsData = data;
    totalPages = Math.round(data.length / perPageRows);
    createPagination();
    displayDataOnScreen(getPageData(1));
  });

function getPageData(pageNumber) {
  let lastElement = pageNumber * perPageRows;
  if (lastElement > allProductsData.length) {
    lastElement = allProductsData.length;
  }

  let firstElement = lastElement - perPageRows;
  if (firstElement < 0) {
    firstElement = 0;
  }
  return allProductsData.slice(firstElement, lastElement);
}

function displayDataOnScreen(currentPageData) {
  let productData = document.getElementById("productData");
  productData.innerHTML = "";
  currentPageData.forEach((element) => {
    productDisplayNode(element);
  });
}

function createPagination() {
  for (let i = 0; i < totalPages; i++) {
    let button = document.createElement("button");
button.className = "page"
    button.innerHTML = i + 1;
    button.addEventListener("click", (event) => {
      changePage(event.target.innerText);
    });
    paginationDiv.append(button);
  }
}

function changePage(page) {
  page = parseInt(page);
  displayDataOnScreen(getPageData(page));
}




function productDisplayNode({ name, brand, price, product_link , image_link}) {
  let productData = document.getElementById("productData");

  let mainProductCard = document.createElement("div");

  let nameNode = document.createElement("div");
  nameNode.innerHTML = `Name : ${name}`;
  nameNode.className = "name"

  let brandNode = document.createElement("div");
  brandNode.innerHTML = `Brand : ${brand}`;
  brandNode.className = "brand"

  let priceNode = document.createElement("div");
  priceNode.innerHTML = `Price : $${price}`;
  priceNode.className = "price"

  let imageNode = document.createElement("img");
  imageNode.src = `${image_link}`;
  imageNode.className = "image"  

  let productLink = document.createElement("a");
  var linkText = document.createTextNode("Product Link");
  productLink.className = "imagelink"
  
  productLink.appendChild(linkText);
  productLink.title = "Product Link";
  productLink.href = product_link;


  mainProductCard.append(nameNode);
  mainProductCard.append(productLink);
  mainProductCard.append(brandNode);
  mainProductCard.append(priceNode);
  mainProductCard.append(imageNode);


  productData.appendChild(mainProductCard);
}