import React, { Component } from 'react'
import axios from 'axios'
import Scream from '../components/scream/Scream'
import Grid from '@material-ui/core/Grid'
import { getUserInfo } from '../redux/actions/dataActions'
import { connect } from 'react-redux'
import StaticProfile from '../components/profile/StaticProfile'
import ProfileSceleton from '../util/ProfileSceleton'

class User extends Component {
    state = {
        profile: null,
        screamIdParam: null
    }

    componentDidMount() {
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;

        if (screamId) this.setState({ screamIdParam: screamId });

        this.props.getUserInfo(handle);
        axios
            .get(`/user/${handle}`)
            .then((res) => {
                this.setState({
                    profile: res.data.user
                });
            })
            .catch((err) => console.log(err));
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.match !== this.props.match) {
            const screamId = nextProps.match.params.screamId;
            if (screamId)
                this.setState({ screamIdParam: screamId, openDialog: true });
        }
    }
    render() {
        const { screams, loading } = this.props.data
        const { screamIdParam } = this.state
        const screamsMarkup = loading ?
            <ProfileSceleton /> :
            screams === null ?
                (<p>No screams from user</p>)
                : !screamIdParam ? screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
                    : (
                        screams.map(scream => {
                            if (scream.screamId !== screamIdParam) {
                                return <Scream key={scream.screamId} scream={scream} />
                            } else return <Scream key={scream.screamId} scream={scream} openDialog />
                        })
                    )
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {!this.state.profile ?
                        <p>Loading profile</p>
                        : <StaticProfile profile={this.state.profile} />}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getUserInfo })(User)