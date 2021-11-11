import branding from "../components/cards/branding"
import { getStore } from "../redux/store"
import todoItem from "../components/cards/todoitem.js"
import addToDo from "../components/cards/addToDo"
import todolist from "../components/cards/todolist"
import { Router } from "../routes/router"

const toDoPage = function(){

    function onDeleteTodo (e){
        const todoId = e.currentTarget.dataset.key
        const todoItem = getStore().filter((todo) => todo.id === todoId)
        Router('/delete', todoItem[0])
    }

    const todoList = getStore()

    //create a div to hold all the content inside
    var page = document.createElement('div')
    page.classList.add("todo-page")

    //create the heading from components
    const header = branding();
    page.append(header)

    //create a ul to hold the todoItems
    const ul = todolist();

    function render(){
        if(todoList !== null){
            const elements = todoList.map(todo => todoItem(todo))
            elements.forEach(element=> {
                element.querySelector('#deleteTodo').addEventListener('click', onDeleteTodo)
                ul.append(element)
            });

            page.append(ul)
        }
    }

    render()

    //footer for adding a to do
    page.append(addToDo())

    return page
}

export default toDoPage