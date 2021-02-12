import React from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { register } from '../store/actions/authActions';

class Register extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        let { name, email, password, confirmPassword } = this.state;
        this.props.register({ name, email, password, confirmPassword }, this.props.history)
    }

    render(){
        let { name, email, password, confirmPassword, errors } = this.state;

        return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card card-body my-2">
                        <h1 className="text-center display-4">Register Here</h1>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group mb-2">
                                <label htmlFor="name">Name: </label>
                                <input
                                    type="text"
                                    className={errors.name ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                                    placeholder="Enter Your Name"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={this.changeHandler}
                                />
                                {errors.name && <div className="invalid-feedback">
                                    {errors.name}
                                </div>}
                            </div>

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
                                <label htmlFor="confirmPassword">Confirm Password: </label>
                                <input
                                    type="password"
                                    className={errors.confirmPassword ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                                    placeholder="Enter Confirm Password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={this.changeHandler}
                                />
                                {errors.confirmPassword && <div className="invalid-feedback">
                                    {errors.confirmPassword}
                                </div>}
                            </div>

                            <div className="form-group mb-2">
                                <input
                                    type="submit"
                                    className="btn btn-sm btn-success"
                                    value="Register"
                                />
                                <Link className="mx-3" to="/login">Already Have An Account? Login Now</Link>
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

export default connect(mapStateToProps, {register})(Register);