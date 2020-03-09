import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit'
import { EditUserDetails } from '../redux/actions/userAction'
import MyButton from '../util/MyButton'

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        float: 'right'
    }
})

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }
    componentDidMount() {
        const { credentials } = this.props
        this.setUserDetailsToState(credentials)
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.setUserDetailsToState(this.props.credentials)
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.EditUserDetails(userDetails)
        this.handleClose()
    }

    setUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }
    render() {
        const { classes } = this.props
        return (
            <Fragment >
                <MyButton tip='Edit details' onClick={this.handleOpen} className={classes.button}>
                    <EditIcon color='primary' />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'>
                    <DialogTitle>Edit your Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name='bio'
                                type='text'
                                label='bio'
                                multiline
                                rows='3'
                                placeholder='A short bio about yourself'
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                            ></TextField>
                            <TextField
                                name='website'
                                type='text'
                                label='website'
                                placeholder='your personal website'
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth
                            ></TextField>
                            <TextField
                                name='location'
                                type='text'
                                label='location'
                                placeholder='your location'
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                            ></TextField>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>Cancel</Button>
                        <Button onClick={this.handleSubmit} color='primary'>Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    credentials: state.user.credentials
})

EditDetails.propTypes = {
    EditUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { EditUserDetails })(withStyles(styles)(EditDetails))