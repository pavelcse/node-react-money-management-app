import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions/authActions';

class Home extends React.Component {
    render(){
        return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card card-body my-2">
                        <h1 className="text-center display-4">
                            Home
                        </h1>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Home);