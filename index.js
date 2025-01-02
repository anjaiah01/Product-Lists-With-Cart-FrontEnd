let itemsContainer = document.getElementById("productContainer")
let cartContainer = document.getElementById("cartContainer")
let data
let cartList = []
function fetchData() {
    fetch('./data.json')
        .then(response => response.json())
        .then(jsonData => {
            data=jsonData
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

fetchData();



//Create CartItem 
const createCartItem = item =>{
    let cartItem = document.createElement("div")
    cartItem.classList.add("cart-item-container")
    cartContainer.appendChild(cartItem)

    let cartContent=document.createElement("div")
    cartContent.classList.add("cart-content")
    cartItem.appendChild(cartContent)

    let itemName= document.createElement("p")
    itemName.textContent=item.name
    cartContent.appendChild(itemName)

    let itemQuantityPrice=document.createElement("div")
    itemQuantityPrice.classList.add("quantity-price-container")
    cartContent.appendChild(itemQuantityPrice)

    let quantity = document.createElement("p")
    quantity.textContent = String(item.quantity) + "x"
    itemQuantityPrice.appendChild(quantity)

    let itemPrice = document.createElement("p")
    itemPrice.textContent = "@ "+"$"+String(item.price)
    itemQuantityPrice.appendChild(itemPrice)

    let totalPrice = document.createElement("p")
    totalPrice.textContent = "$"+ String(item.quantity*item.price)
    itemQuantityPrice.appendChild(totalPrice)




    let removeItem = document.createElement("img")
    removeItem.src="./assets/images/icon-remove-item.svg"
    removeItem.classList.add("remove-icon")
    cartItem.appendChild(removeItem)


}
const UpdateCart = () => {
    cartContainer.innerHTML = ""; 
    let cartHeading  = document.createElement("h3")
    cartHeading.textContent="Your Cart"
    cartHeading.classList.add("cart-heading")
    cartContainer.appendChild(cartHeading)
    let totalOrderCost=0
    for(item of cartList){
        createCartItem(item)
        totalOrderCost+=item.quantity*item.price
    }

    let orderContainer = document.createElement("div")
    orderContainer.classList.add("order-container")
    cartContainer.appendChild(orderContainer)

    let orderText = document.createElement("h5")
    orderText.textContent = "Order Total: "
    orderContainer.appendChild(orderText)

    let totalCost = document.createElement("h5")
    totalCost.textContent = "$ "+String(totalOrderCost)
    orderContainer.appendChild(totalCost)

    let neutralTextContainer = document.createElement("div")
    neutralTextContainer.classList.add("neutral-container")
    cartContainer.appendChild(neutralTextContainer)

    let neutralIcon = document.createElement("img")
    neutralIcon.src="./assets/images/icon-carbon-neutral.svg"
    neutralIcon.alt="neutral"
    neutralTextContainer.appendChild(neutralIcon)

    let carbonText = document.createElement("span"); 
    carbonText.textContent = "carbon-neutral";
    carbonText.classList.add("carbon-text"); 

    let neutralText = document.createElement("p");
    neutralText.textContent = "This is a ";
    neutralTextContainer.appendChild(neutralText);

    neutralText.appendChild(carbonText);

    neutralText.appendChild(document.createTextNode(" delivery"));

    let orderConfirmButton = document.createElement("button")
    orderConfirmButton.textContent = "Confirm Order"
    orderConfirmButton.classList.add("order-confirm-button")

    cartContainer.appendChild(orderConfirmButton)





}

//Add Product to Cart
const AddToCart = (item, imageId, quantityBlockId, incrementId) => {
    let isThere = cartList.find(product => product.id === item.id);
    let noOfItems = 1;

    if (isThere !== undefined) {
        console.log("isThere is not undefined!");
        let updatedList = cartList.map(product => {
            if (product.id === item.id) {
                let productItem = product;
                let q = productItem.quantity;
                productItem.quantity = q + 1;
                noOfItems = q + 1;
                return productItem;
            } else {
                return product;
            }
        });
        cartList = updatedList;
    } else {
        let quantity = 1;
        cartList.push({ ...item, quantity });
    }

    let imageBlock = document.getElementById(imageId);
    imageBlock.classList.add("product-border");

    let quantityBlock = document.getElementById(quantityBlockId);
    quantityBlock.classList.add("selected-item-quantity");

    let increment = document.getElementById(incrementId);
    increment.innerHTML = ""; // Clear any existing content in the increment div

    let incrementIcon = document.createElement("img");
    incrementIcon.src = "./assets/images/icon-increment-quantity.svg";
    increment.appendChild(incrementIcon);

    let quantityText = document.createElement("p");
    quantityText.textContent = noOfItems;

    // Append the quantityText to the quantityBlock first
    quantityBlock.appendChild(quantityText);

    // Add the increment and decrement buttons
    quantityBlock.insertBefore(increment, quantityText);

    let decrement = document.createElement("img");
    decrement.src = "./assets/images/icon-decrement-quantity.svg";
    decrement.alt = "decrement";
    quantityBlock.insertBefore(decrement, quantityText);
};



//create Product Item Block
const createProduct=(item)=>{
    let itemBlock=document.createElement("li")
    itemBlock.id=item.id
    itemBlock.classList.add("product-item")
    itemsContainer.appendChild(itemBlock)

    let imgQuan=document.createElement("div")
    itemBlock.appendChild(imgQuan)

    let imageBlock=document.createElement("div")
    imageBlock.id="image"+String(item.id)
    imageBlock.classList.add("product-image")
    imageBlock.style.backgroundImage=`url(${item.image.desktop})`
    imgQuan.appendChild(imageBlock)

    let quantityBlock = document.createElement("div")
    quantityBlock.id="cart"+String(item.id)
    quantityBlock.classList.add("quantity-container")
    imageBlock.appendChild(quantityBlock)
    
    let increment = document.createElement("div")
    increment.id="increment"+String(item.id)
    increment.classList.add("increment-add-to-cart")
    quantityBlock.appendChild(increment)
    //adding event listener to cart button
    increment.addEventListener('click', () => {
        AddToCart(item,imageBlock.id,quantityBlock.id,increment.id)
        UpdateCart()
    })

    let cartIcon = document.createElement("img")
    cartIcon.src="./assets/images/icon-add-to-cart.svg"
    increment.appendChild(cartIcon)

    let addCartText = document.createElement("p")
    addCartText.textContent="Add to Cart"
    increment.appendChild(addCartText)

    //item Details
    let itemDetails = document.createElement("div")
    itemDetails.classList.add("product-details")
    itemBlock.appendChild(itemDetails)

    let category = document.createElement("p")
    category.textContent = item.category
    category.classList.add("category")
    itemDetails.appendChild(category)

    let name=document.createElement("p")
    name.textContent=item.name
    name.classList.add("name")
    itemDetails.appendChild(name)

    let priceContainer = document.createElement("div")
    priceContainer.classList.add("price-container")
    itemDetails.appendChild(priceContainer)

    let dollar = document.createElement("span")
    dollar.textContent="$"
    dollar.classList.add("price")
    priceContainer.appendChild(dollar)

    let price =document.createElement("p")
    price.textContent=item.price
    price.classList.add("price")
    priceContainer.appendChild(price)
}
setTimeout(()=>{
    for(item of data){
        createProduct(item)
    }
},1000)



