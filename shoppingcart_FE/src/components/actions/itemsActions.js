import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, SEARCH_ITEMS } from './action-types/items-actions'
import axios from 'axios';


export function loadItems(){
    return(dispatch)=>{
        return axios.get('/items', null).then((response)=>{
            dispatch(getItems(response.data));
        })
    }
}
//get all items
export const getItems = (data)=>{
    return{
        type: GET_ITEMS,
        data
    }
}
// add one item to db
export const addItem = (item)=>{
    return{
        type: ADD_ITEM,
        item
    }
}
// delete specific item from db by its id
export const deleteItem = (id)=>{
    return{
        type: DELETE_ITEM,
        id
    }
}
// client search for items
export const searchItems = (search)=>{
    return{
        type: SEARCH_ITEMS,
        search
    }
}