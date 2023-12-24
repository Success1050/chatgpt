const btnTogglers= document.querySelector('.btn-togglers')
const headerClose= document.querySelector('.header-close')
const sendBtn= document.querySelector('.send-btn')
const input= document.querySelector('#input-text')
const chatBox= document.querySelector('.chat-box')

let userMessage;
const API_KEY= "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"

btnTogglers.addEventListener('click', ()=> document.body.classList.toggle('show-bot'))

headerClose.addEventListener('click', ()=>{
    document.body.classList.remove('show-bot')
})

sendBtn.addEventListener('click', handleChat)

function createLi(message, className){
    const chatLi= document.createElement("li")
    chatLi.classList.add('chat', className)
    let chatContent;
    if (className === "outgoing") {
        chatContent= `
                <p>${message}</p>`
    }
    else{
        chatContent= `<span><i class="ri-robot-2-line"></i></span>
                <p>${message}</p>`
    }

    chatLi.innerHTML= chatContent
    return chatLi
}

const generateResponse=()=>{
    const API_URL= "https://api.openai.com/v1/chat/completions";

    const requestOptions ={
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },

        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
            role: "user",
            content: userMessage}],
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        console.log(data);
    }).catch((error)=>{
        console.log(error);
    })
}

function handleChat(){
    userMessage= input.value.trim()
    if (!userMessage) {
        return userMessage
    }
    
    chatBox.appendChild(createLi(userMessage, "outgoing"))

    setTimeout(() => {
        chatBox.appendChild(createLi("thinking", "incoming"))
        generateResponse()
    }, 600);
}

