import makeElement from "../../utils/makeElement.js"

const addToDo = function () {
    let footerTemplate = `
    <footer class="ui-page-footer">
        <button id="addTodo" class="addToDo">
            <i class="fas fa-plus"></i>
        </button>
    </footer>
    `

    const footer = makeElement(footerTemplate)

    return footer
}

export default addToDo