import branding from "../../components/cards/branding"
import { getStore } from "../../redux/store"
import { Router } from "../../routes/router"
import makeElement from "../../utils/makeElement"
import button from "../../components/ui/button"
import reducer from "../../redux/reducers"

const cancelButton = button("cancelButton", "Cancel")
const editButton = button("editButton", "Confirm")

const editPage = function (props) {
    function cleanUp (){
        cancelButton.removeEventListener('click', onCancel)  
        editButton.removeEventListener('click', onConfirm) 
    }

    // redirect back to todos page if there is no data
    if (props == null) {
        cleanUp()
        Router('/todos')
    }
    else {
        function onCancel(e) {
            cleanUp()
            Router('/todos')
        }

        function onConfirm(e) {
            const index = getStore().findIndex(todo => todo.id === props.id)

            // this grabs the new values entered
            var category = document.querySelector('#category').value;
            var title = document.getElementById('title').value;
            var isComplete = document.getElementById('isComplete').checked;
            var startDate = document.getElementById('startDate').value;
            var startTime = document.getElementById('startTime').value;
            var endDate = document.getElementById('endDate').value;
            var endTime= document.getElementById('endTime').value;

            // PERFORM VALIDAITON
            // if any of these are undefined, don't allow user to continue
            if (!category || !title || !startDate || !startTime || !endDate || !endTime) {
                alert("You must fill in all fields before you can confirm your edit.")
            }
            // else, if the end date is before the start date 
            // OR the end date is on the same day as the start date, but the end time is before the start time
            else if (endDate < startDate || (endDate == startDate && endTime < startTime)) {
                alert("The end date for your todo item cannot be before your start date.")
            } else {
                var newTodo = {
                    "id": props.id,
                    "category": category,
                    "title": title,
                    "isComplete": isComplete,
                    "startDate": startDate,
                    "startTime": startTime,
                    "endDate": endDate,
                    "endTime": endTime
                }
                
                const action = {
                    type: "edit",
                    payload: { index, newTodo },
                    cb: () => Router('/todos')
                }
            
                reducer(action)
                cleanUp()
            }
        }

        //create a div to hold all the content inside
        var page = document.createElement('div')
        page.classList.add("edit-page")

        //create the heading from components
        const header = branding();
        page.append(header)

        let template = `
        <div>
            <h2>Edit Item</h2>
            <ul class="todoSingle" data-key="${props.id}">
                <div class="todo-content">
                    <label> Description
                        <input id="title" type="text" class="todo-title" value="${props.title}"></input>
                    </label>
                    <label> Category
                        <select id="category" value="${props.category}">
                            <option disabled selected value> -- Select a Category -- </option>
                            <option ${(props.category === "Home") ? `selected` : ``} value="Home">Home Category</option>
                            <option ${(props.category === "School") ? `selected` : ``} value="School">School Category</option>
                            <option ${(props.category === "Health") ? `selected` : ``} value="Health">Health Category</option>
                            <option ${(props.category === "Friends") ? `selected` : ``} value="Friends">Friends Category</option>
                            <option ${(props.category === "Work") ? `selected` : ``} value="Work">Work Category</option>
                        </select>
                    </label>
                    <label> Completed?
                        <input id="isComplete" type="checkbox" class="todo-completed" value="${props.isComplete}" ${(props.isComplete ? `checked` : ``)}></input>
                    </label>
                    <label> Start Date
                        <input id="startDate" type="date" class="todo-date" value="${props.startDate}"></input>
                    </label>
                    <label> Start Time
                        <input id="startTime" type="time" class="todo-date" value="${props.startTime}"></input>
                    </label>
                    <label> End Date
                        <input id="endDate" type="date" class="todo-date" value="${props.endDate}"></input>
                    </label>
                    <label> End Time
                        <input id="endTime" type="time" class="todo-date" value="${props.endTime}"></input>
                    </label>
                </div>
            </ul>
        </div>
        `

        const content = makeElement(template)
        cancelButton.addEventListener('click', onCancel)
        editButton.addEventListener('click', onConfirm)
        const buttonDiv = document.createElement('div')
        buttonDiv.append(cancelButton, editButton)
        content.append(buttonDiv)
        page.append(content)

        return page
    }
}

export default editPage