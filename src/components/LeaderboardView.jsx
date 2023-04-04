import React from 'react'
import { useEffect, useState } from 'react'
import * as DataInterface from './DataInterface'
import UploadToS3 from './UploadToS3';
import Pool from './UserPool'

function LeaderboardView() {
  const application = "../images/article.svg"
  const rejection = "../images/rejected.svg"

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [communityID, setCommunityID] = useState('');
  const [photoUrl, setPhotoUrl] = useState(null);
  const [rejectedAppCount, setRejectedAppCount] = useState(0);
  const [submittedAppCount, setSubmittedAppCount] = useState(0);
  const [currentranking, setcurrentranking] = useState(0);

  const [communityLeaderBoard, setcommunityLeaderBoard] = useState([]);


  const userID = DataInterface.getUserID();

  useEffect(() => {
    //Geting user Info
    const getUserInfo = async () => {
      const data = await DataInterface.getUser();
      if (!data) {
        return;
      }
      setUsername(data.userName)
      setEmail(data.email)
      setRejectedAppCount(data.rejectedAppCount)
      setSubmittedAppCount(data.submittedAppCount)
      setCommunityID(data.communityID)
      DataInterface.getUserImage().then((url) => {
        console.log(url);
        setPhotoUrl(url);
      }).catch((error) => {
        console.error('Error uploading file:', error);
      });
    }

    //Geting community Info
    const fetchData = async () => {
      const data = await DataInterface.getCommunityMembersRanking();
      console.log(data)
        setcommunityLeaderBoard(data);
        // console.log(Pool.getCurrentUser().getUsername() )
      };
      getUserInfo();
      fetchData();

      const getRanking = () => {
        communityLeaderBoard.map((user, index) => {
          if (user.userName == username) {
            setcurrentranking(index + 1)
          }
        })
      }
      getRanking();
    
      }, [userID]);


  const Leadboards = [
    {
      id: 1,
      name: 'Matthew',
      pic: '../images/pikachu.png',
      comment: '50th application anniversary! yaayy... end me.',
      applications: '50',
      rejections: '10',
      datetime: '2 hours ago'

    },
    {
      id: 2,
      name: 'Wendy',
      pic: '../images/person.svg',
      comment: 'Life is suffering..',
      applications: '200',
      rejections: '30',
      datetime: '2 hours ago'


    },
    // {
    //   id: 3,
    //   name: 'Gareth',
    //   pic: '../images/person.svg',
    //   comment: 'Mastercard is the best company ever!',
    //   applications: '1',
    //   rejections: '0',
    //   datetime: '2 hours ago'
    // },
    {
      id: 4,
      name: 'Deji',
      pic: '../images/person.svg',
      comment: 'Yeah, I got the job at LuluLemon!',
      applications: '500',
      rejections: '100',
      datetime: '2 hours ago'

    },
  ]


  return (
    <div className='h-screen bg-beige md:flex text-black'>


      {/* Top King of Applications and Rejections */}
      <div className=' flex flex-col rounded-lg md:pt-9 md:w-1/3 bg-slate-300 border-2'>
        
        <div className='flex flex-col gap-3 items-center justify-center'>
        <p className='text-4xl font-saira text-navy'>{username}</p>
          <div className='p-4'>
          <img className="mx-auto my-auto rounded-lg" src={photoUrl} alt={Leadboards[0].name}></img>

          </div>


          {/* Deets */}
          <div className='flex font-saira gap-3 items-center'>
            {/* Applications */}
            <p className='text-md flex'>
              <object className="mx-auto my-auto" type="image/svg+xml" data={application}></object>
              <p className='m-auto'>{submittedAppCount}</p>
            </p>


            {/* Rejection */}
            <p className='text-m flex'>
              <object className="mx-auto my-auto" type="image/svg+xml" data={rejection}></object>
              <p className='m-auto'>{rejectedAppCount}</p>
            </p>
          </div>
                      {/* Ranking */}
                      <p className='text-md font-saira text-navy text-xl'>Rank: {currentranking}</p>
        </div>
      </div>
      {/* Rankings Column */}
      <div className='flex flex-col md:w-2/3'>

      {/* Rankings */}
      <p className="text-4xl m-3 font-bold font-saira text-dark-navy text-center mt-10">Community Leaderboard:</p>

      {/* People Ranking List */}

      <div className="flex flex-col gap-2 overflow-y-scroll">
        {/* Each card */}
        {communityLeaderBoard.map(({ id, link, pic, userName, rejectedAppCount, submittedAppCount, datetime, comment }, index) => {
          return (
            <div className=" p-5 rounded-lg flex justify-between border-solid border-black border-1 bg-slate-200 mx-2" key={id}>
              <div className='flex gap-2 w-1/5'>
                <p className='text-navy m-auto font-saira md:text-4xl'>{index + 1}</p>
                <img src={"../images/person.svg"} alt="" className='grow' />
              </div>


              {/* Information */}
              <div className="flex flex-col grow">
                <p className="font-saira text-center">{userName}</p>
                <div className='information grow justify-evenly flex w-4/5 m-auto'>
                  <div className="flex">
                    <object className="mx-auto my-auto" type="image/svg+xml" data={application}></object>

                    <p className='m-auto font-saira'>
                      <span className='hidden md:block'>Applications:
                        </span> {submittedAppCount}</p>

                  </div>
                  <div className='flex'>
                    <object className="mx-auto my-auto" type="image/svg+xml" data={rejection}></object>
                    <p className='m-auto font-saira'>
                      <span className='hidden md:block'>
                      Rejections: 
                      </span>
                      {rejectedAppCount}</p>


                  </div>
                </div>

              </div>


            </div>

          )
        })}

      </div>
      </div>



    </div>
  )
}


export default LeaderboardView