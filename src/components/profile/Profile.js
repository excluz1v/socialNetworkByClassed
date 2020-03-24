import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import dayJs from 'dayjs'
import EditIcon from '@material-ui/icons/Edit'
import { upLoadImage, logOut } from '../../redux/actions/userAction'
import KeyBoardReturn from '@material-ui/icons/KeyboardReturn'
import EditDetails from './EditDetails'
import MyButton from '../../util/MyButton'
import ProfileSceleton from '../../util/ProfileSceleton'


const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        },
        // '& button': {
        //     float: 'right'
        // }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
})


export class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        this.props.upLoadImage(formData)
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('image')
        fileInput.click()
    }
    handleLogout = () => {
        this.props.logOut()
    }
    render() {
        const {
            classes,
            user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkUp = !loading ?
            (authenticated ?
                (<Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className='image-wrapper'>
                            <img src={imageUrl}
                                alt='profile'
                                className='profile-image' />
                            <input type='file' id='image' onChange={this.handleImageChange} hidden='hidden' />
                            <MyButton tip='edit profile picture' onClick={this.handleEditPicture} btnClassName='button'>
                                <EditIcon color='primary'></EditIcon>
                            </MyButton>
                        </div>
                        <div className='profile-details'>
                            <MuiLink component={Link}
                                to={`/users/${handle}`}
                                color='primary'
                                variant='h5'>
                                @{handle}
                            </MuiLink>
                            <hr />
                            {bio && <Typography variant={"body2"}>{bio}</Typography>}
                            <hr />
                            {location && <Fragment>
                                <LocationOn color='primary'></LocationOn>
                                {location}
                            </Fragment>}
                            <hr />
                            {website && (<Fragment>
                                <LinkIcon color='primary' />
                                <a href={website} target='_blank' rel='noopener noreferrer'>
                                    {' '}
                                    {website}
                                </a>
                            </Fragment>)}
                            <hr />
                            <CalendarToday color='primary' />
                            <span> Joined {dayJs(createdAt).format('MMM YYYY')}</span>
                        </div>
                        <MyButton tip='Logout' onClick={this.handleLogout} >
                            <KeyBoardReturn color='primary' />
                        </MyButton>
                        <EditDetails />
                    </div>
                </Paper >) : (
                    <Paper className={classes.paper}>
                        <Typography variant='body2' align='center'>
                            No profile found, please login again
                        </Typography>
                        <div className={classes.buttons}>
                            <Button variant='contained'
                                color='primary'
                                component={Link}
                                to="/login">
                                Login
                               </Button>
                            <Button color='secondary'
                                variant='contained'
                                component={Link}
                                to="/signup">
                                Sign up
                        </Button>
                        </div>
                    </Paper>
                )) : <ProfileSceleton />
        return profileMarkUp
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    upLoadImage: PropTypes.func.isRequired

}

export default connect(mapStateToProps, { logOut, upLoadImage })(withStyles(styles)(Profile))
