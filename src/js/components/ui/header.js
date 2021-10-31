import makeElement from "../../utils/makeElement.js"

const header = function (elementType='h1', label="ui header", className="ui-header"){
    const template = `<${elementType} class="${className}"> ${label} </ ${elementType}>`
    const element = makeElement(template)

    return element
}

export default header