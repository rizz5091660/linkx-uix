import {connect} from 'react-redux'
import * as actions from './Actions'

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        accountId:state.AccountUpdate.accountId,
        avatar:state.AccountUpdate.avatar
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onUpdateAccountClick: event => dispatch((actions.updateAccountIdTodo(event.target.value)))
    }
}

// Connected Component
const AccountInfoAction = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);

export default AccountInfoAction;