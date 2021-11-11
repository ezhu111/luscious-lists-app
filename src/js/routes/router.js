import home from "../pages/home.js";
import todos from "../pages/todos.js";
import notfound from "../pages/notfound.js";
import deletePage from "../pages/crud/delete.js";

const routes = {
    "/": home,
    "/todos": todos,
    "/delete": deletePage,
    "/*": notfound
}

const Router =  function (pathname, params=null)   {
    const isValidRoute = Object.keys(routes).find(key => key===pathname)

    // loading and unloading pages into the div app
    const app = document.querySelector('#app')
    app.innerHTML = ''

    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
    )   
    
    if(isValidRoute === undefined){
        app.appendChild(notfound())
    }else{
        // passing properties through to the page component as params
        app.appendChild(routes[isValidRoute](params)) 
    }
}

export { Router }