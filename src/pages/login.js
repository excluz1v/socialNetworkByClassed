import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import Img from '../images/personal.png'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userAction'

const styles = (theme) => ({
    ...theme.similar
})



export class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }

    }
    render() {

        const { classes, UI: { loading } } = this.props
        const { errors } = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <img title="Freepik" src={Img} alt='logo' className={classes.image} />
                    <Typography variant='h3' className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="email"
                            className={classes.TextField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                            helperText={errors.email}
                            error={errors.email ? true : false} >
                        </TextField>
                        <TextField id="password"
                            name="password"
                            type="password"
                            label="password"
                            className={classes.TextField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                            helperText={errors.password}
                            error={errors.password ? true : false} >
                        </TextField>
                        {errors.general && (<Typography
                            variant='body2'
                            className={classes.CustomError}>
                            Wrong credentials, please try again
                        </Typography>)}
                        <Button type="submit"
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            disabled={loading}>
                            Login
                            {loading && (<CircularProgress className={classes.progress}></CircularProgress>)}
                        </Button>
                        <br />
                        <small>Don`t have an account ? sign up  <Link to='/signup'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        )
    }
}

login.propType = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(login))
