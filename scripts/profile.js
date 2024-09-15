// document.querySelector(".btn-confim").addEventListener("click",(e)=>{
//     console.log(e.target.classList)
//     e.target.innerHTML = "Запись подтверждена"
//     e.target.classList.add("disactivate")
//     e.target.classList.remove("btn-confim")
// })
async function confim(service){
    try{
        await requester("POST","scheduled/ConfirmationTrue",{refreshToken:localStorage.refresh,userToken:localStorage.access, servicesName:service, Confirmation:'True'})
        btnGetScheduled.click()
    }finally{
        getScheduled()
    }
   

}
async function confimFalse(service){
    try{
        await requester("POST","scheduled/ConfirmationFalse",{refreshToken:localStorage.refresh,userToken:localStorage.access, servicesName:service, Confirmation:'False'})
      
    }finally{
        getScheduled()
    }

    
}
function formatDate(dateString) {
    const date = new Date(dateString);
    let day = '' + date.getDate(); // День месяца
    let month = '' + (date.getMonth() + 1); // Месяцы начинаются с 0
    let year = date.getFullYear(); // Год

    if (day.length < 2) 
        day = '0' + day;
    if (month.length < 2) 
        month = '0' + month;

    return [day, month, year].join('.'); // Измененный порядок: день, месяц, год
}
const btnGetScheduled = document.getElementById('getScheduled')
const scheduledTable = document.getElementById('table')
let i = 0//Мне лень переписывать printScheduled, так-что это будет счтчиком для него
function printScheduled(scheduled){
    console.log(scheduled)
    console.log((new Date(scheduled.time) - new Date)/(1000*60*60))
    if(scheduled.status ==='True' || (new Date(scheduled.time) - new Date)/(1000*60*60)<6 ){
        scheduledTable.insertAdjacentHTML("beforeend",`<tr>
                <td colspan="3">
                    <p>${scheduled.servicesName} </p>
                </td>
                <td colspan="2">
                    <strong>${formatDate(scheduled.time)  }</strong>
                </td>
                <td class='tdButton'>
                    <button  class="btn-confim ${(scheduled.status==="True")?"btn-past-confim":"btn-no-confim"}"></button>
                </td>
                <td class='tdButton'>
                   
                </td>
            </tr>`)
        return
    }

    scheduledTable.insertAdjacentHTML("beforeend",`<tr>
                                <td colspan="3">
                                    <p>${scheduled.servicesName} </p>
                                </td>
                                <td colspan="2">
                                    <strong>${formatDate(scheduled.time)  }</strong>
                                </td>
                                <td class='tdButton'>
                                    <button onclick="${(new Date(scheduled.time) - new Date)/(1000*60*60)>24?'':'confim('+("'"+scheduled.servicesName+"',"+i+"")+')'}" class="btn-confim ${(new Date(scheduled.time) - new Date)/(1000*60*60)>24?"btn-future-confim":"btn-active-confim"}"></button>
                                </td>
                                <td class='tdButton'>
                                    <button onclick="${'confimFalse('+("'"+scheduled.servicesName+"',"+i+"")+')'}" class="btn-confim btn-false-confim"></button>
                                </td>
                            </tr>`)
    i++
}
async function getScheduled() {
    scheduledTable.innerHTML = ""
    const scheduleds = await requester("POST", "scheduled/postScheduledInfo", {refreshToken:localStorage.refresh,userToken:localStorage.access})
    console.log(scheduleds)
    // if(scheduleds?.isE){
    //     if(scheduleds.e==="Access denied"){
    //         alert("Пожалуйста, авторизуйтесь")
    //         window.location.href = "registration.html"
    //     }else{
    //         alert("Произошла напредвиденная ошибка "+ scheduleds.e)
    //     }
    // }
    if(scheduleds.allInfo.length === 0){
        scheduledTable.innerHTML = "Записей, ожидающих подтверждения нет. Хотите <a href='index.html#book'>записаться?</a>"
    }
    scheduleds.allInfo.forEach((element) => {
        printScheduled(element)
    });
}
getScheduled()