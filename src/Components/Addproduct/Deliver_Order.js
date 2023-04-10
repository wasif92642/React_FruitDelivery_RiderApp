import React from 'react'
import { useEffect, useState } from 'react';
import { firedb } from "../../firebase";

import {
    collection,

    query,

    onSnapshot,
 
  } from "firebase/firestore";

function Deliver_Order() {

    const [Order, setOrder] = useState([]);


    useEffect(() => {
        const Order_Query = query(collection(firedb, "Order"));
        onSnapshot(Order_Query, (querySnapshot) => {
          setOrder(
            querySnapshot.docs.map((doc) => ({
              Order_id: doc.id,
              Order_data: doc.data(),
              Status: doc.data().Status,
            }))
          );
        });
      }, []);
    


  return (
    <div>


        {Order &&
          Order.map((doc) => {
            if (doc.Status == "Confirm") {
              return (
                <div
                  className="row Order_List"
                  style={{ backgroundColor: "lightpink" }}
                  id={doc.Order_id}
                >
                  <div className="col-1">
                    <p
                      id="O_l_p"
                      style={{
                        fontSize: "2rem",
                        fontWeight: "400",
                      }}
                    >
                      {doc.Order_id}{" "}
                    </p>
                  </div>
                  <div className="col-2">
                  <p id="O_l_p">{doc.Order_data.Person}</p>
                  </div>
                  <div className="col-1">
                  <p id="O_l_p">{doc.Order_data.Phone}</p>
                  </div>
                  <div className="col-2">
                  <p id="O_l_p">{doc.Order_data.Address}</p>
                  </div>
                  <div className="col-2">

                  <p id="O_l_p">
                    {doc.Order_data.Location}: {doc.Order_data.City}{" "}
                  </p>
                  </div>

                  
                  <button
                    type="button"
                    style={{ fontSize: "2rem" }}
                    onClick={() => {
                      Deliver_Order(doc.Order_id);
                    }}
                    id={doc.Order_id}
                  >
                    Deliver
                  </button>
                </div>
              );
            }
          })}{" "}

    </div>
  )
}

export default Deliver_Order
