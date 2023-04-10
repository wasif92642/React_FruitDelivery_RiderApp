import "./Nav_style.css";
import $ from "jquery";

import React, {useState, useContext, useEffect} from "react";
import {auth, db} from "../../firebase";
import {signOut} from "firebase/auth";
import {AuthContext} from "../../Context/AuthContext";
import {useNavigate, Link} from "react-router-dom";
import {firedb} from "../../firebase";

import {
    collection,
    doc,
    onSnapshot,
    query,
    deleteDoc,
    increment,
    updateDoc,
    getDoc
} from "firebase/firestore";
import logo from "../../Images/logo2.png";
import { async } from "@firebase/util";

function Nav() {
    const {currentUser, logOut} = useContext(AuthContext);

    const [tasks, setTasks] = useState([]);

    const [user_id, setid] = useState(currentUser.uid);

    const [item_id, set_Item_id] = useState("");

    const navigate = useNavigate();

    function Navshow() {
        $("#md_nav  ").toggle();
    }

    function Cart_show() {
        $(".cart_row").toggle();
    }

    function Profile_show() {
        $(".Profile_row").toggle();
    }

    const Log_out = async () => {
     
        await logOut();

            navigate("/");
            sessionStorage.clear();
    };



    const Item_increas = async (e)=>{


        const userRef = doc(firedb, "Cart", currentUser.uid);
        const todosRef = collection(userRef, "Items");
    
        const current_item = doc(todosRef, e);

          try {
            const doc_snap = await getDoc(current_item);
            const count = doc_snap.data().Quantity;
            const price = doc_snap.data().Price;
            

                await updateDoc(doc(todosRef, e), {
                    Quantity : increment(1),
                   
                });
            
            console.log("Increament  updated successfully");
          } catch (error) {
            console.error("Error updating : ", error);
          }


    }


    const Item_decreas = async (e)=>{

        const userRef = doc(firedb, "Cart", currentUser.uid);
        const todosRef = collection(userRef, "Items");
        const current_item = doc(todosRef, e);



          try {

            const doc_snap = await getDoc(current_item);
            const count = doc_snap.data().Quantity;
            const price = doc_snap.data().Price;
            

            if (count > 1) {
                await updateDoc(doc(todosRef, e), {
                    Quantity : increment(-1),
                    Total:count*price,
                });
            
                console.log("Count decremented successfully");
              } else {
                console.log("Count is already zero");
              }


           
          
            console.log("Decreast item updated successfully");
          } catch (error) {
            console.error("Error updating : ", error);
          }


    }



    const Check_out = () => {
        return navigate("/Cart");
    };

    useEffect(() => {
        if (currentUser) {
            const q = query(collection(firedb, `Cart/${user_id}/Items`));
            onSnapshot(q, (querySnapshot) => {
                setTasks(querySnapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})));
            });
        } else {
            navigate("/");
        }
    }, [setTasks]);

    const Delet_Item = async () => {
        const taskDocRef = doc(firedb, `Cart/${user_id}/Items`, item_id);
        try {
            deleteDoc(taskDocRef);
        } catch (err) {
            alert(err);
        }
    };

    if (currentUser) {
        return (
            <>
                <div className="row Nav_container">
                   

                       <div className="col-4 logo_col">
                       <Link to="/"
                            style={
                                {textDecoration: "None"}
                        }>  <h1 id="Logo_name" > RIDER</h1></Link>

                    <p id="icon"
                        onClick={Navshow}>
                        <i class="fa-solid fa-bars"/>
                    </p>
                 
                </div>

                <div className="col-7" id="md_nav">
                    <ul className="ul" id="hh">
                        <Link to="/RiderOrder"
                            style={
                                {textDecoration: "None"}
                        }>
                            {" "}
                            <li>Order-Recived</li>
                        </Link>
                        
                        <Link to="/"
                            style={
                                {textDecoration: "None"}
                        }>
                            {" "}
                            <li>Payment</li>
                        </Link>
                      
                         
                          
                            <li onClick={()=>{Log_out()}}>Logout</li>
                        

                       
                </ul>
            </div>
        </div>
    </>
        );
    } else {
        navigate("/");
    }
}

export default Nav;
