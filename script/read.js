async function replyWrite() {
    try {
        const token = localStorage.getItem("token")
        const reply = document.querySelector("footer > .replyWrite > input[name=reply]").value
        const titleNo = new URLSearchParams(location.search).get("titleNo")

        if(!reply) {
            alert("빈칸이 있습니다.")
        }
        
        const res = await axios({
            method: "post",
            url: `https://api.board.aquaco.work/board/${titleNo}/reply`,
            headers: {
                token
            },
            data: {
                reply
            }
        })
        
        if(res.data.result) {
            location.reload()
        } else {
            throw new Error()
        }
    } catch(e) {
        alert("댓글 쓰기 실패")
        console.error(e)    
    }
}

async function replyDelete(titleNo, replyNo) {
    try {
        const token = localStorage.getItem("token")
        
        const res = await axios({
            method: "delete",
            url: `https://api.board.aquaco.work/board/${titleNo}/reply/${replyNo}`,
            headers: {
                token
            }
        })
        
        if(res.data.result) {
            location.reload()
        } else {
            throw new Error()
        }
    } catch(e) {
        alert("댓글 수정 실패")
        console.error(e)    
    }
}

function goReplyModify(titleNo, replyNo) {
    const reply = document.querySelector(`footer > .replyRead > div[data-reply-no="${replyNo}"] > .reply`).innerText
    const replyInput = document.createElement("input")
    replyInput.addEventListener("keydown", (e) => {if(e.keyCode == 13) replyModify(titleNo, replyNo)})
    replyInput.classList.add("modifiedReply")
    replyInput.value = reply
    
    const replyModifyButton = document.createElement("button") 
    replyModifyButton.addEventListener("click", () => {replyModify(titleNo, replyNo)})
    replyModifyButton.innerText = "댓글수정"

    const divReply = document.querySelector(`footer > .replyRead > div[data-reply-no="${replyNo}"]`)
    divReply.append(replyInput, replyModifyButton)
}

async function replyModify(titleNo, replyNo) {
    try {
        const token = localStorage.getItem("token")
        const reply = document.querySelector(`footer > .replyRead > div[data-reply-no="${replyNo}"] > .modifiedReply`).value

        const res = await axios({
            method: "put",
            url: `https://api.board.aquaco.work/board/${titleNo}/reply/${replyNo}`,
            headers: {
                token
            },
            data: {
                reply
            }
        })
        
        if(res.data.result) {
            location.reload()
        } else {
            throw new Error()
        }
    } catch(e) {
        alert("댓글 지우기 실패")
        console.error(e)    
    }
}

function goModify() {
    const titleNo = new URLSearchParams(location.search).get("titleNo")

    const title = document.querySelector("main > header  .title").innerText
    const contents = document.querySelector("main > .contents").innerHTML
    localStorage.setItem("modify-data", JSON.stringify({titleNo, title, contents}))
    
    location.href=`/modify.html?titleNo=${titleNo}`
}

function goList() {
    const urlReferrer = new URL(document.referrer)
    if(urlReferrer.host == "board.aquaco.work" && urlReferrer.pathname === "/") {
        history.back()
    } else {
        location.href="/"
    }
}

;(async () => {
    try {
        const titleNo = new URLSearchParams(location.search).get("titleNo")
        
        const res = await axios({
            method: "get",
            url: `https://api.board.aquaco.work/board/${titleNo}`
        })
        
        const read = res.data.read[0]

        const title = document.querySelector("main > header  .title")
        title.innerText = read.title
        const nickname = document.querySelector("main > header  .nickname")
        nickname.innerText = read.nickname
        const datetime = document.querySelector("main > header  .datetime")
        datetime.innerText = read.datetime

        const text = document.querySelector("main > .contents")
        text.innerHTML = read.contents

        // make reply list
        const resReply = await axios({
            method: "get",
            url: `https://api.board.aquaco.work/board/${titleNo}/reply`
        })
        
        const list = resReply.data.reply
        for(const item of list) {
            const div = document.createElement("div")
            div.dataset.replyNo = item.reply_no

            const replyNickname = document.createElement("span")
            replyNickname.classList.add("nickname")
            replyNickname.innerText = item.nickname
            
            const reply = document.createElement("span")
            reply.classList.add("reply")
            reply.innerText = item.reply
            
            const replyDatetime = document.createElement("span")
            replyDatetime.classList.add("datetime")
            replyDatetime.innerText = item.datetime

            div.append(replyNickname, reply, replyDatetime)
            //modify, delete button
            const divButton = document.createElement("div")
            divButton.classList.add("button")

            const modifyButton = document.createElement("button")
            modifyButton.addEventListener("click", () => {goReplyModify(titleNo, item.reply_no)})
            modifyButton.innerText = "수정"
            
            const deleteButton = document.createElement("button")
            deleteButton.addEventListener("click", () => {replyDelete(titleNo, item.reply_no)})
            deleteButton.innerText = "삭제"

            div.append(modifyButton, deleteButton)

            const addReply = document.querySelector("footer > .replyRead")
            addReply.append(div)
        }

    } catch(e) {
        alert("글 불러오기 실패")
        console.error(e)    
    }
})()