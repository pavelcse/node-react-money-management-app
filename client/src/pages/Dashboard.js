import React from 'react';
import { connect } from 'react-redux';
import { loadTransactions, deleteTransactions } from '../store/actions/transactionActions';
import CreateTransaction from '../components/transactions/CreateTransaction'
import UpdateTransaction from "../components/transactions/UpdateTransaction";

class Dashboard extends React.Component {
    state = {
        createModelOpen: false,
        updateModelOpen: false,
        id: ''
    }

    openCreateModal = () => {
        this.setState({
            createModelOpen: true
        })
    }

    closeCreateModal = () => {
        this.setState({
            createModelOpen: false
        })
    }

    openUpdateModal = (id) => {
        this.setState({
            updateModelOpen: true,
            id
        })
    }

    closeUpdateModal = () => {
        this.setState({
            updateModelOpen: false,
            id: ''
        })
    }

    componentDidMount() {
        this.props.loadTransactions()
    }

    render() {
        let { auth, transactions } = this.props;
        return (
            <div className="row justify-content-center">
                <div className="col-md-8 card card-body my-2">
                    <h1 className="text-center">Welcome { auth.user.name }</h1>
                    <p className="text-center">Your email is: { auth.user.email }</p>

                    <br/>
                    <h4 className="d-flex justify-content-between">Transactions: <button onClick={this.openCreateModal} className="btn btn-sm btn-success">Add New Transaction</button></h4>
                    {transactions.length > 0 ? <ul className='list-group'>
                        {
                            transactions.map(transaction => (
                                <li
                                    key={transaction._id}
                                    className={transaction.type === 'income' ? 'list-group-item list-group-item-success' : 'list-group-item list-group-item-danger'}
                                >
                                    <div className="row">
                                        <div className="col-md-10">
                                            <p>Type: { transaction.type.replace(/\b[a-z]/g, match => match.toUpperCase()) }</p>
                                            <p>Amount: { transaction.amount }</p>
                                        </div>
                                        {
                                            this.state.id === transaction._id
                                                ?
                                                <UpdateTransaction
                                                    isOpen={this.state.updateModelOpen}
                                                    close={this.closeUpdateModal}
                                                    transaction={transaction}
                                                />
                                                :
                                                ''
                                        }
                                        <div className="col-md-2 d-flex align-items-center">
                                            <button onClick={() => this.openUpdateModal(transaction._id)} className="btn btn-sm btn-info mx-2">Edit</button>
                                            <button onClick={() => this.props.deleteTransactions(transaction._id)} className="btn btn-sm btn-danger mx-2">Delete</button>
                                        </div>
                                    </div>

                                </li>
                            ))
                        }
                    </ul> : <p>There is no transaction</p>}

                    <CreateTransaction
                        isOpen={this.state.createModelOpen}
                        close={this.closeCreateModal}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})

export default connect(mapStateToProps, {loadTransactions, deleteTransactions})(Dashboard);