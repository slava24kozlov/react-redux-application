import React, {useState} from 'react'
import Preloader from "../common/Preloader/Preloader";
import photoUser from '../../image/photoUser.png'
import style from './Users.module.scss'
import {NavLink} from "react-router-dom";

const Users = (props) => {
  const [value, setValue] = useState('');
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return (
    <div>
      <div className={style.pagesList}>
        {pages.map(page =>
          <span key={page} className={props.currentPage === page ? style.currentPage : null}
                onClick={() => props.onChangeCurrentPage(page)}>{page} </span>)}
      </div>
      {props.isFetching ? <Preloader/> : (
        <>
          <label style={{fontWeight: 'bold'}}>Enter a search name:</label>
          <input type="text" value={value} onChange={setValue} placeholder="enter a search name"/>
          <div className={style.usersMain}>
            {props.users.map(el =>
              <div key={el.id} className={style.userItem}>
                <section className={style.userHead}>
                  <NavLink to={`/profile/${el.id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <img src={el.photos.small != null ? el.photos.small : photoUser} alt='user avatar'/>
                  </NavLink>
                  <div>
                    {el.followed
                      ? <button
                        disabled={props.isFollowing.some(user => user === el.id)}
                        onClick={() => props.unfollow(el.id)}
                      >
                        UNFOLLOW
                      </button>
                      : <button
                        disabled={props.isFollowing.some(user => user === el.id)}
                        onClick={() => props.follow(el.id)}
                      >
                        FOLLOW
                      </button>}
                  </div>
                </section>
                <NavLink className={style.userInformation} to={`/profile/${el.id}`}
                         style={{textDecoration: 'none', color: 'black'}}>
                  <p><b>Name: </b>{el.name}</p>
                  <p><b>Status: </b>{el.status}</p>
                </NavLink>
              </div>
            )}
          </div>
        </>
      )}
    </div>);
}

export default Users;