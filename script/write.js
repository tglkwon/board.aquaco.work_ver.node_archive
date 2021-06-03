let myEditor

;(() => {
    ClassicEditor
        .create(document.querySelector('#editor'), {
            mediaEmbed: {previewsInData: true}
        })
        .then(editor => {
            myEditor = editor
        })
        .catch(error => {
            console.error(error);
        })   
})()

async function SendText() {
    try {
        const inputTitle = document.querySelector("header > input[name=title]")
        const title = inputTitle.value

        const body = myEditor.getData()
        
        if(!title || !body) {
            throw new Error()
        }

        const resTextSend = await axios({
            method: "POST",
            url: `//api.board.aquaco.work/board`,
            headers: {
                token: config.token
            },
            data: {
                title,
                body
            }
        })

        if(!resTextSend.data.success) {
            throw new Error()
        }  

        location.href = `/read.html?no=${resTextSend.data.no}`
        
    } catch(e) {
        console.error(e)
        alert("글 전송 실패")
    }
}