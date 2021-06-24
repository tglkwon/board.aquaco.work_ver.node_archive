async function register() {
    try {
        const id = document.getElementsByName("id")[0].value
        const password = document.getElementsByName("password")[0].value    
        const password2 = document.getElementsByName("password2")[0].value
        const nickname = document.getElementsByName("nickname")[0].value

        if(password !== password2) {
            alert("두 비밀번호가 같지 않습니다.")
            // throw new Error() ? 이거 의미 있나?
        }

        const res = await axios({
            method: "post",
            url: 'https://api.board.aquaco.work/member',
            data: {
                id,
                password,
                nickname
            }
        })

        location.href = "login.html"

    } catch(e) {
        alert("로그인 실패")
        console.error(e)
    }
}