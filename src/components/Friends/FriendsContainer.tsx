import { connect } from "react-redux";
import React, { ComponentType } from "react";
import Friends from "./Friends";
import Preloader from "../Common/Preloader/Preloader";
import { compose } from "redux";
import { WithAuthNavigate } from "../../HOC/WithAuthNavigate";
import { getCurrentPage, getfriends, getPageSize, getTotalFriendsCount, getFollowingInProgres, getIsFetching } from "../../Redux/friendsSelectors";
import { FriendsDataType } from "../../Types/types";
import { AppStateType } from "../../Redux/reduxStore";
import { follow, unfollow, getFriendsThunkCreator } from "../../Redux/friendsReducer";


type MapStateProps = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalUsersCount: number;
  friendsData: Array<FriendsDataType>;
  followingInProgres: Array<number>;
  
};

type MapDispatchProps = {
  follow: (friendId: number) => void;
  unfollow: (friendId: number) => void;
  getFriendsThunkCreator: (currentPage: number, pageSize: number) => void;
 
};

type OwnPropsType = {
  onPageChanged:(pageNumber:number)=>void
};

export type PropsType = MapStateProps & MapDispatchProps & OwnPropsType;

export class FriendsContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getFriendsThunkCreator(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    this.props.getFriendsThunkCreator(pageNumber, this.props.pageSize);
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        {!this.props.isFetching ? (
          <Friends {...this.props} onPageChanged={this.onPageChanged}
          />
        ) : null}
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStateProps => {
  return {
    friendsData: getfriends(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalFriendsCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgres: getFollowingInProgres(state)
  };
};

export default compose<ComponentType>(
  connect<MapStateProps, MapDispatchProps, OwnPropsType, AppStateType>(mapStateToProps, {
    unfollow,
    follow,
    getFriendsThunkCreator
  }),
  WithAuthNavigate
)(FriendsContainer);
