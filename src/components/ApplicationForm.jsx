import React from 'react'
import * as DataInterface from './DataInterface'
import {useState, useEffect} from 'react';
import { JobPositions } from './DataInterface';
import { useNavigate } from "react-router-dom";
import Pool from "./UserPool";

// import { userNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';


function ApplicationForm() {
    const navigate = useNavigate();
    const userID = Pool.getCurrentUser().getUsername();

  //Date Variable
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");
  const [comments, setComments] = useState("");

  const { v4: uuidv4 } = require('uuid');

  const jobPosition = JobPositions;

  // let navigate = useNavigate();

  //function to set the days
  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push(<option key={i} value={i}>{i}</option>);
  }

  //function to set the months
  const months = [
    <option key="01" value="01">January</option>,
    <option key="02" value="02">February</option>,
    <option key="03" value="03">March</option>,
    <option key="04" value="04">April</option>,
    <option key="05" value="05">May</option>,
    <option key="06" value="06">June</option>,
    <option key="07" value="07">July</option>,
    <option key="08" value="08">August</option>,
    <option key="09" value="09">September</option>,
    <option key="10" value="10">October</option>,
    <option key="11" value="11">November</option>,
    <option key="12" value="12">December</option>
  ];

  //function to set the years
  const years = [];
  for (let i = 1900; i <= new Date().getFullYear(); i++) {
    years.push(<option key={i} value={i}>{i}</option>);
  }

  const statusOptions = [
    { value: 'applied', label: 'Applied' },
    { value: 'interview-invitation', label: 'Interview Invitation' },
    { value: 'interviewed', label: 'Interviewed' },
    { value: 'offered', label: 'Offered' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
  ];

  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date(`${year}-${month}-${day}`);
    const formattedDate = date.toISOString().substring(0,10);
    setDateApplied(formattedDate);
    const communityID = uuidv4();

    const applicationData = {
      companyName: companyName,
      dateApplied: dateApplied,
      applicationStatus: applicationStatus,
      jobPosition: position,
      comments: comments,
      communityID: communityID,
      userID: userID,
      username: userID
    }
    console.log(DataInterface.getUser())

    
    await DataInterface.createApplication(applicationData).then((response) => {
      console.log(response);
    });
    await DataInterface.incrementSubmittedAppCount();
    navigate('/home');
  }

  return (
    
<form onSubmit={handleSubmit} className="h-screen m-2 p-2 ">
  <div className="form-row">
    <div className="form-label">Company Name</div>
    <input type="text" id="companyName" placeholder="Enter company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)}  style={{ height: "50px", backgroundColor: "#F5F8FA", border: "none", borderRadius: "9999px", padding: "0 20px" }} />
  </div>

  <div className="form-row">
    <div className="form-label">Position</div>
    <select id="position" value={position} onChange={(e) => setPosition(e.target.value)} style={{ height: "50px", backgroundColor: "#F5F8FA", border: "none", borderRadius: "9999px", padding: "0 20px" }}>
      <option value="" >Select Position:</option>
      {Object.values(jobPosition).map((option) =>(
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
  
  <div className="date-row">
    <div className="form-label">Date Applied</div>
    <div className="date-selectors">
      <select id="day" value={day} onChange={(e) => setDay(e.target.value)} style={{ height: "50px", backgroundColor: "#F5F8FA", border: "none", borderRadius: "9999px", padding: "0 20px", marginRight: "5px" }}>
        {days}
      </select>
      <select id="month" value={month < 10 ? "0" + month : month} onChange={(e) => setMonth(e.target.value)} style={{ height: "50px", backgroundColor: "#F5F8FA", border: "none", borderRadius: "9999px", padding: "0 20px", marginRight: "5px" }}>
        {months}
      </select>
      <select id="year" value={year} onChange={(e) => setYear(e.target.value)} style={{ height: "50px", backgroundColor: "#F5F8FA", border: "none", borderRadius: "9999px", padding: "0 20px", marginRight: "5px" }}>
        {years}
      </select>
    </div>
  </div>

  <div className="form-row">
    <div className="form-label">Application Status</div>
    <select id="applicationStatus" value={applicationStatus} onChange={(e) => setApplicationStatus(e.target.value)} style={{ height: "50px", backgroundColor: "#F5F8FA", border: "none", borderRadius: "9999px", padding: "0 20px" }}>
      <option value="">Choose Application Status</option>
      {statusOptions.map((option) =>(
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>

  <div className="form-row">
    <div className="form-label">Comments</div>
    <input type="text" id="comments" placeholder="Enter comments" value={comments} onChange={(e) => setComments(e.target.value)} style={{ height: "100px", backgroundColor: "#F5F8FA", border: "none", borderRadius: "10px", padding: "10px" }} />
  </div>


      <div className="button-row">
        <button type="button">Cancel</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
  
}

export default ApplicationForm