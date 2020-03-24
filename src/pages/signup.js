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
import { signUpUser } from '../redux/actions/userAction'
import { connect } from 'react-redux';


const styles = (theme) => ({
    ...theme.similar
})



export class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            loading: true
        })
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.password,
            handle: this.state.handle
        }
        this.props.signUpUser(newUserData, this.props.history)
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
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
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="email"
                            autoComplete='email'
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
                            autoComplete="current-password"
                            className={classes.TextField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                            helperText={errors.password}
                            error={errors.password ? true : false} >
                        </TextField>
                        <TextField id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="current-password"
                            label="confirm Password"
                            className={classes.TextField}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false} >
                        </TextField>
                        <TextField id="handle"
                            name="handle"
                            autoComplete="username"
                            type="text"
                            label="Handle"
                            className={classes.TextField}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth
                            helperText={errors.handle}
                            error={errors.handle ? true : false} >
                        </TextField>
                        {errors.error && (<Typography
                            variant='body2'
                            className={classes.CustomError}>
                            Wrong credentials, please try again
                        </Typography>)}
                        <Button type="submit"
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            disabled={loading}>
                            Signup
                            {loading && (<CircularProgress className={classes.progress}></CircularProgress>)}
                        </Button>
                        <br />
                        <small>Already have an account ? login  <Link to='/login'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        )
    }
}

signup.propType = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    Ui: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signUpUser })(withStyles(styles)(signup)) 
