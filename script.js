//search box toggle
let formsearch = document.querySelector('.searchform');
document.querySelector('#search-btn').onclick = () =>
{
    formsearch.classList.toggle('active');
    menu.classList.remove('active');
    shoppingcart.classList.remove('active');

}

//cart toggle
let shoppingcart = document.querySelector('.cart');
document.querySelector('#cart-btn').onclick = () =>
{
    shoppingcart.classList.toggle('active');
    
    formsearch.classList.remove('active');
    menu.classList.remove('active');
}


//menu toggle
//for the mobile view we have to toggle the menu bar
  
let menu = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () =>
{
    menu.classList.toggle('active');
    formsearch.classList.remove('active');
    shoppingcart.classList.remove('active');
    

}
//for opening one at a time
window.onscroll = () =>
{
    formsearch.classList.remove('active');
    shoppingcart.classList.remove('active');
    menu.classList.remove('active');
}
  

//for the cart
// Get all "Add to Cart" buttons
let carts=document.querySelectorAll('.add-to-cart');
let products = [
  {
    name:'Broccoli',
    tag:'broccoli',
    price: 250,
    incart: 0,
  }, 
  {
    name:'Carrot',
    tag:'carrots',
    price: 32,
    incart: 0,
  }, 
  {
    name:'Onion',
    tag:'onion',
    price: 27,
    incart: 0,
  }, 
  {
    name:'Potato',
    tag:'potatoes',
    price: 57,
    incart: 0,
  }, 
  {
    name:'Brinjal',
    tag:'Brinjal2',
    price: 60,
    incart: 0,
  }, 
  {
    name:'Cauliflower',
    tag:'cauliflower',
    price: 64,
    incart: 0,
  }, 
  {
    name:'Tomato',
    tag:'tomato',
    price: 30,
    incart: 0,
  }, 
  {
    name:'Pumpkin',
    tag:'green-pumpkin',
    price: 100,
    incart: 0,
  }, 
  //for tools
  {
    name:'Dung Powder',
    tag:'tool1',
    price: 45,
    incart: 0,
  }, 
  {
    name:'Vermi Compost',
    tag:'tool2',
    price: 1000,
    incart: 0,
  }, 
  {
    name:'Cotton Seed Meal',
    tag:'tool3',
    price: 500,
    incart: 0,
  }, 
  {
    name:'Rock Phosphate',
    tag:'tool4',
    price: 200,
    incart: 0,
  }, 
  {
    name:'Gardening tool Kit',
    tag:'tool5',
    price: 449,
    incart: 0,
  }, 
  {
    name:'Wooden Compost',
    tag:'tool6',
    price: 3000,
    incart: 0,
  }, 
  {
    name:'Shovel tools',
    tag:'tool7',
    price: 550,
    incart: 0,
  }, {
    name:'One Agri Kit',
    tag:'agriculture-kit',
    price: 1500,
    incart: 0,
  }, 
  {
    name:'Compost Bin',
    tag:'compostbin2',
    price: 800,
    incart: 0,
  }, 
];

for( let i=0; i < carts.length ; i++){
  carts[i].addEventListener('click',() => {
    cartNumbers(products[i]);
    totalcoast(products[i])


  })

}
function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers){
    document.querySelector('.fa-shopping-cart span').textContent = productNumbers;
  } 

  

}
function cartNumbers(product){
  console.log("The product clicked is", product);
  let productNumbers=localStorage.getItem('cartNumbers');
 
 productNumbers = parseInt(productNumbers);

  if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1); 
    document.querySelector('.fa-shopping-cart span').textContent = productNumbers + 1;
  } else{
    localStorage.setItem('cartNumbers', 1); 
    document.querySelector('.fa-shopping-cart span').textContent = 1;
  }
  setItems(product);

}
function setItems(product){
 let cartItems = localStorage.getItem('productsInCart');
 cartItems = JSON.parse(cartItems);
 

 if(cartItems != null){

  if(cartItems[product.tag] == undefined){
    cartItems = {
      ...cartItems,
      [product.tag]:product
    }
  }
  cartItems[product.tag].incart += 1;
 } else{
  product.incart = 1;
  cartItems = {
   [product.tag]: product
  }
 
}

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}
function totalcoast(product){
  //console.log("the price is",product.price);
  let cartCost = localStorage.getItem('totalCost');

  if(cartCost != null){
    cartCost= parseInt(cartCost);
    localStorage.setItem("totalCost",cartCost + product.price);
  }else{
    localStorage.setItem("totalCost", product.price);
  }


}
function delElement(a){
  cart.splice(a, 1);
  displaycart();
}
function displayCart(){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems)
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost');
  if(cartItems && productContainer){
    productContainer.innerHTML = '' ;
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
       <div class="products">
        
         <img src = "images/${item.tag}.jpg" height="100px" width="100px">
         <span>${item.name}</span>
       </div> 
       <div class= "price">RS.${item.price}.00</div>
       <div class= "quantity">
       <i class="fa fa-arrow-circle-down" aria-hidden="true"></i>
       <span>${item.incart}</span>
       <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>
       </div>
       <div class="total">
       Rs.${item.incart * item.price}.00
       </div>
      

      `;
    } );
    productContainer.innerHTML += `
     <div class="basketTotalContainer">
      <h4 class= "basketTotalTitle">
       Basket Total  Rs.${cartCost}.00
      </h4>
        
    `;
  };

}
onLoadCartNumbers();
displayCart();