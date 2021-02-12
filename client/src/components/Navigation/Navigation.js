import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';

class Navigation extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/" exact>Money Management</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink className="nav-link" activeClassName="active" to="/" exact>Home</NavLink>
                        </li>
                        {
                            this.props.auth.isAuthenticated
                                ?
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="active" to="/dashboard">Dashboard</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={ () => this.props.logout(this.props.history) } className="btn btn-sm btn-danger">Logout</button>
                                    </li>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink>
                                    </li>
                                </React.Fragment>
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(withRouter(Navigation));