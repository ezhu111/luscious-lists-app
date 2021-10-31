import makeElement from "./makeElement.js"
/*
    template, data
    template function userTemplate
    data single user

    return template literal
*/

const render = function (template, data){
    const templateStringLiteral = template(data)
    // convert the template literal markup
    // template display add to the view
    // insertAdjacentHTML
    const markup = makeElement(templateStringLiteral)
    return markup
}

export default render