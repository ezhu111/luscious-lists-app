import branding from "../../components/cards/branding"
import { getStore } from "../../redux/store"
import { Router } from "../../routes/router"
import makeElement from "../../utils/makeElement"
import button from "../../components/ui/button"
import reducer from "../../redux/reducers"

const cancelButton = button("cancelButton", "Cancel")
const deleteButton = button("deleteButton", "Delete")

const editPage = function (props) {
    console.log(props);


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
            <h2>Edit Item</h2>
            <ul class="todoSingle" data-key="${props.id}">
                <div class="todo-content">
                    <label> Description
                        <input type="text" class="todo-title" value="${props.title}"></input>
                    </label>
                    <label> Category
                        <select value="${props.category}">
                            <option disabled selected value> -- Select a Category -- </option>
                            <option ${(props.category === "Home") ? `selected` : ``} value="Home">Home Category</option>
                            <option ${(props.category === "School") ? `selected` : ``} value="School">School Category</option>
                            <option ${(props.category === "Health") ? `selected` : ``} value="Health">Health Category</option>
                            <option ${(props.category === "Friends") ? `selected` : ``} value="Friends">Friends Category</option>
                            <option ${(props.category === "Work") ? `selected` : ``} value="Work">Work Category</option>
                        </select>
                    </label>
                    <label> Completed?
                        <input type="checkbox" class="todo-completed" value="${props.isComplete}" ${(props.isComplete ? `checked` : ``)}></input>
                    </label>
                    <label> Start Date
                        <input type="date" class="todo-date" value="${props.startDate}"></input>
                    </label>
                    <label> Start Time
                        <input type="time" class="todo-date" value="${props.startTime}"></input>
                    </label>
                    <label> End Date
                        <input type="date" class="todo-date" value="${props.endDate}"></input>
                    </label>
                    <label> End Time
                        <input type="time" class="todo-date" value="${props.endTime}"></input>
                    </label>
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

export default editPage