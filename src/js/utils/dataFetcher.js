const dataFetcher = async function(url=null){

    const response = await fetch(url);      //fetch the data from the url
    const toDoJSON = await response.json()  //then convert to json data

    return toDoJSON                         //return json data
}

export {dataFetcher}