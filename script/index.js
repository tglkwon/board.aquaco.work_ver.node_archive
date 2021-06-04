;(async () => {
    try {
        const params = new URLSearchParams(location.search)
        let page = 1
        if(params.get("page")) {
            page = Number(params.get("page"))
        }

        const res = await axios({
            method: "GET",
            url: `//api.board.aquaco.work/board?page=${page}`,
            headers: {
                token: config.token
            }
        })
        
        if(!res.data.success) {
            throw new Error()
        }

        const pageLastNum = Math.ceil(res.data.cntText / 10)

        const pageFirst = document.querySelector("footer > ol > li:nth-child(1)")
        const pagePrev = document.querySelector("footer > ol > li:nth-child(2)")
        const pageNext = document.querySelector("footer > ol > li:nth-child(8)")
        const pageLast = document.querySelector("footer > ol > li:nth-child(9)")
                        
        pageFirst.addEventListener("click", () => location.href = "/?page=1")
        pagePrev.addEventListener("click", () => location.href = `/?page=${Math.floor(page / 5) * 5}`)
        pageNext.addEventListener("click", () => location.href = `/?page=${Math.ceil(page / 5) * 5 + 1}`)
        pageLast.addEventListener("click", () => location.href = `/?page=${pageLastNum}`)
        
        if(page <= 5) {
            pageFirst.classList.add("cloaking")
            pagePrev.classList.add("cloaking")
        } else {
            pageFirst.classList.remove("cloaking")
            pagePrev.classList.remove("cloaking")
            
        }

        if(page > pageLastNum - pageLastNum % 5) {
            pageLast.classList.add("cloaking")
            pageNext.classList.add("cloaking")
        } else {
            pageLast.classList.remove("cloaking")
            pageNext.classList.remove("cloaking")          
        }

        for(let i = 0; i < 5; i++) {
            const pointer = page - (page - 1) % 5  + i
            const pageLi = document.querySelector(`footer > ol > li:nth-child(${i + 3})`)
            pageLi.innerText = pointer
            pageLi.addEventListener("click", () => {
                location.href = `/?page=${pointer}` 
            })

            pageLi.classList.remove("cloaking")

            if(pointer === page) {
                pageLi.classList.add("bold")
            } else {
                pageLi.classList.remove("bold")
            }

            if(pointer > pageLastNum) {
                pageLi.classList.add("cloaking")
            }
        }

        const list = res.data.list

        for(let i = 0; i < list.length; i++) {
            const item = list[i]
            
            const table = document.querySelector("table > tbody")

            const tr = document.createElement("tr")

            const tdNo = document.createElement("td")
            tdNo.classList.add("no")
            tdNo.innerText = item.no

            const tdTitle = document.createElement("td")
            tdTitle.classList.add("title")
            tdTitle.innerText = item.title
            tdTitle.addEventListener("click", () => { 
                location.href = `/read.html?no=${item.no}`
            })

            const spanCntReply = document.createElement("span")
            spanCntReply.innerText = `[${item.cnt_reply}]`

            tdTitle.append(spanCntReply)

            const tdNickname = document.createElement("td")
            tdNickname.classList.add("nickname")
            tdNickname.innerText = item.nickname

            let displayDate
            if(Date.now() - Date.parse(item.wri_date) > 60 * 60 * 24 * 1000) {
                displayDate = item.wri_date.match(/^([^T]+)T/)[1]
            } else {
                displayDate = item.wri_date.match(/T([^\.]+)\./)[1].replace(/:[0-9]+$/, '')
            }

            const tdDatetime = document.createElement("td")
            tdDatetime.classList.add("datetime")
            tdDatetime.innerText = displayDate

            tr.append(tdNo, tdTitle, tdNickname, tdDatetime)

            table.append(tr)
        }


    } catch(e) {
        console.error(e)
        alert("몬가.. 뭔가 일어나고 있어")
    }
})()

