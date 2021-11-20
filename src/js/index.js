
import {Router} from "./routes/router.js";
import { createStore} from "./redux/store";
import { dataFetcher } from "./utils/dataFetcher.js";
import keyGenerator from './utils/key'


const app = document.querySelector('#app')

const onAppInit = async function(e){
    let todos = await dataFetcher('./data/todos.json')

    if(todos[0].id === undefined || todos[0].id === null){
        todos = [...keyGenerator(todos)]
    }

    createStore(todos)
    Router(window.location.pathname)

}

window.addEventListener('load', onAppInit)