let myEditor

async function textWrite() {
    try {
        const token = localStorage.getItem("token")
        const title = document.querySelector("main > header > input[name=title]").value
        const contents = myEditor.getData()
        
        if(!title || !contents) {
            alert("빈칸이 있습니다.")
        }
        
        const res = await axios({
            method: "post",
            url: `https://api.board.aquaco.work/board`,
            headers: {
                token
            },
            data: {
                title,
                contents
            }
        })

        if(res.data.result) {
            location.href = `/read.html?titleNo=${res.data.titleNo}`
        } else {
            throw new Error()
        }
    } catch(e) {
        alert("글 쓰기 실패")
        console.error(e)    
    }
}

;(() => {
    ClassicEditor
        .create(document.querySelector('#editor'), {
            mediaEmbed: {previewsInData: true},
            AutoImage: {isEnabled: true}
        })
        .then(editor => {
            myEditor = editor
        })
        .catch(error => {
            console.error(error);
        })   
})()