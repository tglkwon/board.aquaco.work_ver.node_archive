

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

        const title = document.querySelector("main > .header > .title")
        title.innerText = item.title
        
        const nickname = document.querySelector("main > .header > .info > .nickname")
        nickname.innerText = item.nickname
        
        const datetime = document.querySelector("main > .header > .info > .functional > .datetime")
        const datetimeArray = item.wri_date.match(/(.+)T(.+):\d{2}\.\d{3}Z/) 
        datetime.innerText = datetimeArray[1] + " " + datetimeArray[2]
    
        const body = document.querySelector("main > .text")
        body.innerHTML = item.body
        
        if(config.decoded.nickname === item.nickname){
            const buttons = document.querySelectorAll("main > .header > .info > .functional > button")        
            buttons.forEach(button => {
                button.setAttribute("style", "display: initial")
            })
        }

        GetReply(no)

        const footerTdNickname = document.querySelector("footer > table > tfoot > tr > td.nickname")
        footerTdNickname.innerText = config.decoded.nickname

    } catch(e) {
        console.error(e)
        alert("몬가.. 뭔가 일어나고 있어")
    }
})()

async function SendReply() {
    try {
        const params = new URLSearchParams(location.search)
        const no = params.get("no")

        const textareaReply = document.querySelector("footer > table > tfoot > tr > td.reply-box > textarea")
        const reply = textareaReply.value
        textareaReply.value = ""

        if(!reply) {
            throw new Error()
        }

        const resReplySend = await axios({
            method: "POST",
            url: `//api.board.aquaco.work/board/${no}/reply`,
            headers: {
                token: config.token
            },
            data: {
                reply
            }
        })

        if(!resReplySend.data.success) {
            throw new Error()
        }  

        GetReply(no)

    } catch(e) {
        console.error(e)
        alert("댓글 전송 실패")
    }
}

async function GetReply(no) {
    const resReply = await axios({
        method: "GET",
        url: `//api.board.aquaco.work/board/${no}/reply`,
        headers: {
            token: config.token
        }
    })

    if(!resReply.data.success) {
        throw new Error()
    }        

    const list = resReply.data.list
    
    const table = document.querySelector("footer > table > tbody")
    table.innerHTML = ""

    for(let i = 0; i < list.length; i++) {
        const reply = list[i]

        const tbody = document.querySelector("footer > table > tbody")

        const tr = document.createElement("tr")

        const tdNickname = document.createElement("td")
        tdNickname.classList.add("nickname")
        tdNickname.innerText = reply.nickname

        const tdReply = document.createElement("td")
        tdReply.classList.add("reply")
        tdReply.innerText = reply.reply

        if(config.decoded.nickname === reply.nickname) {
            const spanFunckey = document.createElement("span")
            spanFunckey.classList.add("funckey")
            
            const spanModify = document.createElement("span")
            spanModify.classList.add("modify")
            spanModify.innerText = "수정"

            const spanDelete = document.createElement("span")
            spanDelete.classList.add("delete")
            spanDelete.innerText = "삭제"

            spanFunckey.append(spanModify, spanDelete)

            tdReply.append(spanFunckey)
        }

        let displayDate
        if(Date.now() - Date.parse(reply.rep_date) > 60 * 60 * 24 * 1000) {
            displayDate = reply.rep_date.match(/^([^T]+)T/)[1]
        } else {
            displayDate = reply.rep_date.match(/T([^\.]+)\./)[1].replace(/:[0-9]+$/, '')
        }

        const tdDatetime = document.createElement("td")
        tdDatetime.classList.add("datetime")
        tdDatetime.innerText = displayDate

        tr.append(tdNickname, tdReply, tdDatetime)
        
        tbody.append(tr)
        
    }
}