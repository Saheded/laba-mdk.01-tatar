import React, { Fragment, useState } from 'react';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const Register = ({ setAlert, register }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            setAlert('Пароли совпадают', 'success');
            register({ name, email, password });
        }
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Регистрация</h1>
            <p className='lead'><i className='fas fa-user'></i> Зарегистрируйте свой аккаунт</p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input type='text' placeholder='Name' name='name' value={name} onChange={e => onChange(e)} required />
                </div>
                <div className='form-group'>
                    <input type='email' placeholder='Email adress' name='email' value={email} onChange={e => onChange(e)} required />
                </div>
                <div className='form-group'>
                    <input type='password' placeholder='Password' name='password' minLength='6' value={password} onChange={e => onChange(e)} />
                </div>
                <div className='form-group'>
                    <input type='password' placeholder='Confirm Password' name='password2' minLength='6' value={password2} onChange={e => onChange(e)} />
                </div>
                <input type='submit' className='btn btn-primary' value='Зарегистрироваться' />
            </form>
            <p className='my-1'>
                Уже есть аккаунт? <a href='login.html'>Войти</a>
            </p>
        </Fragment>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}

export default connect(null, { setAlert, register })(Register);