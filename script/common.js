let config = {
    // Sample token for develop
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IuyVhOydtOuUlDMiLCJuaWNrbmFtZSI6IuyVhOy_oOyVhOy7tO2NvOuLiCIsImlhdCI6MTYyMjYxNjY0NiwiZXhwIjoxNjIyNjU5ODQ2fQ.6so6VoR4IHZUE4QzgK17WfPk525Busj_3L7IGXpiM8g"
}

function parseJwt(token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
}

config.decoded = parseJwt(config.token)

if(config.decoded.exp < Date.now() / 1000){
    //토큰만료
    alert("토큰 만료")
}

function GoList() {
    if(document.referrer.includes("board.aquaco.work")) {        
        if(location.pathname === "/") {
            history.back()
            return
        }
    }

    location.href = "/"
}