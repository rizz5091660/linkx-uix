export default function AccountUpdate(state = {
        accountId:'',
        avatar:'',
    }, action) {
        const accountId = action.accountId
        switch (action.type) {
            case 'updateAccountId' :
                return {
                    accountId:accountId
                }
            default:
                return state
        }
    }