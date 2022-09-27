// import data from './data.js';

// const itemsContainer = document.querySelector("#items");

// for (let i = 0; 1 < data.length; i++) {
//     // Create a new div element and give it a class name
//     const newDiv = document.createElement('div');
//     newDiv.className = 'item';
//     // Create an image element
//     const img = document.createElement('img');
//     // This will change each time we go through the loop.  Can you explain why?
//     img.src = data[i].image;
//     img.width = 300;
//     img.height = 300;
//     // Add the image to the div
//     newDiv.appendChild(img);
//     // console.log(img); // Check the console!
//     itemsContainer.appendChild(newDiv);
//     const desc = document.createElement('p');
//     desc.innerText = data[i].desc;
//     newDiv.appendChild(desc);
//     const price = document.createElement('p');
//     price.innerText = data[i].price;
//     newDiv.appendChild(price);
//     const button = document.createElement('button');
//     button.id = data[i].name;
//     button.dataset.price = data[i].price;
//     button.innerHTML = "Add to Cart";
//     newDiv.appendChild(button);
// }

const cart = [];

function addItem(name, price) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].qty++
            return
        }
    }
    const item = {name, price, qty: 1}
    cart.push(item);
}

function showItems() {
    for (let i = 0; i < cart.length; i++) {
        console.log(`- ${cart[i].name}, $${cart[i].price} x ${cart[i].qty}`)
    }
}

function getQty() {
    let totalItems = 0
    for (let i = 0; i < cart.length; i++) {
        totalItems += cart[i].qty
    }
    return totalItems;
}

function getTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty
    }
    total = total.toFixed(2)
    return total
}


addItem('apple', 0.99)
addItem('apple', 0.99)
addItem('orange', 1.29)
console.log(`You have ${getQty()} items in your cart`)
showItems()
console.log(`Your cart total is: $${getTotal()}`)
