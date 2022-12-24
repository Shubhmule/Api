import React, { useState } from "react";

export default function Post() {
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [empno, setEmpno] = useState("");
  const [email, setEmail] = useState("");

   const savedataHandler=()=>{
    console.log(name,lname,empno,email)
    let data={name,lname,empno,email}

    fetch("http://localhost:3000/customer",{
        method:"POST",
        headers:{
            'Accept':"application/json",
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }).then((result)=>{
        result.json().then((resp)=>{
            console.log(resp)
        }

        )
    })

   }

  return (
    <div>
      <h1>Post Method</h1>
      <label>Name :</label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name" /> <br /> <br />
      <label>lname :</label>
      <input type="text" value={lname} onChange={(e)=>setLname(e.target.value)} name="lname" /> <br /> <br />
      <label>Empno :</label>
      <input type="text" value={empno} onChange={(e)=>setEmpno(e.target.value)} name="Empno" /> <br /> <br />
      <label>Email :</label>
      <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} name="Email" /> <br /> <br />
      <button type="button" onClick={savedataHandler}>Save Data</button>
    </div>
  );
}
