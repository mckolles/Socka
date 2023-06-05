import React, { useEffect, useState } from "react"
import s from "./Paginator.module.css"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentPage, getPageSize, getTotalFriendsCount } from "../../../Redux/componentsSelectors"
import { getFriendsThunkCreator } from "../../../Redux/friendsReducer"


export const Paginator:React.FC=()=>{

const portionSize=5
const totalItemsCount= useSelector(getTotalFriendsCount)
const pageSize= useSelector(getPageSize)
const currentPage=useSelector(getCurrentPage)
const dispatch=useDispatch()

const onPageChanged = (pageNumber: number) => {
  //@ts-ignore
  dispatch(getFriendsThunkCreator(pageNumber, pageSize, {
    term: '',
    friend: null
}));

}

let pagesCount=Math.ceil(totalItemsCount/pageSize)
let pages=[]
for (let i=1;i<=pagesCount;i++) {
  pages.push(i)
}
let portionCount=Math.ceil(pagesCount/portionSize)
let [portionNumber,setPortionNumber]=useState(1)
let leftPortionPageNumber=(portionNumber-1)*portionSize+1
let rightPortionPageNumber=portionNumber*portionSize
let arrowBack='<'
let arrowForward='>'
useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionSize)),[currentPage, portionSize] )

return <div className={s.paginator}>
    {portionNumber>1 &&<button onClick={()=>{setPortionNumber(portionNumber-1)}}>{arrowBack}</button> }
    {pages.filter(p=>p>=leftPortionPageNumber&&p<=rightPortionPageNumber).map((p)=>{ 
    return <span key={p} className={currentPage===p?s.selectedPage:""}
    onClick={(e)=>{onPageChanged(p)}}>{p}</span> 
    })}
    {portionCount>portionNumber&&<button onClick={()=>{setPortionNumber(portionNumber+1)}}>{arrowForward}</button>}
      </div>
    }