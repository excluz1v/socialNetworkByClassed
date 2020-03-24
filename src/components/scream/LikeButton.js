import React, { Component } from 'react'
import MyButton from '../../util/MyButton'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../../redux/actions/dataActions'

class LikeButton extends Component {
    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId))
            return true
        else return false
    }
    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId)
    }
    render() {
        const likeButton = !this.props.user.authenticated ? (
            <Link to='/login'>
                <MyButton tip='Like'>
                    <FavoriteBorder color='primary' />
                </MyButton>
            </Link>)
            : (this.likedScream() ? (
                <MyButton tip='undo like' onClick={this.unlikeScream}>
                    <FavoriteIcon color='primary' />
                </MyButton>
            )
                : (<MyButton tip='undo like' onClick={this.likeScream}>
                    <FavoriteBorder color='primary' />
                </MyButton>)
            )

        return likeButton
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { likeScream, unlikeScream })(LikeButton)