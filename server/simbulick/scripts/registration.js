$('.message a').click(function(){
    $('.action').animate({height: "toggle", opacity: "toggle"}, "slow");
});
$('.change a').click(function(){
    $('.action1').animate({height: "toggle", opacity: "toggle"}, "slow");
});


let botton = document.querySelector('#click')
let botton1 = document.querySelector('#click1')
let err = document.querySelector('.register-form')
let err_login = document.querySelector('.box_login')
let botton_change = document.querySelector('#click2')

//validation
function errorRegisterBackAdd(login, text){
    const parent= login.parentNode
    const errorLabel = document.createElement('label')
    errorLabel.classList.add('error-label')
    errorLabel.textContent = text
    parent.classList.add('error')
    parent.append(errorLabel)
}

function errorBackAdd(err_login, text){
    const errorLabel = document.createElement('label')
    errorLabel.classList.add('error-label')
    errorLabel.textContent = text
    err_login.classList.add('error')
    err_login.append(errorLabel)

}
function errorBackRemove(err_login){
    if (err_login.classList.contains('error')){
        err_login.classList.remove('error')
        err_login.querySelector('.error-label').remove()
    }
}
function validation(err) {
    function AddError(input, text) {
        const parent = input.parentNode
        const errorLabel = document.createElement('label')
        errorLabel.classList.add('error-label')
        errorLabel.textContent = text
        parent.classList.add('error')
        parent.append(errorLabel)
    }
    function RemoveError(input){
        const parent = input.parentNode
        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove()
            parent.classList.remove('error')
        }
    }
    let result = true
    err.querySelectorAll('input').forEach(input =>{
        RemoveError(input)
        if(input.dataset.required==='true'){
            RemoveError(input)
            const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            const address = document.querySelector('#email').value
            if(reg.test(address) === false) {
                AddError(input,'Fill correct email')
                result = false
            }
        }
        if (input.dataset.minLength){
            if (input.value.length<input.dataset.minLength){
                RemoveError(input)
                AddError(input,`Minimum number of characters: ${input.dataset.minLength}`)
                result = false
            }
        }
        if (input.dataset.maxLength){
            if (input.value.length>input.dataset.maxLength){
                RemoveError(input)
                AddError(input,`Maximum number of characters: ${input.dataset.maxLength}`)
                result = false
            }
        }
        if (input.value==='') {
            RemoveError(input)
            console.log('Ошибка')
            AddError(input,'The field is not filled')
            result=false
        }

    })
    return result
}

// function Successvalidation()

//requests
const addNewUser = async (newUser) => {
    try {
        const response = await axios.post('http://192.168.0.104:3000/users/create', newUser)
        return response.data

    } catch (err) {
        console.error(err.response.data.message)
        let login = document.querySelector(err.response.data.id)
        errorRegisterBackAdd(login, err.response.data.message)
    }
}
const LogIn = async (data)=>{
    try{
        const response = await axios.post('http://192.168.0.104:3000/userLogin/Login', data)
        console.log(response.data.answer)
        if (response.data.statusCode===200){
            window.location.href='home.html'
        }
        return response.data

    }catch (err){
        console.error(err.response.data.message)
        errorBackAdd(err_login, err.response.data.message)
    }
}
const Code = async (code) =>{
    try {
        const response = await axios.post('http://192.168.0.104:3000/users/addUser', code)
        return response.data
    }catch (err){
        console.log(err)
        let main = document.querySelector('.input-box')
        const errorLabel = document.createElement('label')
        errorLabel.classList.add('error-label')
        errorLabel.textContent = err.response.data.message
        main.classList.add('error')
        main.append(errorLabel)
    }
}

const Change = async (email)=>{
    try {
        const response = await axios.post('http://192.168.0.104:3000/userChangePassword/password', email)
        return response.data
    }catch (err){
        console.log(err)
    }
}
const ChangePassword = async(password)=>{
    try {
        const response = await axios.post('/password_change', password)
        return response.data
    }catch (err){
        console.log(err)
    }
}

// botton_change.addEventListener('click', function (){
//     let email = document.querySelector('#change').value
//     let random_code = getRandom(10000,99999).toString()
//     Change({Email_adress:email, Code_verification:random_code})
//     let adder = document.querySelector('.change-box')
//     adder.innerHTML = ''
//     adder.innerHTML += `<div class="inbox"><input id="code_change" type="text" placeholder="code"/></div>>`
//     adder.innerHTML += `<button id="change_click">send</button>`
//     let change_click = document.querySelector('#change_click')
//     change_click.addEventListener('click', function (){
//         let code = document.querySelector('#code_change').value
//         if (code===random_code){
//             adder.innerHTML = ''
//             adder.innerHTML += `<input id="password_change" type="password" placeholder="password"/>`
//             adder.innerHTML += `<input type="password" placeholder="confirmation password"/>`
//             adder.innerHTML += `<button id="password_click">send</button>`
//             let password_click = document.querySelector('#password_click')
//             password_click.addEventListener('click', function (){
//                 let password_change = document.querySelector('#password_change').value
//                 ChangePassword({'New_password':password_change})
//             })
//         }
//         else {
//             console.error('error')
//         }
//     })
//
// })
botton.addEventListener('click', function(){
    if(validation(err)===true){
        let password = document.querySelector('#password').value
        let name = document.querySelector('#name').value
        let email = document.querySelector('#email').value
        console.log(email)
        addNewUser({userEmail:email})
        const confirmation = document.querySelector('.confirmation')
        confirmation.innerHTML=''
        confirmation.innerHTML+=`<div class="input-box">
            <input id="code" type="text" placeholder="code confirmation"/>
                  </div>`
        document.querySelector('button').remove()
        confirmation.innerHTML += `<button id="new_click">send</button>`
        let new_click = document.querySelector('#new_click')

        new_click.addEventListener('click', function (){
            let code = document.querySelector('#code').value
            let codemass = Code({'userCodeVerification':code, 'userPassword':password})
            console.log(codemass)
            if (codemass['userCodeVerification']===code){
                localStorage.setItem('access',codemass['accessToken'])
                document.cookie = codemass['refreshToken']
            }
        })



    }
})
// botton1.addEventListener('click', function (){
//     console.log('work')
//     errorBackRemove(err_login)
//     let password = document.querySelector('#password1').value
//     let login = document.querySelector('#username').value
//     LogIn({User_name: login, User_password: password})
// })