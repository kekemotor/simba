
// getBottomServices("Хирургические").forEach(departament=>{
//     document.getElementById("bottomDepartment").insertAdjacentHTML("beforeend",`<option value="${departament.name}">${departament.name}</option>`)
// })
const params = new URLSearchParams(window.location.href)
params.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});
console.log(params.has('services'))
const list = document.getElementById("list")
const select = document.getElementById("select")
function printService(services){
    if(services.length===0){
        document.getElementById("list").insertAdjacentHTML("beforeend",`<p onclick="console.log('e')" ">К сожалению, услуги не найдены. Пожалуйста, проверьте ввод.</p>`)
        return
    }
    services.forEach(departament=>{
        document.getElementById("list").insertAdjacentHTML("beforeend",`<p onclick="console.log('e')" class="service" id="${departament.name}">${departament.name}</p>`)
        listen()
    })
}

function listen(){
    document.querySelectorAll(".service").forEach(service=>{
        service.addEventListener("click",(e)=>{
            select.value = e.target.innerHTML
        })
    })
}

select.addEventListener("focus",()=>{
    list.style.display = "block"
})
select.addEventListener("blur",()=>{
    setTimeout(()=>{list.style.display = "none"}, 150)
    
})

select.addEventListener("input",(e)=>{
    document.getElementById("list").innerHTML=""
    printService(getBottomServices("Хирургические").filter(val=>{console.log(val);return val.name.toLowerCase().includes(e.target.value.toLowerCase())}))
    listen()
})

list.style.display = "none"

printService(getBottomServices("Хирургические"))
window.onload = function() {
    var selectInput = document.getElementById('select');
    var listDiv = document.getElementById('list');

    var selectWidth = selectInput.offsetWidth;

    listDiv.style.width = selectWidth + 'px';
};

document.querySelector("form").addEventListener('submit', async function(event) {
    try{

    event.preventDefault(); // Предотвращаем перезагрузку страницы
    const data = {
        servicesName: document.getElementById("select").value,
        userEmail: document.getElementById("email").value,
        time: document.getElementById("date").value
    }
     await requester("POST","scheduled/ADDuser",data)
    }
    finally{
        alert("Вы успешно записаны на операцию. Менее, чем за 24 часа и более, чем за 6 часов до приёма необходимо подтвердить запись в личном кабинете.")
        document.getElementById("select").value = ""
        document.getElementById("email").value =""
        document.getElementById("date").value = ""
    }
    
});