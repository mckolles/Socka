import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Friends from "./Friends";
import Preloader from "../Common/Preloader/Preloader";
import {
  getCurrentPage,
  getIsFetching,
  getPageSize,
  getUsersFilter,
} from "../../Redux/friendsSelectors";
import { getFriendsThunkCreator } from "../../Redux/friendsReducer";

const FriendsContainer = () => {
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const isFetching = useSelector(getIsFetching);
  const filter = useSelector(getUsersFilter)

  useEffect(() => {
    getFriendsThunkCreator(currentPage, pageSize,filter);
  }, [currentPage, pageSize,filter]);

  return (
    <>
      {isFetching ? <Preloader /> : null}
      {!isFetching ? <Friends /> : null}
    </>
  );
};

export default FriendsContainer;
