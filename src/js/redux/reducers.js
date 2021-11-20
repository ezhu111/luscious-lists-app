import {getStore, updateStore} from './store'

function reducer (action){
    console.log(action);

    switch(action.type){
        case "delete": {
            const store = getStore()
            const index = action.payload.index;
            const newStore = [...store.slice(0,index), ...store.slice(index+1)]
            updateStore(newStore);
            action.cb()
            break;
        }
        case "edit": {
            const newTodo = action.payload.newTodo

            const store = getStore()
            const index = action.payload.index;
            const newStore = [...store.slice(0,index), store[index] = newTodo, ...store.slice(index+1)]
            updateStore(newStore);
            action.cb()
            break;
        }
        case "add": {
            const newTodo = action.payload.newTodo

            const store = getStore()
            const newStore = [...store, 
                newTodo]
            updateStore(newStore);
            action.cb()
            break;
        }
        default: return store
    }
}

export default reducer