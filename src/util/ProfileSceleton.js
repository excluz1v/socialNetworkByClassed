import React from 'react'
import noImg from '../images/blank-profile-picture-973460_640.png'

import withStyles from '@material-ui/core/styles/withStyles'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import { Paper } from '@material-ui/core'

let styles = theme => (
    {
        ...theme.similar,
        handle: {
            height: 20,
            backgroundColor: theme.palette.primary.main,
            width: 60,
            margin: '0 auto 7px auto'
        },
        fullLine: {
            height: 16,
            backgroundColor: 'rgba(0,0,0, 0.6)',
            width: '80%',
            margin: '10px auto'
        }
    })



const ProfileSceleton = (props) => {
    const { classes } = props


    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className='image-wrapper'>
                    <img src={noImg} className='profile-image' alt='profile' />
                </div>
                <hr />
                <div className='profile-details'>
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine} />
                    <hr />
                    <div className={classes.fullLine} />
                    <hr />
                    <LocationOn color='primary' />location
                    <hr />
                    <LinkIcon color='primary' />https://website.com
                    <hr />
                    <CalendarToday color='primary' /> Joined date
                </div>
            </div>
        </Paper>
    )
}


export default withStyles(styles)(ProfileSceleton)