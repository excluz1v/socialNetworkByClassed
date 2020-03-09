import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'


export class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    {authenticated ? (<Fragment>
                        <MyButton tip='post a scream'>
                            <AddIcon />
                        </MyButton>
                        <MyButton tip='home'>
                            <Link to='/'><HomeIcon /></Link>
                        </MyButton>
                        <MyButton tip='Notifications'>
                            <NotificationsIcon />
                        </MyButton>
                    </Fragment>)
                        : (< Fragment >
                            <Button color='inherit' component={Link} to='/login'>Login</Button>
                            <Button color='inherit' component={Link} to='/signup'>Signup</Button>
                            <Button color='inherit' component={Link} to='/'>Home</Button>

                        </Fragment >)

                    }
                </Toolbar >
            </AppBar >
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Navbar) 
