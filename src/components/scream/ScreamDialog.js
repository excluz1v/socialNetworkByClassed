import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, Grid, Typography, CircularProgress } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { connect } from 'react-redux'
import { getScream, clearErrors } from '../../redux/actions/dataActions'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import MyButton from '../../util/MyButton'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'

const styles = theme => ({
    ...theme.similar,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 100,
        height: 100,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    DialogContent: {
        overflow: 'auto',
        wordWrap: 'break-word'
    },
    closeButton: {
        position: "absolute",
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: '',
        getScreamData: false
    }
    componentDidMount() {
        if (this.props.openDialog && !this.state.getScreamData) {
            this.setState({ getScreamData: true });
            this.handleOpen();
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname
        const { userHandle, screamId } = this.props
        const newPath = `/users/${userHandle}/scream/${screamId}`
        if (oldPath === newPath) oldPath = `/users/${userHandle}`
        window.history.pushState(null, null, newPath)
        this.setState({ open: true, oldPath, newPath })
        this.props.getScream(this.props.screamId)
    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath)
        this.setState({ open: false, getScreamData: false })
        this.props.clearErrors()

    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.openDialog && !this.state.getScreamData) {
            this.setState({ getScreamData: true });
            this.handleOpen();
        }
    }

    render() {
        const { classes,
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                userImage,
                userHandle,
                comments },
            UI: { loading } } = this.props

        const dialogMarkUp = loading ?
            <div className={classes.spinnerDiv}>
                <CircularProgress size={100} thickness={2} />
            </div>

            : <Grid container spacing={6}>
                <Grid item sm={5}>
                    <img src={userImage} alt='profile' className={classes.profileImage} />
                </Grid>
                <Grid item sm={5}>
                    <Typography component={Link} color='primary' varian='h5' to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant='body2' color='textSecondary'>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId} />
                    {likeCount}
                </Grid>
                <CommentForm screamId={screamId} />
                <Comments comments={comments} />
            </Grid>
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='expand scream' btnClassName={classes.expandButton}>
                    <UnfoldMore color='primary' />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip='close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon className={classes.closeButton} />
                    </MyButton>
                    <DialogContent className={classes.DialogContent}>
                        {dialogMarkUp}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
})

export default connect(mapStateToProps, { getScream, clearErrors })(withStyles(styles)(ScreamDialog))