let mproducts = []
const Mtable = document.getElementById("userProduct")
requester("POST","fuctionForSurgery/giveBackInfoAboutOrder",{}).then(res=>{
    mproducts = res.backInfo
    res.backInfo.forEach(val => {
        Mtable.insertAdjacentHTML(`beforeend`,`<tr>
            <td>${val.userEmail}</td>
            <td>${val.pillsName}</td>
            <td>${val.prise}</td>
            <td>${val.randomNumber}</td>
            <td>${val.createDate}</td>  
        </tr>`)
    });
})

document.getElementById("findCode").addEventListener("input",(e)=>{
    let p = mproducts.filter(val=>String(val.randomNumber).includes(document.getElementById("findCode").value))
    console.log(p)
    Mtable.innerHTML = ""
    p.forEach(val=>{
        Mtable.insertAdjacentHTML(`beforeend`,`<tr>
            <td>${val.userEmail}</td>
            <td>${val.pillsName}</td>
            <td>${val.prise}</td>
            <td>${val.randomNumber}</td>
            <td>${val.createDate}</td>  
        </tr>`)
    })
})