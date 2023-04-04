import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import * as DataInterface from './DataInterface'
import { useEffect } from 'react'
import Pool from './UserPool'

// import { getUserID } from './DataInterface'

function CommunityView() {

  const application = "../images/article.svg"
  const rejection =  "../images/rejected.svg"
  const [appCounter, setAppCounter] = useState(0)
  const [rejCounter, setRejCounter] = useState(0)
  const [communityData, setCommunityData] = useState([]);


  const userID = DataInterface.getUserID();

  useEffect(() => {
    const fetchData = async () => {
      const data = await DataInterface.getCommunityApplications();
      console.log(data)
      setCommunityData(data);
      // console.log(Pool.getCurrentUser().getUsername() )
    };
    fetchData();
    console.log(communityData)
  }, [userID]);
  
  return (
    <div className=' max-h-screen'>
      <div className='flex h-full flex-col gap-5 my-5' >
        {/* Counter */}
        <div className="counter flex font-saira text-xl gap-3 justify-center border-b-1 border-black">
          {/* <img src={application} alt="" /> */}
          <p className='my-auto'>Applications: 1320</p>
          {/* <img src={rejection} alt="" /> */}
          <p className='my-auto'>Rejections: 237</p>
        </div>
        {communityData.map(({ id, link, pic, userID, rejections, applications, datetime, comments }) => {
          return (
            // <Link className=' flex-col w-1/3' key={id} to={link}>

            // Each card
            <div className="mx-7 md:m-auto md:w-1/3 px-4 py-2 flex bg-slate-200 text-slate-500 rounded-lg shadow " key={id}>
              {/* Image */}
              <div className="text-center rounded-full max-w-md my-auto color-white">
                <object type="image/svg+xml" data={"../images/person.svg"} alt={userID}></object>
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center ml-5 grow">
                {/* Top row */}
                <div className="flex flex-row justify-between mb-2">
                  <div className="text-md font-saira font-bold">{userID}</div>
                  <div className="text-md font-salsa">{datetime}</div>
                </div>

                {/* Content */}
                <div className="text-md mb-2 font-salsa">{comments}</div>

                {/* Stats */}
                <div className="flex flex-row gap-1 justify-end">
                  <img className="my-auto" src={application} alt="application"></img>
                  <div className="text-black-slate-200 font-saira my-auto w-1/5"> {applications}</div>
                  <img className="my-auto" src={rejection} alt="rejection"></img>
                  <div className="text-black-slate-200 font-saira my-auto"> {rejections}</div>
                </div>
              </div>
            </div>
            // </Link>
          )
        })}
      </div>

    </div>
  )
}

export default CommunityView