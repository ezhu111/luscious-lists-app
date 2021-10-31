import makeElement from "../../utils/makeElement.js"

const logo = function (elementType='i', className="logo fab fa-wpforms"){
    const template = `<${elementType} class="${className}"></${elementType}>`
    const element = makeElement(template)

    return element
}

export default logo

