let config = {
    // Sample token for develop
    token: ""
}

function parseJwt(token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
}
;(() => {
    if((location.pathname !== "/login.html") && (location.pathname !== "/register.html")) {
        if(localStorage.getItem("token")) {
            config.token = localStorage.getItem("token")
        } else {
            location.href = "/login.html"
            return
        }
    
        config.decoded = parseJwt(config.token)
    
        if(config.decoded.exp < Date.now() / 1000){
            location.href = "/login.html"
            return
        } 
    }

    
})() 

function GoList() {
    if(document.referrer.includes("board.aquaco.work")) {        
        if(document.referrer.replace(/^[^:]+:\/\/[^/]+/, '').replace(/[#?].*/, '') === "/") {
            location.href = document.referrer.replace(/^[^:]+:\/\/[^/]+/, '').replace(/#.*/, '')
            return
        }
    }

    location.href = "/"
}
