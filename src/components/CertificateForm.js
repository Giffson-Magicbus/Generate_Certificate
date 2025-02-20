import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { setCertificate } from "../redux/certificateSlice";



const CertificateForm = () => {

 const [name, setName] = useState("");

 const [course, setCourse] = useState("");
 const [from, setFrom] = useState("");
 const [to, setTo] = useState("");

 const dispatch = useDispatch();

 const navigate = useNavigate();



 const handleSubmit = (e) => {

  e.preventDefault();

  dispatch(setCertificate({ name, course, from, to }));

  navigate("/certificate");

 };
 const dateFormet = (e) => {
    const date = new Date (e.target.value);
    let name = e.target.name;
    let formetted = date.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric'}).replace(',', '');   
    
    name === 'from' ? setFrom(formetted) : setTo(formetted)
 }



 return (

  <div className="flex flex-col items-center justify-center min-h-screen">

   <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">

    <h2 className="text-2xl font-bold mb-4 text-center">Magic Bus India Foundation</h2>

    <input

     type="text"

     placeholder="Enter Name"

     value={name}

     onChange={(e) => setName(e.target.value)}

     className="w-full px-3 py-2 border rounded-md mb-2"

    />

    {/* <input

     type="text"

     placeholder="Enter Course"

     value={course}

     onChange={(e) => setCourse(e.target.value)}

     className="w-full px-3 py-2 border rounded-md mb-2"

    /> */}
    <select name="course" id="" className="w-full px-3 py-2 border rounded-md mb-2" onChange={(e) => setCourse(e.target.value)}>
        <option value="" disabled selected>Select your course Type</option>
        <option value="Advanced Web & UI/UX Design">Advanced Web & UI/UX Design</option>
        <option value="AWS re-Start">AWS re-Start</option>
        <option value="Azure">Azure</option>
    </select>
    <div className="flex item-center gap-10 my-4">
    <input type="date"  name="from" id="from"  className="w-full px-4 py-2" onChange={dateFormet} />
    <input type="date"  name="to" id="to"  className="w-full px-4 py-2" onChange={dateFormet}/>
    </div>

    <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">Generate Certificate</button>

   </form>

  </div>

 );

};



export default CertificateForm;