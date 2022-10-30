import React from "react";
import s from "../Friends/Friends.module.css"
import { NavLink } from "react-router-dom"
import * as axios from "axios";

let Friends =(props)=>{
 
    let pagesCount=Math.ceil(props.totalUsersCount/props.pageSize)
    let pages=[]
    for (let i=1;i<=pagesCount;i++) {
      pages.push(i)
    }

    return <div>
              <div className={s.pageNumbers}>
                {pages.map(p=>{ 
                  return <span className={props.currentPage===p?s.selectedPage:""}
                  onClick={(e)=>{props.onPageChanged(p)}}>{p}</span> 
                  })}
                
                 </div>
                 {
              props.friendsData.map((f) => (
                <div key={f.id}>
                  <span>
                    <div >
                      <NavLink to={"/Profile/"+f.id}>
                      <img className={s.photo} src={f.photos.small !=null?f.photos.small:
                        "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album"} alt="" />
                    </NavLink>
                    </div>
                    <div>
                        {f.followed?<button className={s.buttons} onClick={()=>
                        {
                          axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${f.id}`,
                          {
                            withCredentials:true,
                            headers:{
                              "API-KEY":"9921f9e2-fbe2-4ee1-8193-69b1e5488453"
                            }
                          }).then(response=>{
                            if (response.data.resultCode === 0){
                              props.unfollow(f.id)
                            }
                          })
                         }}>Unfollow</button>:
                        <button className={s.buttons} onClick={()=>
                          {
                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${f.id}`,{},
                           {
                              withCredentials:true,
                              headers:{
                                "API-KEY":"9921f9e2-fbe2-4ee1-8193-69b1e5488453"
                              }
                            }).then(response=>{
                              if (response.data.resultCode === 0){
                                props.follow(f.id)
                              }
                            })
                           }}>Follow</button>}
                      
                    </div>
                  </span>
                  <span>
                    <span>
                      <div>{f.name}</div>
                      <div>{f.status}</div>
                    </span>
                    <span>
                      <div>{"f.country"} {"f.city"}</div>
                    </span>
                  </span>
                </div>
              ))}
            </div>
}

export default Friends