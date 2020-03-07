import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Paper, Typography, IconButton } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import dayJs from 'dayjs'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'

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
        }
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
        const formData = new FormData
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('image')
        fileInput.click()
    }
    render() {

        const { classes,
            user: { credentials:
                { handle, createdAt, imageUrl, bio, website, location },
                loading,
                authenticated
            }
        } = this.props

        let profileMarkUp = !loading ?
            (authenticated ?
                (<Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className='image-wrapper'>
                            <img src={imageUrl}
                                alt='profile'
                                className='profile-image' />
                            <input type='file' id='image' onChange={this.handleImageChange} hidden='hidden' />
                            <Tooltip title='edit profile picture' placement='top'>
                                <IconButton onClick={this.handleEditPicture} className='button'>
                                    <EditIcon color='primary'></EditIcon>
                                </IconButton>
                            </Tooltip>

                        </div>
                        <div className='profile-details'>
                            <MuiLink component={Link}
                                to={`/users/${handle}`}
                                color='primary'
                                variant='h5'>@{handle}
                            </MuiLink>
                            <hr />
                            {bio && <Typography variant={"body2"}>{bio}</Typography>}
                            <hr />
                            {location && <Fragment>
                                (<LocationOn color='primary'><span>{location}</span>
                                    <hr />
                                </LocationOn>)
                            </Fragment>}
                            {website && (<Fragment>
                                <LinkIcon color='primary' />
                                <a href={website} target='_blank' rel='noopener noreferrer'>
                                    {' '}
                                    {website}
                                </a>
                            </Fragment>)}
                            <CalendarToday color='primary' />
                            <span> Joined {dayJs(createdAt).format('MMM YYYY')}</span>
                        </div>
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
                )) : (<p>Loading </p>)
        return profileMarkUp
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Profile))
