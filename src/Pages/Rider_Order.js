import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav/Nav";
import "./Home_style.css";
import { auth, firedb } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import $ from "jquery";

function Rider_Order() {
  const nav = useNavigate();

  const [Recived_Order, set_Recived_Order] = useState([]);

  /*  useEffect(()=>{
       if(auth.currentUser.email == "ali913888@gmail.com"){
        nav("/adp");
       } 
       else{
        nav("/");
       }
    },[])
 */

  function details_Show() {
    $(".inner_details").toggle();
  }

  function getGoogleMapsLink(latitude, longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  function openGoogleMaps(latitude, longitude) {
    const googleMapsLink = getGoogleMapsLink(latitude, longitude);
    window.open(googleMapsLink , '_blank');
  }





  const Payment_Confirm = (Or_ID, OOID , dd) => {


    // Get a reference to the collection
const myCollectionRef = collection(firedb, 'Order');
const Rider_collection = collection(firedb , `Rider/${auth.currentUser.uid}/Order`);
// Create a query to get the document(s) to update
const q = query(myCollectionRef, where('Order_ID', '==', Or_ID));

// Update the document(s) that match the where clause
updateDoc(doc(myCollectionRef, OOID), {
  Payment_Status:"Paid"
}).then(() => {
  alert("Payment Successful");
  deleteDoc(doc( Rider_collection, dd));
})


.catch((error)=>{
  alert(error)
});


  };



  useEffect(() => {
    const Order_Query = query(
      collection(firedb, `Rider/${auth.currentUser.uid}/Order`)
    );

    onSnapshot(Order_Query, (querySnapshot) => {
      set_Recived_Order(
        querySnapshot.docs.map((doc) => ({
          Order_id: doc.id,
          Order_data: doc.data(),
          Status: doc.data().Status,
        }))
      );
    });
  }, []);

  return (
    <div className="Order_wrapper">
      <div className="row">
        <Nav />
      </div>
      <div className="row">
        {Recived_Order &&
          Recived_Order.map((item) => {
            
            return (
              <>
                <div className="row" id="Order_Container">
                  <div className="row">
                    <div className="col-12">
                     

                      <p id="CustomerName">{item.Order_data.Order.Person}</p>
                      <p>{item.Order_data.Order.Order_ID}</p>
                    </div>
                  </div>

                  <div className="row Customer_info">
                    <div className="col-12">
                      <p>{item.Order_data.Order.Phone}</p>
                      <p>
                        {item.Order_data.Order.Address +
                          " " +
                          item.Order_data.Order.Location}
                      </p>
                      <p>{item.Order_data.Order.Grand_Total}/RS</p>
                      <button
                        onClick={() => {
                          $("#" + item.Order_id + "inner_details").toggle();
                        }}
                      >
                        Details
                      </button>

                      <button
                        onClick={() => {
                          Payment_Confirm(item.Order_data.Order.Order_ID , item.Order_data.Order.OB_ID , item.Order_id)
                        }}
                      >
                        Payment
                      </button>

                         <button
                        id="Track_bt"
                        onClick={() => {
                          openGoogleMaps(
                            item.Order_data.Order.Cordinates.latitude,
                            item.Order_data.Order.Cordinates.longitude
                          );
                        }}
                      >
                        Track
                      </button>

                    </div>
                  </div>

                  <div className="row inner_details" id={item.Order_id+"inner_details"}>
                    <div className="col-12 header">
                      <p>ITEM</p>
                    
                      <p>Quantity</p>
                    </div>

                    {item.Order_data.Order.Items &&
                      item.Order_data.Order.Items.map((doc) => {
                        return (
                          <div className="col-12 header2">
                            <p>{doc.data.Name} </p>
                            <p>{doc.data.Quantity}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Rider_Order;
