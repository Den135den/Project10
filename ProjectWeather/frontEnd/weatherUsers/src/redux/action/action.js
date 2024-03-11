export function addUserFirstPage(index){
    return{
        type: 'ADD_USER',
        payload: index
    }
}


export function removeUserFirstPage(index){
    console.log(index)
    return{
        type: 'REMOVE_USER',
        payload: index
    }
}

