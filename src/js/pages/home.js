import link from "../components/ui/link.js"
import branding from "../components/cards/branding.js";


const homePage = function(){
    //heading component builds the homepage
    var page = document.createElement('div')
    page.classList.add('homepage')
    const header = branding();

    page.append(header)
    const linkElm = link('enter app', '/todos', 'enter-list-a')

    page.append(linkElm)

    return page
}

export default homePage