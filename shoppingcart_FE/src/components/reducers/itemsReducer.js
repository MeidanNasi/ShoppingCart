
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, SEARCH_ITEMS } from '../actions/action-types/items-actions'
import axios from 'axios';



let initState = {
    items: [],
}

const itemsReducer = (state = initState, action)=>{
    switch(action.type){
        case GET_ITEMS: { // get all items
            return action.data
        }
        case ADD_ITEM: { // by admin
            axios.post('/items/create', action.item);
            return;
        }
        case DELETE_ITEM: { // by admin
            axios.delete('/items/delete', { params: { id: action.id }})
            return;
        }
        case SEARCH_ITEMS: { // by client
            return state.filter(item=> item.title.includes(action.search)) 
        }
        default: return state

    }
}
export default itemsReducer

