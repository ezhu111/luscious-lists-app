import branding from "../components/cards/branding"
import { getStore } from "../redux/store"
import todoItem from "../components/cards/todoitem.js"
import addToDo from "../components/cards/addToDo"
import todolist from "../components/cards/todolist"
import { Router } from "../routes/router"

const toDoPage = function(){

    function cleanUp (){
        const todos = document.querySelectorAll('ul') 
        todos.forEach((todo)=>{
            todo.removeEventListener('click', onDeleteTodo)
            todo.removeEventListener('click', onEditTodo)
        })
    }

    function onDeleteTodo (e){
        const todoId = e.currentTarget.dataset.key
        const todoItem = getStore().filter((todo) => todo.id === todoId)
        cleanUp()
        Router('/delete', todoItem[0])
    }

    function onEditTodo (e){
        const todoId = e.currentTarget.dataset.key
        const todoItem = getStore().filter((todo) => todo.id === todoId)
        cleanUp()
        Router('/edit', todoItem[0])
    }

    function onAddTodo (e){
        cleanUp()
        Router('/add')
    }

    const todoList = getStore()

    //create a div to hold all the content inside
    var page = document.createElement('div')
    page.classList.add("todo-page")

    //create the heading from components
    const header = branding();
    page.append(header)

    //create footer
    const footer = addToDo()
    
    //create a ul to hold the todoItems
    const ul = todolist();

    function render(){
        if(todoList !== null){
            const elements = todoList.map(todo => todoItem(todo))
            elements.forEach(element=> {
                // if the todo item is completed, then give it a unique class to change the text color
                if (element.children[1].children[3].value.slice(11) === "true") {
                    element.children[1].children[3].classList.add("complete")
                }

                element.querySelector('#editTodo').addEventListener('click', onEditTodo)
                element.querySelector('#deleteTodo').addEventListener('click', onDeleteTodo)
                ul.append(element)
            });

            page.append(ul)
        }
    }

    render()

    //append footer
    footer.querySelector('#addTodo').addEventListener('click', onAddTodo)
    page.append(footer)

    return page
}

export default toDoPage