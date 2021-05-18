/*
This is how an item object should look like
{
      id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
      name: "beetroot",
      price: 0.35 <- You can come up with your own prices
    }
*/

// Repo: boolean-uk-greengrocers

// Description
// In this exercise we explore a common scenario in eCommerce, adding and removing items from the cart, and calculating the total.


// Instructions
// - Use this template as a starting point => https://codesandbox.io/s/js-exercise-greengrocer-template-grqi6
// - Create a state object
// - Create action functions that update state
// - Create render functions that read from state

// Tips
// - Start with the logic first, use console.log(state) to check your logic is working; when the logic is working as expected move onto styling
// - Taking HTML semantics into consideration, use a button when an action is happening on the same page



// Deliverables
// - A user can view a selection of items in the store
// - From the store, a user can add an item to their cart
// - From the cart, a user can view and adjust the number of items in their cart
//     - If an item's quantity equals zero it is removed from the cart
// - A user can view the current total in their cart
let state = [
  {
  id: "001-beetroot", //<- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  image: {
    src: "assets/icons/001-beetroot.svg"
  },
  price: 0.10, //<- You can come up with your own prices
  toCart: false,
  quantityToCart: 0
},
{
  id: "002-carrot", //<- the item id matches the icon name in the assets/icons folder
  name: "carrot",
  image: {
    src: "assets/icons/002-carrot.svg"
  },
  price: 0.20, //<- You can come up with your own prices
  toCart: false,
  quantityToCart: 0
},
{
  id: "003-apple", //<- the item id matches the icon name in the assets/icons folder
  name: "apple",
  image: {
    src: "assets/icons/003-apple.svg"
  },
  price: 0.30, //<- You can come up with your own prices
  toCart: false,
  quantityToCart: 0
},
{
  id: "004-apricot", //<- the item id matches the icon name in the assets/icons folder
  name: "apricot",
  image: {
    src: "assets/icons/004-apricot.svg"
  },
  price: 0.40, //<- You can come up with your own prices
  toCart: false,
  quantityToCart: 0
},
{
  id: "005-avocado", //<- the item id matches the icon name in the assets/icons folder
  name: "avocado",
  image: {
    src: "assets/icons/005-avocado.svg"
  },
  price: 0.50, //<- You can come up with your own prices
  toCart: false,
  quantityToCart: 0
},
{
  id: "006-bananas", //<- the item id matches the icon name in the assets/icons folder
  name: "bananas",
  image: {
    src: "assets/icons/006-bananas.svg"
  },
  price: 0.60, //<- You can come up with your own prices
  toCart: false,
  quantityToCart: 0
},
{
  id: "007-bell-pepper", //<- the item id matches the icon name in the assets/icons folder
  name: "bell-pepper",
  image: {
    src: "assets/icons/007-bell-pepper.svg"
  },
  price: 0.70, //<- You can come up with your own prices
  toCart: false,
  quantityToCart: 0
},
{
  id: "008-berry", //<- the item id matches the icon name in the assets/icons folder
  name: "berry",
  image: {
    src: "assets/icons/008-berry.svg"
  },
  price: 0.80, //<- You can come up with your own prices
  toCart: false,
  quantityToCart: 0
},
{
  id: "009-blueberry", //<- the item id matches the icon name in the assets/icons folder
  name: "blueberry",
  image: {
    src: "assets/icons/009-blueberry.svg"
  },
  price: 0.90, //<- You can come up with your own prices
  toCart: false,
  quantityToCart: 0
},
{
  id: "010-eggplant", //<- the item id matches the icon name in the assets/icons folder
  name: "eggplant",
  image: {
    src: "assets/icons/010-eggplant.svg"
  },
  price: 1.00, //<- You can come up with your own prices
  toCart: false,
  quantityToCart: 0
}
]

let totalSpent = 0
let spanTotal = document.querySelector(`.total-number`)

function renderStoreItems(items) {
  let storeItemsUl = document.querySelector(`.store--item-list`) 
  for (const item of items) {
    //if I wanted to be lazy:
    // <ul class="item-list store--item-list"> //querySelector this El
    //    <img src='assets/icons/${item.image.src}.svg'  /> //this was useful if I kept the svg in the assets without importing them into the state
    //    storeItemsUl.innerHTML += `
    //   <li>
    //    <div class= "store--item-icon">
    //      <img src= ${item.image.src} /> 
    //     </div>
    //     <button>Add to cart</button>
    //    </li>
    // `
    let storeItemLi = document.createElement(`li`)

    let storeItemImgDiv = document.createElement(`div`)
    storeItemImgDiv.setAttribute(`class`, `store--item-icon`)
    
    let storeItemImg = document.createElement(`img`)
    storeItemImg.setAttribute(`src`, `${item.image.src}`)

    let addToCartBtn = document.createElement(`button`)
    addToCartBtn.innerText = "Add to cart"
    
    addToCartBtn.addEventListener(`click`, function() {

      item.toCart = true //item now IS IN the CART ------------------state-----------
      console.log(item)
      if (item.quantityToCart === 0){
        displayToCart(item)
        addQuantity(item)
      } else {
        addQuantity(item)
      }
      
    })

    storeItemImgDiv.append(storeItemImg)
    storeItemLi.append(storeItemImgDiv, addToCartBtn)
    storeItemsUl.append(storeItemLi)
  }
}

function addQuantity(item) {
  let cartQuantity = document.querySelector(`.quantity${item.name}`)
  cartQuantity.innerText = ++item.quantityToCart
  updateTotal(state)
}

function minusQuantityToCart(item) {
  let cartQuantity = document.querySelector(`.quantity${item.name}`)
  cartQuantity.innerText = --item.quantityToCart
  updateTotal(state)
}

function removeFromCart(item) {
  let itemFromCart = document.querySelector(`.cart${item.name}`)
  itemFromCart.remove()
  updateTotal(state)
}

function displayToCart(item) {
  let cartUl = document.querySelector(`.item-list.cart--item-list`)

  let cartLi = document.createElement(`li`)
  cartLi.setAttribute(`class`, `cart${item.name}`)

  let cartImg = document.createElement(`img`)
  cartImg.setAttribute(`class`, `cart--item-icon`)
  cartImg.setAttribute(`src`, `${item.image.src}`)
  cartImg.setAttribute(`alt`, `${item.name}`)

  let cartName = document.createElement(`p`)
  cartName.innerText = `${item.name}`

  let cartMinusBtn = document.createElement(`button`)
  cartMinusBtn.setAttribute(`class`, `quantity-btn`, `remove-btn center`)
  cartMinusBtn.innerText = "-"
  cartMinusBtn.addEventListener(`click`, function() {
    if (item.quantityToCart === 1) {
      minusQuantityToCart(item)
      removeFromCart(item)
    } else {
      minusQuantityToCart(item)
    }
  })

  let cartQuantity = document.createElement(`span`)
  cartQuantity.setAttribute(`class`, `quantity${item.name}`)
 
  // quantityToCart: 0 from the state
  
  let cartPlusBtn = document.createElement(`button`)
  cartPlusBtn.setAttribute(`class`, `quantity-btn`, `add-btn center`)
  cartPlusBtn.innerText = "+"

  cartPlusBtn.addEventListener(`click`, function() {
    addQuantity(item)
  })

  let deleteLiFromCart = document.createElement(`button`)
  deleteLiFromCart.setAttribute(`class`, `quantity-text center deleteItem delete${item.name}`)
  deleteLiFromCart.innerText = "X"
  deleteLiFromCart.addEventListener(`click`, function() {
    item.quantityToCart = 0
    console.log(`quantity to cart of ${item.name}:`, item.quantityToCart)
    removeFromCart(item)
  })
  
    
  cartUl.append(cartLi)
  cartLi.append(cartImg, cartName, cartMinusBtn, cartQuantity, cartPlusBtn, deleteLiFromCart)
}

function updateTotal(items) {
  for (const item of items) {
    if (item.quantityToCart > 0) {
      totalSpent += (item.quantityToCart * item.price).toFixed(2)
      
    }
    // let priceOfOneItem = item.quantityToCart * item.price
    // if (spanTotal.innerText === "£0.00") {
    //     totalSpent += priceOfOneItem
    //     spanTotal.innerText = totalSpent.toFixed(2)
    // }else {
      
    //   totalSpent += priceOfOneItem
    //   spanTotal.innerText = totalSpent.toFixed(2)

    // }
  }
  console.log(totalSpent)
  spanTotal.innerText = 0
  spanTotal.innerText = totalSpent
}

renderStoreItems(state)
//to render the list of available items, devo loop over the array