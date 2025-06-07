import React from 'react'
import {Container, Logo, LogoutBtn, AddPost} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Header = () => {
  const authStatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigate();

  const navItems = [
    {
      name : 'Home',
      slug : '/',
      active : true
    },
    {
      name : 'Login',
      slug : '/login',
      active : !authStatus,
    },
    {
      name : 'Sign Up',
      slug : '/signup',
      active : '!authStatus',
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
     },
   {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
   },
  ] 

  return (
    <header>
      <Container>
        <nav className='flex'>
          <div className='mr-4' style={{maxWidth : '30%'}}>
            <Link to='/'>
             <Logo width='70px'></Logo> 
            </Link>
          </div>
          <ul className='flex ml-auto mt-5'>
            {navItems.map((item)=>
            item.active ? (
              <li key={item.name}>
                <button
                onClick={()=> navigate(item.slug)}
                className='inline-block mt-5 px-6 py-2 duration-200 hover:bg-yellow-400 text-xl rounded-full'>
                  {item.name}
                </button>
              </li>
            ) : null
            )}
              {authStatus && (
              <li>
              <LogoutBtn></LogoutBtn>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header