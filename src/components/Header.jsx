import React from 'react'
import { Link } from 'react-router-dom';



function Header(props) {

  const addApplication = [
    {
      name: 'plus',
      pic: '../images/plus.svg',
      link: '/applicationForm'
    }
  ]
  const navBarLinks = [
    {
        id: 1,
        name: 'MyApplications',
        pic: '../images/applications.svg',
        link: '/home'

    },
    {
        id: 2,
        name: 'Community',
        pic: '../images/community_2.svg',
        link: '/community'
    },
    {
      id: 3,
      name: 'Leaderboard',
      pic: '../images/leaderboard.svg',
      link: '/leaderboard'


    },
    {
        id: 4,
        name: 'Profile',
        pic: '../images/person.svg',
        link: '/profile'
    },
    {
      id: 5,
      name: 'plus',
      pic: '../images/plus.svg',
      link: '/applicationForm'
    }
  ]
  return (
    <div className='top-0 h-13 p-4 w-full relative bg-dark-navy flex justify-between'>
        <h1 className='text-white text-3xl font-saira text-center my-auto'>{props.text}</h1>

        <div className='hidden md:flex gap-10'>
        {navBarLinks.map(({ id, link, pic, name }) => (
                <Link className=' flex-col' key={id} to={link}>
                        <div className="text-center active:bg-violet-100 rounded-full color-white">
                        <img src={pic} alt={name} className="mx-auto my-auto"/>
                        </div>
                </Link>
            ))}
        </div>




    </div>
    
  )
}

export default Header