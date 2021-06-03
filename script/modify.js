let myEditor

;(async () => {
    try {
        const params = new URLSearchParams(location.search)
        const no = params.get("no")    
        
        const resText = await axios({
            method: "GET",
            url: `//api.board.aquaco.work/board/${no}`,
            headers: {
                token: config.token
            }
        })

        if(!resText.data.success) {
            throw new Error()
        }

        const item = resText.data.contents

        const title = document.querySelector("header > input")
        title.value = item.title
        
        const body = document.querySelector("main > #editor")
        body.innerHTML = item.body
        

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

    } catch(e) {
        console.error(e)
        alert("몬가.. 뭔가 일어나고 있어")
    }
})()


async function SendModifiedText() {
    try {
        const params = new URLSearchParams(location.search)
        const no = params.get("no")  

        const inputTitle = document.querySelector("header > input[name=title]")
        const title = inputTitle.value

        const body = myEditor.getData()
        
        if(!title || !body) {
            throw new Error()
        }

        const resTextSend = await axios({
            method: "PUT",
            url: `//api.board.aquaco.work/board/${no}`,
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

        location.href = `/read.html?no=${no}`
        
    } catch(e) {
        console.error(e)
        alert("글 전송 실패")
    }
}