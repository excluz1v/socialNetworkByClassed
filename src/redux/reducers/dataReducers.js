import { SET_SCREAMS, UNLIKE_SCREAM, LIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT } from './types'

const initialState = {
    screams: [],
    scream: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId)
            state.screams[index] = action.payload
            if (state.scream.screamId === action.payload.screamId) {
                let temp = state.scream.comments
                state.scream = action.payload
                state.scream.comments = temp
            }
            return { ...state }
        case DELETE_SCREAM:
            // index = state.screams.findIndex(scream => scream.screamId === action.payload)
            // state.screams.splice(index, 1)
            // return {
            //     ...state
            // }
            return {
                ...state,
                screams: state.screams.filter(scream => scream.screamId !== action.payload)
            }
        case POST_SCREAM:
            return {
                ...state,
                screams: [action.payload,
                ...state.screams]
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments]
                }
            }
        default: return state
    }


}