import React from "react";
import { useEffect, useState } from "react";

export default function Get() {
  let [data, setData] = useState([]);
  let [name,setName]=useState();
  let [lname,setLname]=useState();
  let [empno,setEmpno]=useState();
  let [email,setEmail]=useState();
  let [userid,setUserId]=useState(null)


  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3000/customer").then((result) => {
      result.json().then((respone) => {
        console.log(respone[0].name);
        setData(respone);
        setName(respone[0].name)
        setLname(respone[0].lname)
        setEmpno(respone[0].empno)
        setEmail(respone[0].email)
        setUserId(respone[0].id)
        

      });
    });
  }

  const deleteHandler = (id) => {
    fetch(`http://localhost:3000/customer/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
      });
    });
    getData();
  };


  const updateHandler=(id)=>{

    let item=data[id-2]
    // console.log(data[id-2])
    setName(item.name)
        setLname(item.lname)
        setEmpno(item.empno)
        setEmail(item.email)
        setUserId(item.id)

  }

  const UpdateHandler=()=>{
    let data={name,empno,email,lname,userid}
     
    fetch(`http://localhost:3000/customer/${userid}`,{
      method:"PUT",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }).then((result)=>{
      result.json()
    })
    getData()
  }


  return (
    <div>
      <h1>Get Method</h1>
      <table border="1">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Lname</th>
            <th>Empno</th>
            <th>Email</th>
            <th colSpan={2}>Operation</th>
          </tr>

          {data.map((item, id) => (
            <tr key={id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.lname}</td>
              <td>{item.empno}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => deleteHandler(item.id)}>Delete</button>
              </td>
              <td>
              <button onClick={() => updateHandler(item.id)}>Update</button>
 
              </td>
            </tr>
          ))}
        </tbody>
      </table><br/> <br/>
      <div>
        <input type='text' value={name}  onChange={(e)=>setName(e.target.value)}/><br/><br/>
        <input type='text' value={lname} onChange={(e)=>setLname(e.target.value)}/><br/><br/>
        <input type='text' value={empno} onChange={(e)=>setEmpno(e.target.value)}/><br/><br/>
        <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/><br/><br/>
        <button  onClick={UpdateHandler}>Update</button>
      </div>
    </div>
  );
}
