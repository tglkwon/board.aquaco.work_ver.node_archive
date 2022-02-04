;(async () => {
        try {
        const token = localStorage.getItem("token")
        const pageNo = Number(new URLSearchParams(location.search).get("pageNo") || 1) 
        
        const res = await axios({
            method: "get",
            url: `https://api.board.aquaco.work/list?pageNo=${pageNo}`,
            headers: {
                token
            }
        })
        
        if(!res.data.result) {
            alert("토큰 오류?")
            location.href="/login.html"
        }
        // make list
        const list = res.data.list
        
        for(const item of list) {
            const tr = document.createElement("tr")

            const titleNo = document.createElement("td")
            titleNo.classList.add("titleNo")
            titleNo.innerText = item.title_no
            
            const title = document.createElement("td")
            title.addEventListener("click", () => {location.href=`read.html?titleNo=${item.title_no}`})
            title.classList.add("title")
            title.innerText = item.title
            // const anchor = document.createElement("a")
            // anchor.href = `/board/read.html?titleNo=${item.title_no}`
            // anchor.innerText = item.title
            // title.append(anchor)
            
            const nickname = document.createElement("td")
            nickname.classList.add("nickname")
            nickname.innerText = item.nickname
            
            const datetime = document.createElement("td")
            datetime.classList.add("datetime")
            datetime.innerText = item.datetime
        
            tr.append(titleNo, title, nickname, datetime)
            
            const tbody = document.querySelector("main > table > tbody")
            tbody.append(tr)

            const table = document.querySelector("main > table")
            table.append(tbody)
        }

        const maxTitleNo = res.data.maxTitleNo
        const maxPageNo = maxTitleNo / 10 + 1
        // pagiNation
        for(let i = pageNo - pageNo % 5 + 1; i <= pageNo - pageNo % 5 + 5; i++) {
            let pagination = document.querySelector(`footer > span:nth-child(${i % 5 + 3})`)
            
            if(i > maxPageNo) {
                pagination.style.display = "none"
                continue   
            }

            pagination.style.display = ""    

            if(i === pageNo) {
                pagination.style.fontWeight = "bold"
            } else {
                pagination.style.fontWeight = ""    
            }

            pagination.innerText = i
            pagination.addEventListener("click", () => {location.href = `/?pageNo=${i}`})
            // console.log(pagination)
        }

        const pgFirst = document.querySelector(`footer > span.pg-first`)
        const pgPrev = document.querySelector(`footer > span.pg-prev`)
        if(pageNo <= 5) {
            pgFirst.style.display = "none"
            pgPrev.style.display = "none"
        } else {
            pgFirst.style.display = ""
            pgPrev.style.display = ""           
        }

        const pgLast = document.querySelector(`footer > span.pg-last`)
        const pgNext = document.querySelector(`footer > span.pg-next`)
        if(pageNo > maxPageNo - maxPageNo % 5) {
            pgLast.style.display = "none"
            pgNext.style.display = "none"
        } else {
            pgLast.style.display = ""
            pgNext.style.display = ""           
        }
        
    } catch(e) {
        alert("글 목록 불러오기 실패")
        console.error(e)    
    }
})()