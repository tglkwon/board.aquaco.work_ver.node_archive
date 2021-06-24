async function textDelete() {
    try {
        const titleNo = new URLSearchParams(location.search).get("titleNo")
        const token = localStorage.getItem("token")
        
        const res = await axios({
            method: "delete",
            url: `https://api.board.aquaco.work/board/${titleNo}`,
            headers: {
                token
            }
        })
        
        if(res.data.result) {
            location.href = "/"
        } else {
            throw new Error()
        }
    } catch(e) {
        alert("글 지우기 실패")
        console.error(e)    
    }
}