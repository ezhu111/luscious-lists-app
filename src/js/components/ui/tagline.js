import makeElement from "../../utils/makeElement.js"

const tagline = function (label="ui tagline", className="ui-tagline"){
    const template = `<p class="${className}"> ${label} </p>`
    const element = makeElement(template)

    return element
}

export default tagline