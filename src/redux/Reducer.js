export default function CountReducer(state = {
    count: 0,
    wish_value: 0
}, action) {
    const count = state.count
    const wish_value = action.wish_value
    return state;
}