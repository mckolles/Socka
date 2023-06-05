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


const FriendsContainer = () => {
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const isFetching = useSelector(getIsFetching);
  const filter = useSelector(getUsersFilter)
  const dispatch=useDispatch()

  useEffect(() => {
    //@ts-ignore
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
