import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {login} from '../store/actions/authActions'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errors: {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.errors)) {
            return {
                errors: nextProps.auth.error
            }
        }
        return null
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault();
        let { email, password } = this.state;
        this.props.login({ email, password }, this.props.history)
    }

    render(){
        let { email, password, errors } = this.state;

        return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card card-body my-2">
                        <h1 className="text-center display-4">Login Here</h1>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group mb-2">
                                <label htmlFor="email">Email: </label>
                                <input
                                    type="email"
                                    className={errors.email ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                                    placeholder="Enter Your Email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={this.changeHandler}
                                />
                                {errors.email && <div className="invalid-feedback">
                                    {errors.email}
                                </div>}
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="password">Password: </label>
                                <input
                                    type="password"
                                    className={errors.password ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                                    placeholder="Enter Your Password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={this.changeHandler}
                                />
                                {errors.password && <div className="invalid-feedback">
                                    {errors.password}
                                </div>}
                            </div>

                            <div className="form-group mb-2">
                                <input
                                    type="submit"
                                    className="btn btn-sm btn-success"
                                    value="Login"
                                />

                                <Link className="mx-3" to="/register">Don't Have An Account? Register Now</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {login})(Login);