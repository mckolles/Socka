import friendsReducer, { InitialStateType, actions } from "./friendsReducer";


let state: InitialStateType;

beforeEach(() => {
    state = {
        friendsData: [
            {
                id: 0, name: 'Dimych 0', followed: false,
                photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 1, name: 'Dimych 1', followed: false,
                photos: {small: null, large: null}, status: 'status 1'
            },
            {
                id: 2, name: 'Dimych 2', followed: true,
                photos: {small: null, large: null}, status: 'status 2'
            },
            {
                id: 3, name: 'Dimych 3', followed: true,
                photos: {small: null, large: null}, status: 'status 3'
            },
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgres: []
    }
})

test('follow success', () => {
    const newState = friendsReducer(state, actions.followSucess(1))

    expect(newState.friendsData[0].followed).toBeFalsy();
    expect(newState.friendsData[1].followed).toBeTruthy();
})

test('unfollow success', () => {
    const newState = friendsReducer(state, actions.unFollowSucess(3))

    expect(newState.friendsData[2].followed).toBeTruthy();
    expect(newState.friendsData[3].followed).toBeFalsy();
})