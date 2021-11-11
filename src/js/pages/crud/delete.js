import branding from "../../components/cards/branding"
import { getStore } from "../../redux/store"
import { Router } from "../../routes/router"
import makeElement from "../../utils/makeElement"
import button from "../../components/ui/button"
import reducer from "../../redux/reducers"

const cancelButton = button("cancelButton", "Cancel")
const deleteButton = button("deleteButton", "Delete")

const deletePage = function (props) {

    // redirect back to todos page if there is no data
    if (props == null) {
        Router('/todos')
    }
    else {
        function onCancelDelete(e) {
            Router('/todos')
        }

        function onRemoveTodo(e) {
            if (confirm('Are you sure you want to delete this item?')) {
                Router('/todo')
                const removeTodo = props
                const index = getStore().findIndex(todo => todo.id === removeTodo.id)
                const action = {
                    type: "delete",
                    payload: { index },
                    cb: () => Router('/todos')
                }

                reducer(action)
            }

            e.preventDefault();
        }

        //create a div to hold all the content inside
        var page = document.createElement('div')
        page.classList.add("delete-page")

        //create the heading from components
        const header = branding();
        page.append(header)

        let template = `
        <div>
            <h2>Delete Item?</h2>
            <ul class="todoSingle" data-key="${props.id}">
                <div class="todo-content">
                    <input type="text" class="todo-title" value="${props.title}" readonly></input>
                    <input type="text" class="todo-category" value="${props.category} Category" readonly></input>
                    <input type="text" class="todo-date" value="Due on ${props.endDate}" readonly></input>
                    <input type="text" class="todo-completed" value="Completed: ${props.isComplete}" readonly></input>
                </div>
            </ul>
        </div>
        `

        const content = makeElement(template)
        cancelButton.addEventListener('click', onCancelDelete)
        deleteButton.addEventListener('click', onRemoveTodo)
        const buttonDiv = document.createElement('div')
        buttonDiv.append(cancelButton, deleteButton)
        content.append(buttonDiv)
        page.append(content)

        return page
    }
}

export default deletePage