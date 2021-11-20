import keyGenerator from 'uuid'

import branding from "../../components/cards/branding"
import { getStore } from "../../redux/store"
import { Router } from "../../routes/router"
import makeElement from "../../utils/makeElement"
import button from "../../components/ui/button"
import reducer from "../../redux/reducers"

const cancelButton = button("cancelButton", "Cancel")
const addButton = button("addButton", "Confirm")

const addPage = function () {
    //generate new Id
    newId = keyGenerator().substr(0,8);

    function cleanUp (){
        cancelButton.removeEventListener('click', onCancel)  
        addButton.removeEventListener('click', onConfirm) 
    }

    function onCancel(e) {
        cleanUp()
        Router('/todos')
    }

    function onConfirm(e) {
        // this grabs the new values entered
        var category = document.getElementById('category').value;
        var title = document.getElementById('title').value;
        var isComplete = document.getElementById('isComplete').checked;
        var startDate = document.getElementById('startDate').value;
        var startTime = document.getElementById('startTime').value;
        var endDate = document.getElementById('endDate').value;
        var endTime= document.getElementById('endTime').value;

        // PERFORM VALIDAITON
        // if any of these are undefined, don't allow user to continue
        if (!category || !title || !startDate || !startTime || !endDate || !endTime) {
            alert("You must fill in all fields before you can add a new todo.")
        }
        // else, if the end date is before the start date 
        // OR the end date is on the same day as the start date, but the end time is before the start time
        else if (endDate < startDate || (endDate == startDate && endTime < startTime)) {
            alert("The end date for your todo item cannot be before your start date.")
        } else {
            newTodo = {
                "id": newId,
                "category": category,
                "title": title,
                "isComplete": isComplete,
                "startDate": startDate,
                "startTime": startTime,
                "endDate": endDate,
                "endTime": endTime
            }

            const action = {
                type: "add",
                payload: { newTodo },
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
        <h2>Add Item</h2>
        <ul class="todoSingle">
            <div class="todo-content">
                <label> Description
                    <input id="title" type="text" class="todo-title"></input>
                </label>
                <label> Category
                    <select id="category">
                        <option disabled selected value> -- Select a Category -- </option>
                        <option value="Home">Home Category</option>
                        <option value="School">School Category</option>
                        <option value="Health">Health Category</option>
                        <option value="Friends">Friends Category</option>
                        <option value="Work">Work Category</option>
                    </select>
                </label>
                <label> Completed?
                    <input id="isComplete" type="checkbox" class="todo-completed" ></input>
                </label>
                <label> Start Date
                    <input id="startDate" type="date" class="todo-date" ></input>
                </label>
                <label> Start Time
                    <input id="startTime" type="time" class="todo-date" ></input>
                </label>
                <label> End Date
                    <input id="endDate" type="date" class="todo-date" ></input>
                </label>
                <label> End Time
                    <input id="endTime" type="time" class="todo-date" ></input>
                </label>
            </div>
        </ul>
    </div>
    `

    const content = makeElement(template)
    cancelButton.addEventListener('click', onCancel)
    addButton.addEventListener('click', onConfirm)
    const buttonDiv = document.createElement('div')
    buttonDiv.append(cancelButton, addButton)
    content.append(buttonDiv)
    page.append(content)

    return page
}

export default addPage