document.getElementById("sendAlert").addEventListener('click',()=>{
    requester("POST","functionWithDecodeForSurgery/messegeAllUsers",{})
    requester("POST","pills/DeleteSendUsers",{})
})
const chat = document.getElementById("newMessage")

async function main (){
const posts =await  requester("POST","infoBoard/selectBoardInfo")

posts.board.forEach(element => {
    chat.insertAdjacentHTML("beforebegin",`

        <div id="id${element.codeId}" class="message">
            <p contenteditable="true" class="FirstName">${element.firstName}</p>
            <p contenteditable="true" class="body">${element.information}</p>
            ${JSON.parse(element.img).map(val=>{return `<img src="http://localhost:3001/uploads/${val}" alt="Картинка с поста">`})}
            <button onclick="savePost(${element.codeId} , '${element.firstName}')" class="btn-save">Сохранить</button>
            <button onclick="deletePost(${element.codeId} , '${element.firstName}')" class="btn-delete">Удалить</button>
        </div>
        </div>`
            )
        }
    )
}

main()

async function savePost(id, firstName){
    console.log(id)
    const newName = document.querySelector(`#id${id} .FirstName`).innerHTML
    const newInfo = document.querySelector(`#id${id} .body`).innerHTML
    console.log(newName , newInfo)
    await requester("POST","infoBoard/updateInfo",{changeName: firstName, firstName:newName, info:newInfo})

    //location.reload()
}


function  newPost(){
    console.log([...document.getElementById("file").files]  )
    //console.log(document.getElementById("img").files[0])
    requester("POST","infoBoard/addInfo",{
        firstName:document.getElementById("FirstName").innerHTML,
        information:document.getElementById("body").innerHTML,
        img:JSON.stringify([...document.getElementById("file").files].map(val=>{console.log(val);return val.name}))
    })



    Array.from(document.getElementById("file").files).forEach((val,i)=>{
        const formData = new FormData()
        formData.append("file",val)
        send(formData)
    })
   location.reload()
}

async function send(formData) {
    
    try {
        const response = await axios.post("http://localhost:3001", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

function deletePost(id,firstName){
    console.log('delete',id)
    requester("POST","infoBoard/deleteInfo",{firstName})
    setTimeout(location.reload(),20)
}
