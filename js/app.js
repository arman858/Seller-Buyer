let allArr = [];
let toShop = [];
let toyArr = [];
let flowerArr = [];
let bookArr = [];

let buttonAdder = document.getElementById("button-add");

class Product {
    constructor(name, price, type, id) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.id = id;
    }
}

buttonAdder.addEventListener("click", function () {
    finder();
    showIt();
})


function finder() {
    let productName = document.getElementById("product-name").value;
    let productPrice = document.getElementById("product-price").value;
    let productType = document.getElementById("selection").value;

    let id = Math.random();
    if (productPrice && productName && productType !== "Product type") {
        let obj = new Product(productName, productPrice, productType, id);
        for (let i = 0; i < allArr.length; i++) {
            if (obj.id === allArr[i].id) {
                obj.id = Math.random();
                i = 0;
            }
            if (allArr[i].name === productName) {
                alert('input is already taken');
                return;
            }
        }
        if (productType === 'Toys') {
            toyArr.push(obj);
        }
        if (productType === 'Flowers') {
            flowerArr.push(obj);
        }
        if (productType === 'Books') {
            bookArr.push(obj);
        }

        allArr.push(obj);
        document.getElementById("product-name").value = "";
        document.getElementById("product-price").value = "";
        document.getElementById("selection").value = "Product type";
    }
}


function deleteIt(currentId) {
    for (let element of allArr) {
        if (currentId === element.id) {
            allArr.splice(element, 1);
        }
    }
    for (let element of toyArr) {
        if (currentId === element.id) {
            toyArr.splice(element, 1);
            deleteCurrent(element.id);
        }
    }
    for (let element of flowerArr) {
        if (currentId === element.id) {
            flowerArr.splice(element, 1);
            deleteCurrent(element.id);
        }
    }
    for (let element of bookArr) {
        if (currentId === element.id) {
            bookArr.splice(element, 1);
            deleteCurrent(element.id);
        }
    }
    document.getElementById("buyer-section").innerHTML = '';
    document.getElementById('dem-place').innerHTML = '';
    showIt();
    filter();
}


function showIt() {
    let emptyStr = "";
    let containerDiv = document.getElementById("dem-place");
    let buyerContainer = document.getElementById("buyer-section");
    let buyerHtml = "";
    for (let element of allArr) {
        emptyStr += '<div class="output">' +
            '<span class="outputs-title">' + element.name + '</span>' +
            '<span class="outputs-type">' +
            element.type +
            '</span>' +
            '<img onclick="deleteIt(' + element.id +
            ')" src="images/close.png" class="image-class">' +
            '</div>'
        containerDiv.innerHTML = emptyStr;
    }
    filter();
}

function checkoutPlace(elID) {
    for (let element of allArr) {
        if (elID === element.id) {
            for (let elementExist of toShop) {
                if (element.id === elementExist.id) {
                    return;
                }
            }
            element[`takenCount`] = 1;
            element[`totalIteamPrice`] = element.price;
            toShop.push(element);
            shopListAdder();
        }
    }
}

function filter(listName) {

    document.getElementById('buyer-section').innerHTML = ``;
    let buyerItem = ``;

    for (let element of (listName === "Toys") ? (toyArr) :
            (listName === "Books") ? (bookArr) :
            (listName === "Flowers") ? (flowerArr) : (allArr)) {
        buyerItem += `<div class="items page2">
           <img src="images/Image.png" alt="photo" class="page2">
           <div id="product-name" class="page2"><strong>${element.name}</strong></div>
           <div id="product-price" class="page2">$ ${element.price}</div>
           <div id="product-type" class="page2"><em>${element.type}</em></div>
           <button id="buy-this" class="page2" onclick="checkoutPlace(${element.id})">Buy </button>
       </div>`
        document.getElementById("buyer-section").innerHTML = buyerItem;
    }
}

function shopingCartItemBuilder() {
    let shopingCartItems = '';

    for (let element of toShop) {

        shopingCartItems += `
    <div class="purchased-products page2" id="container-of-shop-checkout">
    <h4 class="item-name page2">
        ${element.name}
    </h4>
    <h5 class="item-price page2">
        ${element.price}
    </h5>
    <h5 class="item-count page2">
        Count: 
        <span>
            ${element.takenCount}
        </span>
    </h5>
    <h5 class="items-total-price page2">
        Price: $ 
        <span>
            ${element.totalIteamPrice}
        </span>
    </h5>
    <button class="delete-button page2" onclick="deleteCurrent(${element.id})">X</button>
    <button class="sub-button page2" onclick="addCurrent(${element.id}, 'minus')">-</button>
    <button class="add-button page2" onclick="addCurrent(${element.id}, 'plus')">+</button>
    </div>
`
        document.getElementById('container').innerHTML = shopingCartItems;
    }
}

function addCurrent(itemId, symb) {
    for (let element of toShop) {
        if (element.id === itemId) {
            if (symb === "plus") {
                element.takenCount++;
            }
            if (symb === "minus" && element.takenCount > 1) {
                element.takenCount--;
            }
        }
    }
    document.getElementById("container-of-shop-checkout").innerHTML = "";
    shopListAdder();

}

function deleteCurrent(thatid) {
    for (let element of toShop) {
        if (element.id === thatid) {
            toShop.splice(element, 1);
        }
    }
    document.getElementById("container").innerHTML = "";
    shopListAdder();
}

function shopListAdder() {
    let checkoutPlaceDiv = document.getElementById("right-column");

    if (toShop.length > 0) {
        let totalPrice = 0;
        let productCounter = 0;
        let totalPriceCheckout = 0;
        for (let element of toShop) {
            totalPrice += (element.price * element.takenCount);
            productCounter += +element.takenCount;
            totalPriceCheckout += totalPrice;
        }
        let checkoutPlaceHtml = "";

        checkoutPlaceHtml += `<div id="right" class="page2">
                <h1 class="shopping-cart-title page2">
                Shopping Cart
            </h1>
                <div id="container">

                </div>
                <h2 class="page2 total-price">Total price: $<span>${totalPriceCheckout}</span></h2>                   
                <button class="page2 checkout-button" onclick="checkoutAlert(${productCounter}, ${totalPriceCheckout})">Checkout</button>

                </div>
            `
        checkoutPlaceDiv.innerHTML = checkoutPlaceHtml;
        shopingCartItemBuilder();
    } else {
        checkoutPlaceDiv.innerHTML = "";
    }
}

function checkoutAlert(productCounter, totalPriceCheckout) {
    alert(`You have ${productCounter} items to buy for total ${totalPriceCheckout} price`)
}
