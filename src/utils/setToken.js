export function setToken(tokenKey, token){
    return localStorage.setItem(tokenKey, token)
}

export function getToken(tokenKey){
    return localStorage.getItem(tokenKey)
}

export function remnoveToken(tokenKey){
    return localStorage.removeItem(tokenKey)
}

export function clearToken(){
    return localStorage.clear()
}

export function getCookie(){
    var strCookie = document.Cookie.split(";")[0].split("=")[1];
/*     var arrCookie = strCookie.split(";"); */
/*     for ( var i = 0;  arrCookie.length; i++){
        var arr = arrcookie[i].split("=");
        if (arr[0] == name){
        return arr[1];
        }  
        return "";      
        } */
        console.log(strCookie)
}