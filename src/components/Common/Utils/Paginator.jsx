import React from "react"
import s from "./Paginator.module.css"

export const Paginator=(props)=>{

let pagesCount=Math.ceil(props.totalUsersCount/props.pageSize)
let pages=[]
for (let i=1;i<=pagesCount;i++) {
  pages.push(i)
}

return <div className={s.pageNumbers}>
  {pages.map(p=>{ 
    return <span className={props.currentPage===p?s.selectedPage:""}
    onClick={(e)=>{props.onPageChanged(p)}}>{p}</span> 
    })}
      </div>
    }