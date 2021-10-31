import header from "../ui/header.js"
import tagline from "../ui/tagline.js"
import logo from "../ui/logo.js"

//Creates the heading
const branding = function(){
    var heading = document.createElement('header')
    heading.classList.add('ui-page-header')
    const logoIcon = logo()
    const h1 = header('h1', 'Luscious Lists')
    const p = tagline('Tasty Todos')
    heading.append(logoIcon)
    heading.append(h1)
    heading.append(p)

    return heading
}

export default branding