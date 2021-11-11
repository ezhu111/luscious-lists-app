let store = null

// Create the store accessed by all our app components
function createStore (data=[]){
    if(store === null){
        store = [...data]
    }
    return null
}

function getStore (){
    return store
}

function updateStore(newStore){
    store = [...newStore]
}

export {createStore, getStore, updateStore}