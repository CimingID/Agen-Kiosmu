const productsDiv = document.getElementById("products");
const paginationDiv = document.getElementById("pagination");
const inputNomor = document.getElementById('nomor');
const output = document.querySelector('.Operator');
const paymentDetailsBody = document.getElementById("paymentDetailsBody");
const searchData = {}; // Object to store search data



//TOKEN DI SINI
const tokenReal = "eyJhcHAiOiIxNTIzOTMiLCJhdXRoIjoiMjAyNDAyMjciLCJzaWduIjoibzl6d2E3T29XMXdlOGQzNWtWdVJCUT09In0="; // Replace "your_token_here" with your actual token

//KOMPONEN URL API
let token = tokenReal;
let categoryOne = 559580;
let categoryTwo = 559581;
let categoryThree = 559582;
let categoryFour = 559583;
let itemsPerPage = 50;
let currentPage = 1;


//URL GET API
const urlOne = "https://openapi.bukaolshop.net/v1/app/produk?id_kategori=" + categoryOne + "&token=" + token + "&total_data=" + itemsPerPage;

const urlTwo = "https://openapi.bukaolshop.net/v1/app/produk?id_kategori=" + categoryTwo + "&token=" + token + "&total_data=" + itemsPerPage;

const urlThree = "https://openapi.bukaolshop.net/v1/app/produk?id_kategori=" + categoryThree + "&token=" + token + "&total_data=" + itemsPerPage;

const urlFour = "https://openapi.bukaolshop.net/v1/app/produk?id_kategori=" + categoryFour + "&token=" + token + "&total_data=" + itemsPerPage;


// API PRODUCTS ONE
async function productsOne(page) {
  var response = await fetch(urlOne);
  var productResponse = await response.json();
  displayProducts(productResponse.data);
  displayPagination(page, Math.ceil(productResponse.total / itemsPerPage));
  // console.log(transaksiResponse);
}

// API PRODUCTS TWO
async function productsTwo(page) {
  var response = await fetch(urlTwo);
  var productResponse = await response.json();
  displayProducts(productResponse.data);
  displayPagination(page, Math.ceil(productResponse.total / itemsPerPage));
  // console.log(transaksiResponse);
}

// API PRODUCTS THREE
async function productsThree(page) {
  var response = await fetch(urlThree);
  var productResponse = await response.json();
  displayProducts(productResponse.data);
  displayPagination(page, Math.ceil(productResponse.total / itemsPerPage));
  // console.log(transaksiResponse);
}

// API PRODUCTS FOUR
async function productsFour(page) {
  var response = await fetch(urlFour);
  var productResponse = await response.json();
  displayProducts(productResponse.data);
  displayPagination(page, Math.ceil(productResponse.total / itemsPerPage));
  // console.log(transaksiResponse);
}



//FORMAT PRICE/HARGA
function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { maximumSignificantDigits: '10', style: 'currency', currency: 'IDR' }).format(price);
}
//======END=========

//CETAK PRODUK
function displayProducts(products) {
  //Tampilkan produk tergantung harga 
  products.sort((a, b) => a.harga_produk - b.harga_produk);

  productsDiv.innerHTML = "";
  products.forEach(function (product) {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.addEventListener("click", function (e) {
      e.preventDefault();

      let warning = document.querySelector(".textid");
      // Jika nomor kosong warning dan shake
      if (inputNomor.value == "") {
        // Warning
        warning.classList.add("shake");
        warning.innerText = "*ID Dulu Kocak";
        //Hapus warning text
        setTimeout(function () {
          warning.classList.remove("shake");
          warning.innerText = "Masukkan Id";
        }, 1000);
      } else {
        //Show produk detail
        showProductDetails(product);
      }
    });

    // Html produk
    let productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    let productName = document.createElement("h2");
    productName.textContent = product.nama_produk;
    productName.classList.add("product-name");
    productDetails.appendChild(productName);

    let productPrice = document.createElement("h3");
    productPrice.textContent = " " + formatPrice(product.harga_produk);
    productPrice.classList.add("product-price");
    productDetails.appendChild(productPrice);

    productDiv.appendChild(productDetails);

    productsDiv.appendChild(productDiv);
  });
}
// ============END=================


//PAGES
function displayPagination(currentPage, totalPages) {
  paginationDiv.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    var pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    pageLink.classList.add("pagination-link");
    if (i === currentPage) {
      pageLink.classList.add("active");
    }
    pageLink.addEventListener("click", function (event) {
      event.preventDefault();
      fetchProducts(parseInt(event.target.textContent));
    });
    paginationDiv.appendChild(pageLink);
  }
}
//=============END============


// HTML PRODUK DETAILS
function showProductDetails(product) {
  paymentDetailsBody.innerHTML = `
            <h1>Detail Pembelian</h1>
            <p>Produk</p>
            <h2 id="beliPulsa"> ${product.nama_produk}</h2>
            <p>Nomor Tujuan :</p>
            <h2 id="noTujuan"> ${inputNomor.value.trim()}</h2>
            <p>Harga</p>
            <h2 id="HargaBarang"> ${" " + formatPrice(product.harga_produk)}</h2>
            <p id="linkUrl"> ${product.deskripsi_panjang}</p>
            <p id="periksa"></p><br>
            <button class="btn-close">Batal</button>

            <button class="btn-next">
            Lanjutkan
            </button>
        `;


  //Komponen detail produk
  let btnClose = document.querySelector(".btn-close");
  let ovrClose = document.querySelector(".overlay");
  let detail = document.getElementById("detailPembelian");
  detail.classList.add("activee");
  // Tombol close
  btnClose.addEventListener("click", () => detail.classList.remove("activee"));
  ovrClose.addEventListener("click", () => detail.classList.remove("activee"));


  // Fungsi untuk kirim produk
  var buyNowButton = document.querySelector('.btn-next');
  buyNowButton.addEventListener("click", function () {
    var urlProduk = product.url_produk + "?catatan=" + encodeURIComponent(inputNomor.value.trim());
    var nomor = document.getElementById("noTujuan").innerHTML;
    var warningNo = document.getElementById("periksa");

    if (nomor == null || nomor.length < 10 || nomor.length > 13 || nomor == "" || nomor == "0" || nomor == "none") {
      // jika nomor kosong jangan kirimkan data nomor harus lebih dari 10 karakter dan beri peringatan ke user
      warningNo.innerText = "*Periksa Nomor Tujuan";
      //hapus warning text
      setTimeout(function () {
        warningNo.innerText = "";
      }, 3000);
    } else {
      // jika nomor ada isinya dan isinya lebih dari 10 karakter kirimkan data ke bukaolshop
      window.location.href = urlProduk;
    }
  });
}
// ======== END HPD =======



// FILTER BUTTON CATEGORY
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
// const cekcek = document.querySelector('.Operator');

if (btn1.classList.contains('active')) {
  // cekcek.innerHTML = 'heyyo'
  productsOne();
}

btn1.addEventListener('click', function () {
  productsOne();
  // cekcek.innerHTML = 'clickme one';
});


btn2.addEventListener('click', function () {
  productsTwo();
  cekcek.innerHTML = 'clickme two';
});


btn3.addEventListener('click', function () {
  productsThree();
  cekcek.innerHTML = 'clickme three';
});


btn4.addEventListener('click', function () {
  productsFour();
  cekcek.innerHTML = 'clickme four';
});

// ==== END FBC ====











