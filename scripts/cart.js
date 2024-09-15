// localStorage.products = '[]'
const productsList = document.querySelector(".cards")
const productsCountInBasket = document.getElementById("cart_num")
sendPills = ()=>{

  requester("POST","pills/buyPills",{
    pillsName:JSON.stringify(JSON.parse(localStorage.cart).products.map(val=>{return {name:val.name, price:val.priceDiscount}})),
    price:Number((document.getElementById('popup_cost_discount').innerText).split("₽").join("")),
    userToken:localStorage.refresh
  }).then(res=>{
    if(res.statusCode ===203){
      alert("Пожалуйста, зарегистрируйтесь на сайте")
      window.location.href = "registration.html"
      return
    }
    console.log(res)
    alert("Пожалуйста, запомните код для получения посылки. Ваш код:" + res.message)
    localStorage.cart = JSON.stringify({products:[]})
    location.reload()
    
  })


  /*
    object.userEmail,
                random_code,
                object.pillsName,
                object.pillsCategory,
                object.price
  
  */
}

function removeProductButton(e){
  console.log(e.target.parentElement.parentElement.querySelector(".popup__product-title").innerHTML)
  requester("POST","createpills/changeCount",{name:e.target.parentElement.parentElement.querySelector(".popup__product-title").innerHTML,addCount:-1})
  document.querySelectorAll(".popup__product-delete").forEach(val=>{
    val.addEventListener("click",(e)=>{
      removeProductButton(e)
    })

    })
}

document.getElementById("cart").addEventListener("click",()=>{
  setTimeout(()=>{
   document.querySelectorAll(".popup__product-delete").forEach(val=>{
    console.log('EEEEE')
    val.addEventListener("click",(e)=>{
      removeProductButton(e)
    })
  },20)
})
})

function removeProduct(nameToRemove) {
  let array = JSON.parse(localStorage.cart).products
  const indexToDelete = array.findIndex(obj => obj.name === nameToRemove);
  
  if (indexToDelete !== -1) {
    array.splice(indexToDelete, 1);
  } else {
    console.log(`Объект с именем "${nameToRemove}" не найден в массиве.`);
  }
  productsCountInBasket.innerHTML = array.length
  localStorage.cart = JSON.stringify({products:[...array]})
}

 



// document.getElementById("cart").addEventListener("click",()=>{
//   document.querySelector(".popup").classList.add("popup--open")
// })

// document.getElementById("popup_close").addEventListener("click",()=>{
//   document.querySelector(".popup").classList.remove("popup--open")
// })

const productHTML = (product)=>{
  let res = `<div class="card">
  <div class="card__top">
    <a href="#" class="card__image">
      <img
        alt="${product.name}"
        src="${product.img}"
      />
    </a>`

    if(product.discount)
      res+=`<div class="card__label">-${100-(product.discount/product.price)*100}%</div>`
      res+=` </div>
                <div class="card__bottom">
                    <div class="card__prices">`+(product.discount?`
                      <div class="card__price card__price--discount">${product.discount}</div>
                      <div class="card__price card__price--common">${product.price}</div>
                    </div>`:
                    `
                    <div class="card__price card__price--discount card__price--discount-invise" style="display:'none'">${product.price}</div>
                      <div class="card__price card__price--common">${product.price}</div>
                    </div>`)+`
                    <a href="#" class="card__title">
                      ${product.name}
                    </a>
                      <p class="desccription">${product.description}</p>
                    <button onclick="changeCount('${product.name}')" class="card__add">В корзину</button>
                  </div>
                </div>`
  return res;
}

document.querySelectorAll(".categorie").forEach(element=>{
    
    element.addEventListener("click",(e)=>{
        console.log(e);

       
        e.target.classList.toggle("picked")
        //categories.push(e.target.innerHTML)
        getProducts()
    })
    
})

function getProducts(){

    productsList.innerHTML =""

    const pickedElements = document.querySelectorAll('.picked');
    const categories = Array.from(pickedElements).map(element => element.innerHTML);
    
        let productsArray = Products.filter(val=>{return categories.includes(val.categorie)})
       

           
        productsArray.forEach(val=>{
              console.log(val)
              productsList.insertAdjacentHTML("beforeend",
                  productHTML(val))
          })
        
        
          MyMain()
          

}


async function changeCount(name){
        const productCount = (await requester("POST","createpills/changeCount",{name,addCount:1})).quantity
        console.log(productCount)
        if(productCount < 0){
          alert("На складе закончился данный товар, пожалуйста, попробуйте позже")
          removeProduct(name)
          requester("POST","createpills/changeCount",{name,addCount:-1})
        }

}
// function productToBasket(productName, productPrice){
//     localStorage.products = JSON.stringify([...JSON.parse(localStorage.products),JSON.stringify({productName, productPrice})])

//     productsCountInBasket.innerHTML = JSON.parse(localStorage.products).length;
// }
document.querySelector("p").click()