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

async function CaptureSpecialKey(event, keyCode, callback, option = {}) {
    if(!event.Handled) {
        event.Handled = true
        if(event.keyCode === keyCode) {
            if(option.ctrlKey) {
                if(!event.ctrlKey) return
            } else {
                if(event.ctrlKey) return
            }
            if(option.altKey) {
                if(!event.altKey) return
            } else {
                if(event.altKey) return
            }
            if(option.shiftKey) {
                if(!event.shiftKey) return
            } else {
                if(event.shiftKey) return
            }
            event.preventDefault()
            callback()
        }
    }
}