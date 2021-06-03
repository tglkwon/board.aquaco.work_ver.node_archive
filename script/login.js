async function Login() {
    try {
        const id = document.querySelector("main > input[name=id]").value
        const password = document.querySelector("main > input[name=password]").value

        const res = await axios({
            method: "POST",
            url: `//api.board.aquaco.work/member/login`,
            data: {
                id,
                password
            }
        })
        
        if(!res.data.success) {
            throw new Error()
        }

        const token = res.data.token

        localStorage.setItem("token", token)

        location.href = "/"
        
    } catch(e) {
        console.error(e)
        alert("몬가.. 뭔가 일어나고 있어")
    }

}

;(() => {
    localStorage.removeItem("token")
    config.token = null
})()