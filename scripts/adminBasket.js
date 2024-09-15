const categories = ["Корма","Антибиотики","Глистогонные препараты","От блох и клещей","Для лечения ушей, глаз, зубов", "Лактоскоп, шампуни", "Петкам, онсиор", "Вазосан, ветмибин"]
const table = document.getElementById("productCount")


let products =  []
categories.forEach(val=>{
    requester("POST","createpills/backInfoAway",{category:val}).then(res=>{
        console.log(products)
        products = [...products, ...res.items_category]
    })
})

function printObject(){
    table.innerHTML = ""
    products.forEach(val=>{
        console.log(products)
        table.insertAdjacentHTML('beforeend',`<tr>
            <td>${val.name}</td>
            <td>${val.quantity}</td>
            <td><button onclick="putCount('${val.name}')">Добавить количество</button></td>
            <td><input id="inp${val.name}" type="text" placeholder="На какое количество изменить"></td>
            </tr>
        `)
    })

    
}



function putCount(name){
    const quantity = document.getElementById("inp"+name).value
    requester("POST","createpills/changeCount",{name,addCount:-1*quantity})

    location.reload()

}

setTimeout(()=>{console.log(products);printObject()},200)