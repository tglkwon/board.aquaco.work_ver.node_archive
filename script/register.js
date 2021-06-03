async function Register() {
    try {
        const id = document.querySelector("main > input[name=id]").value
        const password = document.querySelector("main > input[name=password]").value
        const nickname = document.querySelector("main > input[name=nickname]").value

        if(password !== document.querySelector("main > input[name=passwordConfirm]").value) {
            alert("비밀번호가 같지 않습니다.")
            return
        }

        const res = await axios({
            method: "POST",
            url: `//api.board.aquaco.work/member`,
            data: {
                id,
                password,
                nickname
            }
        })
        
        if(!res.data.success) {
            throw new Error()
        }

        location.href = "/login.html"
        
    } catch(e) {
        console.error(e)
        alert("몬가.. 뭔가 일어나고 있어")
    }

}