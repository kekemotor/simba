document.querySelectorAll(".menu-title").forEach((a)=>{
    a.addEventListener("click",(e)=>{
        window.location.href = `index.html?services=${e.target.innerHTML.split(" ").join("_")}#book`
    })
})