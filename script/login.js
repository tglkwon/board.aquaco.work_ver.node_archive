async function login() {
    try {

        const id = document.querySelector("span > input[name=id]").value
        const password = document.querySelector("span > input[name=password]").value    
 
        const res = await axios({
            method: 'post',
            url: 'https://api.board.aquaco.work/member/login',
            data: {
              id,
              password
            }
        })

        if(res.data.result) {
            localStorage.setItem("token", res.data.token)
            location.href = "/"
        }

    } catch(e) {
        alert("로그인 실패")
        console.error(e)
    }
}