import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles, Dialog, DialogTitle, DialogContent, TextField } from '@material-ui/core'
import { postScream, clearErrors } from '../../redux/actions/dataActions'

const styles = theme => ({
    ...theme.similar,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        top: '10%',
        left: '90%'
    }
})

class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.props.clearErrors()
        this.setState({ open: false, errors: {} })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.postScream({ body: this.state.body })
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', open: false, errors: {} })
        }
    }
    render() {
        const { errors } = this.state
        const { classes, UI: { loading } } = this.props

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='post a scream'>
                    <AddIcon />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip='close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Post a new scream</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                type='text'
                                name='body'
                                label='Scream'
                                multiline
                                rows='3'
                                placeholder='your message'
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.TextField}
                                onChange={this.handleChange}
                                fullWidth />
                            <Button type='submit' variant='contained' color='primary' className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && <CircularProgress className={classes.progressSpinner} />}

                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment >
        )
    }


}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream))

