import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friends from "./Friends";
import Preloader from "../Common/Preloader/Preloader";
import {
  getCurrentPage,
  getIsFetching,
  getPageSize,
  getUsersFilter,
} from "../../Redux/componentsSelectors";
import { getFriendsThunkCreator } from "../../Redux/friendsReducer";
import { AppStateType } from "../../Redux/reduxStore";
import { ThunkDispatch } from "redux-thunk";


const FriendsContainer = () => {
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const isFetching = useSelector(getIsFetching);
  const filter = useSelector(getUsersFilter)
  const dispatch: ThunkDispatch<AppStateType, undefined, any> = useDispatch();

  useEffect(() => {
    dispatch(getFriendsThunkCreator(currentPage, pageSize,filter));
  }, [currentPage, pageSize,filter, dispatch]);
  return (
    <>
      {isFetching ? <Preloader /> : null}
      {!isFetching ? <Friends /> : null}
    </>
  );
};

export default FriendsContainer;
