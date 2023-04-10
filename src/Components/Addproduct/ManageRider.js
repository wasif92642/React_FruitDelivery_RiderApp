import React, { useEffect } from "react";
import axios from 'axios';
import "./Rider_Style.css";
import { auth , firedb} from "../../firebase";
import {createUserWithEmailAndPassword, setCustomUserClaims , getUserByEmail , deleteUser  } from "firebase/auth";
import { useState } from "react";
import { addDoc, collection,query,onSnapshot  } from "firebase/firestore";
import $ from "jquery"
import { async } from "@firebase/util";

function ManageRider() {


  

  const [Rider, setRider] = useState([]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [password, setPassword] = useState("");


const del_user = async(email , object)=>{
  const response = await axios.post('http://192.168.0.109:3000/del', {
    email,object
  }).then(()=>{

    alert("done")

  }).catch((error)=>{
    alert(error)
  })
}




  const createUser = async (email, password, displayName) => {
    
      const response = await axios.post('http://192.168.0.109:3000/users', {
        email,
        password,
        Phone,
        name
      }).then(()=>{
        alert("succesfull")
      }).catch((error)=>{
        alert(error)
      })

    }

        


  
 

  useEffect(() => {
    const Order_Query = query(collection(firedb, 'Rider'));
    onSnapshot(Order_Query, (querySnapshot) => {
      setRider(
        querySnapshot.docs.map((doc) => ({
          Rider_Id:doc.id,
          Rider_data: doc.data(),
     
        }))
      );
    });
  }, []);
  


  
  return (
    <>
     <div className="row">
      <div className="col-3">
      <form onSubmit={()=>{createUser(email,password,name)}} id="Rider_Form">
      <input type="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        
        <input type="number" value={Phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone-No" />

        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>

        <button type="submit">Register</button>
      </form> 
      </div>


      <div className="col-9 Rider_details">
        <div className="row">
          <h1>Rider-Details</h1>
        </div>

      
        {Rider &&
          Rider.map((doc) => {
         
              return (
                <div className="Rider_list" id={doc.Rider_Id}>
                  
                  <p id="RI">{doc.Rider_data.name}</p>
                  <p id="RI">{doc.Rider_data.Phone}</p>

                  <p id="RI">{doc.Rider_data.email}</p>

                  <p id="RI">{doc.Rider_data.password}</p>

                  <button
                    type="button"
                    onClick={()=>{del_user(doc.Rider_data.email, doc.Rider_Id)}}
                    id="Rider_Remove"
                  >
                    Remove
                  </button>
                    </div>
            );}
            )
            }
       

      </div>




    
      </div>
      </>
  );
    
}

export default ManageRider;
