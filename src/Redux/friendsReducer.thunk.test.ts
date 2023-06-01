import { ApiResponseType, ResultCodesEnum } from "../Api/Api";
import { friendsApi } from "../Api/FriendsApi";
import { actions, follow, unfollow } from "./friendsReducer";


jest.mock('../Api/FriendsApi')
const userAPIMock = friendsApi as jest.Mocked<typeof friendsApi>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.followFriendAPI.mockClear();
    userAPIMock.unfollowFriendAPI.mockClear();
})


const result: ApiResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}






test('success follow thunk', async () => {
    userAPIMock.followFriendAPI.mockReturnValue(Promise.resolve(result));
    const thunk = follow(1);
  
    await thunk(dispatchMock, getStateMock, {});
  
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgres(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSucess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgres(false, 1));
  });
  
  test('success unfollow thunk', async () => {
    //@ts-ignore
    userAPIMock.unfollowFriendAPI.mockReturnValue(Promise.resolve(result));
    const thunk = unfollow(1);
  
    await thunk(dispatchMock, getStateMock, {});
  
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgres(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollowSucess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgres(false, 1));
  });
  