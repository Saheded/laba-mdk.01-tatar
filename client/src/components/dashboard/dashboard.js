import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner.js';

const Dashboard = ({ auth: { user, loading } }) => {
    return loading === true ? <Spinner /> :
        <Fragment>
            <h1>Личный кабинет</h1>
            <p>
                <i className="fas fa-user"></i>
                Здравствуйте {user && user.name}
            </p>
            <Link to='/create-profile'>Перейти к постам</Link>
        </Fragment>
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);