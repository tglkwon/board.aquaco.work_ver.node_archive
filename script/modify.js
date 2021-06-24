let myEditor

async function textModify() {
    try {
        const titleNo = new URLSearchParams(location.search).get("titleNo")
        const token = localStorage.getItem("token")
        const title = document.querySelector("main > header > input[name=title]").value
        const contents = myEditor.getData()
        
        if(!title || !contents) {
            alert("빈칸이 있습니다.")
        }
        
        const res = await axios({
            method: "put",
            url: `https://api.board.aquaco.work/board/${titleNo}`,
            headers: {
                token
            },
            data: {
                title,
                contents
            }
        })

        if(res.data.result) {
            location.href = `/read.html?titleNo=${titleNo}`
        } else {
            throw new Error()
        }
    } catch(e) {
        alert("글 수정 실패")
        console.error(e)    
    } 
}
;(() => {
    const titleNo = new URLSearchParams(location.search).get("titleNo")
    const modifyData = JSON.parse(localStorage.getItem("modify-data"))

    if(titleNo !== modifyData.titleNo) {
        alert("비정상적인 접근입니다.")
        history.back()
        return
    }    
    
    const title = document.querySelector("main > header > input")
    title.value = modifyData.title

    const contents = document.querySelector("#editor")
    contents.value = modifyData.contents    

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