let itemsContainer = document.getElementById("productContainer")
let cartContainer = document.getElementById("cartContainer")
let mainContainer = document.getElementById("mainContainer")

let data
let cartList = []
let totalItems=0

const emptyCart = () => {
    cartContainer.innerHTML = ""; 
    let cartHeading  = document.createElement("h3")
    cartHeading.textContent="Your Cart (0)"
    cartHeading.classList.add("cart-heading")
    cartContainer.appendChild(cartHeading)

    let emptyCartContainer = document.createElement("div")
    emptyCartContainer.classList.add("empty-cart-container")
    cartContainer.appendChild(emptyCartContainer)

    let emptyImage = document.createElement("img")
    emptyImage.src="./assets/images/illustration-empty-cart.svg"
    emptyImage.classList.add("empty-cart-image")
    emptyCartContainer.appendChild(emptyImage)

    let text = document.createElement("p")
    text.textContent="Your Added items will appear here."
    text.classList.add("empty-cart-text")
    emptyCartContainer.appendChild(text)
    
}
function fetchData() {
    emptyCart()
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

//Removing Item from cart
const removeItemFromCart = (item) => {
    let updatedList = [];
    for (let product of cartList) {
        if (product.id !== item.id) { // Only add products that do not match the item to be removed
            updatedList.push(product); // Use push instead of add
        }
    }
    cartList = updatedList; // Update cartList with the new list
    UpdateCart(); // Call UpdateCart to reflect changes in the UI

};


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
    itemName.classList.add("name")
    cartContent.appendChild(itemName)
   
    let itemQuantityPrice=document.createElement("div")
    itemQuantityPrice.classList.add("quantity-price-container")
    cartContent.appendChild(itemQuantityPrice)

    let quantity = document.createElement("p")
    quantity.textContent = String(item.quantity) + "x"
    quantity.classList.add("price")
    itemQuantityPrice.appendChild(quantity)

    let itemPrice = document.createElement("p")
    itemPrice.textContent = "@ "+"$"+String(item.price)
    itemPrice.classList.add("item-price-cart")
    itemQuantityPrice.appendChild(itemPrice)

    let totalPrice = document.createElement("p")
    totalPrice.textContent = "$"+ String(item.quantity*item.price)
    totalPrice.classList.add("total-price-cart")
    itemQuantityPrice.appendChild(totalPrice)




    let removeItem = document.createElement("img")
    removeItem.src="./assets/images/icon-remove-item.svg"
    removeItem.classList.add("remove-icon")
    cartItem.appendChild(removeItem)
    removeItem.addEventListener("click",()=>{
        removeItemFromCart(item)
    })


}
const OrderedItem = (item, orderedItemId) =>{
    console.log(item)
    let OrderedItemContainer = document.getElementById(orderedItemId)
    let orderBlockItem = document.createElement("div")
    orderBlockItem.classList.add("order-block-item")

    OrderedItemContainer.appendChild(orderBlockItem)

    let image = document.createElement("img")
    image.src=item.image.thumbnail
    image.classList.add("ordered-image")
    orderBlockItem.appendChild(image)

    let itemDetailsContainer = document.createElement("div")
    itemDetailsContainer.classList.add("order-item-details-container")
    orderBlockItem.appendChild(itemDetailsContainer)

    let name = document.createElement("p")
    name.textContent=item.name 
    name.classList.add("name")
    itemDetailsContainer.appendChild(name)

    let orderPriceContainer = document.createElement("div")
    orderPriceContainer.classList.add("order-Price-Container")
    itemDetailsContainer.appendChild(orderPriceContainer)

    let quantity = document.createElement("p")
    quantity.textContent=item.quantity+"x"
    quantity.classList.add("price")
    orderPriceContainer.appendChild(quantity)

    let price = document.createElement("p")
    price.textContent="@ $"+item.price 
    price.classList.add("ordered-price")
    orderPriceContainer.appendChild(price)

    let totalCost = document.createElement("p")
    totalCost.textContent = "$"+item.quantity*item.price 
    totalCost.classList.add("ordered-total-cost")
    orderBlockItem.appendChild(totalCost)

}
const UpdateCart = () => {
    if(cartList.length==0){
        emptyCart()
    }
    else{
        cartContainer.innerHTML = ""; 
        totalItems=0
        let cartHeading  = document.createElement("h3")
        
        cartHeading.classList.add("cart-heading")
        cartContainer.appendChild(cartHeading)
        let totalOrderCost=0
        for(item of cartList){
            createCartItem(item)
            totalOrderCost+=item.quantity*item.price
            totalItems+=item.quantity
            cartHeading.textContent="Your Cart ("+`${totalItems}`+")"
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

        orderConfirmButton.addEventListener("click", () => {
            let orderSuccess = document.createElement("div");
            orderSuccess.classList.add("order-success-main-container");
            mainContainer.appendChild(orderSuccess);
            
            let orderPopup = document.createElement("div")
            orderPopup.classList.add("order-success-container")
            orderSuccess.appendChild(orderPopup)

            let ordersuccessheader = document.createElement("div");
            ordersuccessheader.classList.add("order-success-header");
            orderPopup.appendChild(ordersuccessheader); // Append header to orderSuccess
        
            let orderHead = document.createElement("h6");
            orderHead.classList.add("order-success-heading");
            orderHead.textContent = "Order Confirmed"; // Set the text content for heading
            ordersuccessheader.appendChild(orderHead);
        
            

            let orderTick = document.createElement("img")
            orderTick.src="./assets/images/icon-order-confirmed.svg"
            orderTick.classList.add("order-tick")
            orderPopup.appendChild(orderTick)

            let orderedItems = document.createElement("div")
            orderedItems.id="orderedItem"
            orderedItems.classList.add("ordered-items-container")
            orderPopup.appendChild(orderedItems)
            for(item of cartList){
                OrderedItem(item,orderedItems.id)
                totalOrderCost+=item.quantity*item.price
            }

            let orderContainer = document.createElement("div")
            orderContainer.classList.add("order-container")
            orderedItems.appendChild(orderContainer)

            let orderText = document.createElement("h5")
            orderText.textContent = "Order Total: "
            orderContainer.appendChild(orderText)

            let totalCost = document.createElement("h5")
            totalCost.textContent = "$ "+String(totalOrderCost)
            orderContainer.appendChild(totalCost)

            let startNewOrder = document.createElement("button")
            startNewOrder.textContent="Start New Order"
            startNewOrder.classList.add("start-new-order")
            orderedItems.appendChild(startNewOrder)

            startNewOrder.addEventListener("click",()=>{
                mainContainer.removeChild(orderSuccess);
            })


        });
    }
        
        





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

    let initialaddcart = document.createElement("div");
    initialaddcart.id = "initial"+String(item.id);
    initialaddcart.classList.add("initial-add-to-cart")
    quantityBlock.appendChild(initialaddcart)
    
    let addtocart=document.createElement("div")
    addtocart.id="increment"+String(item.id)
    addtocart.classList.add("increment-add-to-cart")
    initialaddcart.appendChild(addtocart)
    //adding event listener to cart button
    addtocart.addEventListener('click', () => {
        AddToCart(item,imageBlock.id,quantityBlock.id,addtocart.id)
        UpdateCart()
    })

    let cartIcon = document.createElement("i")
    cartIcon.classList.add("fa-solid","fa-cart-shopping")
    addtocart.appendChild(cartIcon)

    let addCartText = document.createElement("p")
    addCartText.textContent="Add to Cart"
    addCartText.classList.add("add-to-cart-text")
    addtocart.appendChild(addCartText)

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
console.log(data)


