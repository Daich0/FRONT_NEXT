export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return {
                users: [...state.products, action.payload]
            }

            case 'EDIT_PRODUCT':
                return {
                    users: [...state.products, action.payload]
                }    
        case "DELETE_PRODUCT":
            return {
                users: state.users.filter(user => user.id !== action.payload),
            }
        default:
            return state
    }
}