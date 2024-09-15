const chat = document.getElementById("chat")

async function main (){
const posts =await  requester("POST","infoBoard/selectBoardInfo")

console.log(posts)
posts.board.forEach(element => {
    chat.insertAdjacentHTML("beforeend",`

        <div id="id${element.codeId}" class="message">
            <p contenteditable="true" class="FirstName">${element.firstName}</p>
            <p contenteditable="true" class="body">${element.information}</p>
            ${JSON.parse(element.img).map(val=>{return `<img src="http://localhost:3001/uploads/${val}" alt="Картинка с поста">`})}
        </div>
        `
            )
        }
    )
}

main()