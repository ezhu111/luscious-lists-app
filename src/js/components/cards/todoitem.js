import makeElement from "../../utils/makeElement"

const todoitem = function({id, title, category, isComplete, endDate}){
    const template = 
    `   <ul class="todoSingle" data-key="${id}">
            <div class="todo-color">
            </div>
            <div class="todo-content">
                <input type="text" class="todo-title" value="${title}" readonly></input>
                <input type="text" class="todo-category" value="${category} Category" readonly></input>
                <input type="text" class="todo-date" value="Due on ${endDate}" readonly></input>
                <input type="text" class="todo-completed" value="Completed: ${isComplete}" readonly></input>
            </div>
            <div class="todo-btn" data-key="${id}">
                <button class="btn" data-key="${id}"><i class="fas fa-edit"></i></i></button>
                <button id="deleteTodo" class="btn" data-key="${id}"><i class="fas fa-trash-alt"></i></button>
            </div>
        </ul>
    `;

    return makeElement(template)
}

export default todoitem;