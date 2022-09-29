import data from '/data.js';

const itemsContainer = document.querySelector("#items");
const itemList = document.getElementById('item-list');
const totalDiv = document.getElementById('total-price');
const quantityDiv = document.getElementById('quantity-items')


for (let i = 0; i < data.length; i++) {
    // Create a new div element and give it a class name
    const newDiv = document.createElement('div')
    newDiv.className = 'item'
    // Create an image element
    const img = document.createElement('img')
    // This will change each time we go through the loop.  Can you explain why?
    img.src = data[i].image
    img.width = 300
    img.height = 300
    // Add the image to the div
    newDiv.appendChild(img)
    // console.log(img); // Check the console!
    itemsContainer.appendChild(newDiv);
    const desc = document.createElement('p');
    desc.innerText = data[i].desc;
    newDiv.appendChild(desc);
    const price = document.createElement('p');
    price.innerText = data[i].price;
    newDiv.appendChild(price);
    const button = document.createElement('button');
    button.id = data[i].name;
    button.dataset.price = data[i].price;
    button.innerHTML = "Add to Cart";
    newDiv.appendChild(button);
}

const cart = [];

const all_items_button = Array.from(document.querySelectorAll("button"))

all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
}))
showItems()
itemList.onchange = function(e) {
    if (e.target && e.target.classList.contains('update')) {
        const name = e.target.dataset.name;
        const qty = parseInt(e.target.value);
        updateCart(name, qty);
    }
}

itemList.onclick = function(e) {
    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name
        // console.log(e.target)
        removeItem(name)
    } else if (e.target && e.target.classList.contains('add-one')) {
        const name = e.target.dataset.name
        addItem(name)
    } else if (e.target && e.target.classList.contains('subtract-one')) {
        const name = e.target.dataset.name
        removeItem(name, 1)
    }
}

function addItem(name, price) {
	for (let i = 0; i < cart.length; i++) {
		if (cart[i].name === name) {
			cart[i].qty += 1
			showItems()
			return
		}
	}
	
	const item = {name, price, qty: 1}
	cart.push(item)
}

function removeItem(name, qty = 0) {
	for (let i = 0; i < cart.length; i++) {
		if (cart[i].name === name) {
			if (qty > 0) {
				cart[i].qty -= qty
			}
			if (cart[i].qty < 1 || qty === 0) {
				cart.splice(i, 1)
			}
			showItems()
			return
		}
	}
}

function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            if (qty < 1) {
                removeItem(name);
                return
            }
            cart[i].qty = qty;
            showItems()
            return
        }
    }
}

function showItems() {
    let itemStr = ''
    for (let i = 0; i < cart.length; i++) {
        const { name, price, qty } = cart[i]
        itemStr +=(`<li class="cart-list">
        ${name}, $${price} x ${qty} = $${(price * qty).toFixed(2)} 
        <button class="remove" data-name="${name}">Remove</button>
        <button class="add-one" data-name="${name}"> + </button>
        <button class="subtract-one" data-name="${name}"> - </button>
        <input class="update" type="number" min="0" data-name="${name}">
        </li>`)
    }
    itemList.innerHTML = itemStr
    quantityDiv.innerHTML = `You have ${getQty()} items in your cart`
    totalDiv.innerHTML = `Your cart total is: $${getTotal()}`
}

function getQty() {
    let qty = 0
    for (let i = 0; i < cart.length; i++) {
        qty += cart[i].qty
    }
    return qty;
}

function getTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty
        // console.log(total)
    }
    return total.toFixed(2)
}

