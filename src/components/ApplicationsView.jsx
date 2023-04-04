import React, { useState, useEffect } from "react";
import * as DataInterface from './DataInterface'
import Pool from "./UserPool";

function ApplicationsView() {

  const [applicationData, setApplicationData] = useState([]);

  const userID = DataInterface.getUserID();
  // Changed this to new user
  const newUserID = Pool.getCurrentUser().getUsername();


  useEffect(() => {
    const fetchData = async () => {
      const data = await DataInterface.getApplications(newUserID);
      console.log(data)
      setApplicationData(data);
      console.log(Pool.getCurrentUser().getUsername())
    };
    fetchData();
  }, [userID]);


  return (
    <div className="rounded-lg shadow p-5 h-screen bg-beige">

      <div className="counter mb-1 flex font-saira text-xl gap-3 justify-center border-b-1 border-black">
        <p className='my-auto font-saira'>Applications: {applicationData.length}</p>
        <p className='my-auto font-saira'>Rejections: 0</p>
      </div>
      <br></br>


      <div className="flex flex-col md:grid grid-cols-4 gap-4">

        {applicationData.map(data => (
          <div key={data.id} className="mb-4 border p-3 bg-slate-200 rounded-lg">
            <div>
              <p className="text-gray-600 mb-2 text-xl font-saira">
                {data.companyName}
              </p>
              <p className="flex flow-grow justify-between text-gray-600 mb-2 font-salsa">
                Date Applied: <span></span> {new Date(data.dateApplied.seconds * 1000).toLocaleString()}
              </p>
              <p className="flex text-gray-600 mb-2 font-salsa justify-between">
                Status: <span className="ml-10"></span>{data.applicationStatus}
              </p>
              <p className="text-gray-600 mb-2 font-salsa">
                Job Position: <span className="ml-10"></span>{data.jobPosition}
              </p>
              <br className="divider"></br>
              <p className="text-gray-600 mb-0 font-salsa font-bold">
                Comments: <div className="ml-10"></div>{data.comments}
              </p>
              <br></br>
            </div>
          </div>

        ))}


      </div>
    </div>
  );
}

export default ApplicationsView;