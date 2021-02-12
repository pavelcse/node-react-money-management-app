import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {updateTransactions} from '../../store/actions/transactionActions'

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

class UpdateTransaction extends React.Component {
    state = {
        amount: 0,
        note: '',
        errors: {}
    }

    componentDidMount() {
        this.setState({
            amount: this.props.transaction.amount,
            note: this.props.transaction.note
        })
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.updateTransactions(this.props.transaction._id, this.state)
        this.props.close()
    }

    render() {
        let { amount, note } = this.state;
        return (
            <Modal
                style={customStyles}
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                contentLabel="Update Transaction"
            >
                <h4>Update Transaction</h4>
                <form onSubmit={this.submitHandler}>
                    <div className="from-group">
                        <label htmlFor="amount">Amount: </label>
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Enter Amount"
                            name="amount"
                            id="amount"
                            value={ amount }
                            onChange={this.changeHandler}
                        />
                    </div>

                    <div className="from-group">
                        <label htmlFor="note">Note: </label>
                        <textarea
                            className="form-control form-control-sm"
                            placeholder="Type Note"
                            name="note"
                            id="note"
                            onChange={this.changeHandler}
                        >{ note }</textarea>
                    </div>
                    <div className="from-group d-flex justify-content-end">
                        <button className="btn btn-sm btn-success my-2">Update Transaction</button>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default connect(null, {updateTransactions})(UpdateTransaction);