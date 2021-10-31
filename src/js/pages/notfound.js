import link from "../components/ui/link.js"
import branding from "../components/cards/branding.js"
import makeElement from "../utils/makeElement.js"

const pageNotFound = function(){
    //create a div to hold all the content inside
    var page = document.createElement('div')
    page.classList.add('not-found-page')

    const header = branding();
    const div = document.createElement('div');

    page.append(header)
    let notFoundTemplate = `
        <p><span>404</span> Page not found :(</p>
    `
    
    const notFound = makeElement(notFoundTemplate)
    div.append(notFound)
    
    const linkElm = link('take me back', '/', 'not-found')
    div.append(linkElm)
    page.append(div)

    return page
}

export default pageNotFound