import makeElement from '../../utils/makeElement';
const button = function (className="ui-button", label="ui button"){
    const template = `<button class=${className}>${label}</button>`
    const element = makeElement(template);

    return element
}

export default button