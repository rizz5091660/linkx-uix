//Action Creator
export const updateAccountIdTodo = (accountId) => {
    return {
        type: 'updateAccountId',
        accountId: accountId
    }
}