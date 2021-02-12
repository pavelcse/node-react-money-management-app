import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {createTransactions} from '../../store/actions/transactionActions'

const customStyles = {
    content : {
        top                   : '40%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '50%'
    }
};

class CreateTransaction extends React.Component {
    state = {
        amount: 0,
        type: '',
        note: '',
        errors: {}
    }

    /*static getDerivedStateFromProps(nextProps, prevState) {
        if(JSON.stringify(nextProps.transactions.error) !== JSON.stringify(prevState.errors)) {
            return {
                errors: nextProps.transactions.error
            }
        }
        return null
    }*/

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault();
        let { amount, type, note } = this.state;
        this.props.createTransactions({ amount, type, note })
        this.setState({
            amount: 0,
            type: '',
            note: '',
            errors: {}
        })
        this.props.close()
    }

    render() {
        let { amount, type, note, errors } = this.state;
        return (
            <Modal
                style={customStyles}
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                contentLabel="Add A New Transaction"
            >
                <h4>Add A New Transaction</h4>
                <form onSubmit={this.submitHandler}>
                    <div className="from-group">
                        <label htmlFor="amount">Amount: </label>
                        <input
                            type="number"
                            className={errors.amount ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                            placeholder="Enter Amount"
                            name="amount"
                            id="amount"
                            value={ amount }
                            onChange={this.changeHandler}
                        />
                        {errors.amount && <div className="invalid-feedback">
                            {errors.amount}
                        </div>}
                    </div>

                    <div className="from-group">
                        <label htmlFor="type">Type: </label>
                        <select
                            name="type"
                            id="type"
                            value={ type }
                            onChange={this.changeHandler}
                            className={errors.type ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                        >
                            <option>Select A Type</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                        {errors.type && <div className="invalid-feedback">
                            {errors.type}
                        </div>}
                    </div>
                    <div className="from-group">
                        <label htmlFor="note">Note: </label>
                        <textarea
                            className={errors.note ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                            placeholder="Type Note"
                            name="note"
                            id="note"
                            onChange={this.changeHandler}
                        >{ note }</textarea>
                        {errors.note && <div className="invalid-feedback">
                            {errors.note}
                        </div>}
                    </div>
                    <div className="from-group d-flex justify-content-end">
                        <button className="btn btn-sm btn-success my-2">Add Transaction</button>
                    </div>
                </form>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    transactions: state.transactions
})

export default connect(mapStateToProps, {createTransactions})(CreateTransaction);