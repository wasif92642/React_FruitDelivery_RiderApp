import React, { useContext, useEffect, useState } from "react";
import useFirestore from "../../Components/hooks/useFirestore";
import $ from "jquery";

import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  where,
  setDoc,
} from "firebase/firestore";

import { firedb } from "../../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import "./Add_Pro_style.css";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ManageRider from "./ManageRider";

const AddProduct = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [productName, setProductName] = useState(null);
  const [productPrice_raw, setProductPrice_raw] = useState(0);
  const [productPrice_chop, setProductPrice_chop] = useState(0);
  const [productPrice_Deal, setProductPrice_Deal] = useState(0);
  const [item_grandtotal, set_item_grandTotal] = useState(0);
  const [Category, setCategory] = useState("de");
  const [Product_type, set_type] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [Order, setOrder] = useState([]);
  const [Rider_data, set_Rider] = useState([]);
  const[Selected_Rider , set_Selected_Rider] = useState(null);
  const[Select_Rider_Id , set_Rider_Id] = useState(null);
  const [idd, setid] = useState("");
  const { currentUser, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  let abc = [];

  const imagesListRef = ref(storage, "images/");

  const Log_out = async () => {
    await logOut();

    navigate("/login");
    sessionStorage.clear();
  };

  const uploadFile = () => {
    if(Category == "de"){
      alert("Select a category");
    }
    else if(Category == "Fruits" || Category == "Vegitable"){

      



    
    if(productName === null || Product_type === null || imageUpload == null || productPrice_chop <=1 || productPrice_raw <=1) {
      if(productPrice_chop <=-1 || productPrice_raw <=-1){
        alert("Price Must be Positive");
      }
      else{
      alert("Fill All Information");
      }
    }

    else{
    const myCollectionRef = collection(firedb, Category);
    const q = query(myCollectionRef, where("ProductName", "==", productName));

  

    const imageRef = ref(storage, `images/fruits/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);

        if (Category == "deals") {
          getDocs(q).then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              // no matching documents found, insert the new data
              addDoc(myCollectionRef, {
                ProductName: productName,
                productPrice_Deal: Number(productPrice_Deal),
                ProductImg: url,
                Product_Type: Product_type,
              }).then(() => {
                console.log("Data inserted successfully!");
              });
            } else {
              // matching documents found, do not insert the new data
              window.alert("Product already exists With Same Name!");
            }
          });
        } else {
          getDocs(q).then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              // no matching documents found, insert the new data
              addDoc(myCollectionRef, {
                ProductName: productName,
                ProductPrice_Raw: Number(productPrice_raw),
                ProductPrice_Chop: Number(productPrice_chop),
                Product_Type: Product_type,
                ProductImg: url,
              }).then(() => {
                console.log("Data inserted successfully!");
              });
            } else {
              // matching documents found, do not insert the new data
              window.alert("Product already exists With Same Name!");
            }
          });
        }
      });
    });
  }




    }

    else if(Category == "deals"){
      



    
    if(productName === null || Product_type === null || imageUpload == null ||productPrice_Deal <=1) {
      if(productPrice_Deal <=-1){
        alert("Price Must be Positive");
      }
      else{
      alert("Fill All Information");
      }
    }

    else{
    const myCollectionRef = collection(firedb, Category);
    const q = query(myCollectionRef, where("ProductName", "==", productName));

  

    const imageRef = ref(storage, `images/fruits/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);

        if (Category == "deals") {
          getDocs(q).then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              // no matching documents found, insert the new data
              addDoc(myCollectionRef, {
                ProductName: productName,
                productPrice_Deal: Number(productPrice_Deal),
                ProductImg: url,
                Product_Type: Product_type,
              }).then(() => {
                console.log("Data inserted successfully!");
              });
            } else {
              // matching documents found, do not insert the new data
              window.alert("Product already exists With Same Name!");
            }
          });
        } else {
          alert("Something went wrong")
        }
      });
    });
  }


    }

  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  });

  const handleDelete = async () => {
    const taskDocRef = doc(firedb, Category, idd);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  const Reject = (e) => {
    const docRef = doc(firedb, "Order", e);

    const data = {
      Status: "Reject",
    };

    setDoc(docRef, data, { merge: true })
      .then((docRef) => {
        console.log("Order Has Rejected");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const Recived_Order = (e) => {
    const docRef = doc(firedb, "Order", e);

    const data = {
      Status: "Recived",
    };

    setDoc(docRef, data, { merge: true })
      .then((docRef) => {
        console.log("Order Has Confirm");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const Confirm_Order = (e) => {
    const docRef = doc(firedb, "Order", e);

    const data = {
      Status: "Confirm",
    };

    setDoc(docRef, data, { merge: true })
      .then((docRef) => {
        alert("Order Has Confirm");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const Deliver_Order = (Order , e , Rider_id) => {

    const docRef = doc(firedb, "Order", e);

    const parentDocRef = doc(firedb, 'Rider', Rider_id );


    const subCollectionRef = collection(parentDocRef, 'Order');



    const data = {
      Status: "Deliver",
    };

    if(Selected_Rider !=  null){

      setDoc(doc(subCollectionRef), {
          Order:Order
      } , { merge: true })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.log("Error adding document: ", error);
        });



    setDoc(docRef, data, { merge: true })
      .then((docRef) => {
        alert("Order Has Deliver");
      })
      .catch((error) => {
        alert(error);
      });



      alert("all set")
    }


    else{
      alert("Select Rider First");
    }
  };

  function chos() {
    let a = document.getElementById("chose_category").value;
    setCategory(a);
    alert(Category);
  }

  function details_Show() {
    $(".details").toggle();
  }

  useEffect(() => {
    const q = query(collection(firedb, Category));
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
          Status: doc.data().Status,
        }))
      );
    });

    if (Category == "deals") {
      document.getElementById("Price_section_deal").style.display = "block";
      document.getElementById("Price_section").style.display = "None";
    } else {
      document.getElementById("Price_section_deal").style.display = "None";
      document.getElementById("Price_section").style.display = "block";
    }
  }, [Category]);

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


 

  useEffect(() => {
    for (let i = 0; i < Order.length; i++) {
      if (Order[i].Status == "Recived") {
        document.getElementById(Order[i].Order_id).style.backgroundColor =
          "rgb(105, 225, 89)";
      } else if (Order[i].Status == "Pending") {
        document.getElementById(Order[i].Order_id).style.backgroundColor =
          "rgb(243, 106, 106)";
      } else if (Order[i].Status == "Deliver") {
        document.getElementById(Order[i].Order_id).style.backgroundColor =
          "rgb(103, 203, 233)";
      }
    }
  }, [Order]);

  useEffect(() => {
    const Order_Query = query(collection(firedb, "Rider"));
    onSnapshot(Order_Query, (querySnapshot) => {
      set_Rider(
        querySnapshot.docs.map((doc) => ({
          Rider_id: doc.id,
          Rider_data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="admin_wrapper">
      <div className="row nav_row_admin">
        <div className="col-3">
          <h1>Admin Panel</h1>
        </div>
        <div className="col-9 Admin_ul">
          <ul>
            <a href="#pg1">
              <li>Add Product</li>
            </a>

            <a href="#pg2">
              <li>Recive Order</li>
            </a>

            <a href="#pg3">
              <li>Deliver Order</li>
            </a>
            <a href="#pg4">
              <li>Order History</li>
            </a>

            <a href="#pg5">
              <li>Manage Rider</li>
            </a>

            <a
              onClick={() => {
                Log_out();
              }}
            >
              <li>Logout</li>
            </a>
          </ul>
        </div>
      </div>

      <div className="row Add_pd_col" id="pg1">
        <div className="col-3">
          <div className="col-12">
            <label>Category:</label>
            <select
              onClick={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="Fruits">Fruits</option>
              <option value="Vegitable">Vegitable</option>
              <option value="deals">deals</option>
            </select>
          </div>

          <div className="col-12">
            <input
              placeholder="Product-Name"
              type="text"
              require
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
          </div>

          <div className="col-12">
            <select
              onClick={(e) => {
                set_type(e.target.value);
              }}
            >
              <option selected="selected" disabled="disabled">
                SELECT TYPE
              </option>
              <option>Both</option>
              <option>Raw</option>
            </select>
          </div>

          <div className="col-12" id="Price_section">
            <label htmlFor="product-price">Raw Price</label>

            <input
              type={"number"}
              required
              onChange={(e) => setProductPrice_raw(e.target.value)}
              value={productPrice_raw}
              min="0"
            />

            <label htmlFor="product-price">Chop Price</label>

            <input
              type="number"
              required
              onChange={(e) => setProductPrice_chop(e.target.value)}
              value={productPrice_chop}
              min="0"
            />
          </div>

          <div className="col-12" id="Price_section_deal">
            <label htmlFor="product-price">Deal Price</label>

            <input
              type={"number"}
              required
              onChange={(e) => setProductPrice_Deal(e.target.value)}
              value={productPrice_Deal}
              min="0"
            />
          </div>

          <div className="col-12">
            <label htmlFor="product-img">Product Image</label>
            <button
              type="Button"
              onClick={() => {
                document.getElementById("brows").click();
              }}
              id="Img_bt_add"
            >
              Select Img
            </button>
            <input
              type="file"
              placeholder="Insert Image"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
              id="brows"
            />
          </div>

          <div className="col-12">
            <img src={imageUrls} width="70%" height="50%"></img>
          </div>

          <div className="col-12">
            <button onClick={uploadFile} id="bb" type="button">
              {" "}
              Add Product
            </button>
          </div>

          {/* <img src={imageUrls}></img> */}
        </div>

        <div className="col-9 Product_screen">
          <div className="row">
            <h1>Active Products</h1>
          </div>
          {tasks &&
            tasks.map((doc) => {
              if(Category == "deals"){
                return(
                  <div className="admin_item_card">
                <img
                  src={doc.data.ProductImg}
                  style={{
                    width: "10rem",
                    height: "10rem",
                    marginLeft: "4rem",
                    marginTop: "1rem",
                  }}
                />

                <p>Name: {doc.data.ProductName}</p>
          
                <p>Deal/Price: {doc.data.productPrice_Deal}</p>
                <p>
                  <sub>ID: {doc.id}</sub>
                </p>

                <button
                  id="del"
                  onMouseEnter={(e) => {
                    setid(doc.id);
                  }}
                  onClick={handleDelete}
                >
                  Remove
                </button>
              </div>
                )
              }
              else{
              return(
              <div className="admin_item_card">
                <img
                  src={doc.data.ProductImg}
                  style={{
                    width: "10rem",
                    height: "10rem",
                    marginLeft: "4rem",
                    marginTop: "1rem",
                  }}
                />

                <p>Name: {doc.data.ProductName}</p>
                <p>Raw/Price: {doc.data.ProductPrice_Raw}</p>
                <p>Chop/Price: {doc.data.ProductPrice_Chop}</p>
                <p>Deal/Price: {doc.data.productPrice_Deal}</p>
                <p>
                  <sub>ID: {doc.id}</sub>
                </p>

                <button
                  id="del"
                  onMouseEnter={(e) => {
                    setid(doc.id);
                  }}
                  onClick={handleDelete}
                >
                  Remove
                </button>
              </div>
              )}
                })}{" "}
        </div>
      </div>

      {/* ===========================================================Order Page Start ================================ */}

      <div className="row Order_row" id="pg2">
        <div className="row Header_order">
          <div className="col-1">
            <p>ID:</p>
          </div>

          <div className="col-2">
            <p>Name</p>
          </div>
          <div className="col-1">
            <p>Phone#</p>
          </div>
          <div className="col-2">
            <p>Address:</p>
          </div>
          <div className="col-2">
            <p>Location:</p>
          </div>
        </div>
        {Order &&
          Order.map((doc) => {
            if (doc.Status == "Pending" || doc.Status == "Recived") {
              return (
                <>
                  <div className="row Order_List" id={doc.Order_id}>
                    <div className="col-1">
                      <p id="O_l_p">{doc.Order_id}</p>
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
                      onClick={() => {
                        $("#" + doc.Order_id + "inner_details").toggle();
                      }}
                      id="Admin_bt"
                    >
                      Show_Details
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        Recived_Order(doc.Order_id);
                      }}
                      id="Admin_bt"
                    >
                      Recived
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        Confirm_Order(doc.Order_id);
                      }}
                      id="Admin_bt"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        Reject(doc.Order_id);
                      }}
                      id="Admin_bt"
                    >
                      Reject
                    </button>

                    <div
                      className="row details"
                      id={doc.Order_id + "inner_details"}
                    >
                      {doc.Order_data.Items &&
                        doc.Order_data.Items.map((e) => {
                          return (
                            <div className="row item_details_admin">
                              <div className="col-2 idm">{e.id}</div>

                              <div className="col-1 idm">{e.data.Name}</div>

                              <div className="col-1 idm">{e.data.Type}</div>

                              <div className="col-1 idm">{"Price = " + e.data.Price}</div>

                              <div className="col-1 idm">{"QTY : " + e.data.Quantity}</div>

                              <div className="col-1 idm">
                                {e.data.Quantity * e.data.Price}
                              </div>
                            </div>
                          );
                        })}
                      <div
                        className="col-12"
                        style={{
                          fontSize: "2rem",
                          paddingLeft: "75%",
                          boxSizing: "border-box",
                        }}
                      >
                        {"Total : " + doc.Order_data.Grand_Total}{" "}
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          })}{" "}
      </div>

      {/* ================================================= Page 3 =============================== */}

      <div className="row Order_row" id="pg3">
        {/* <div className="Header_order" style={{ backgroundColor: "orange" }} >


                    <p style={{ padding: "0rem 10rem 0rem 10rem" }}>ID:</p>
                    <p style={{ padding: "0rem 6rem 0rem 6rem" }}>Name</p>
                    <p style={{ padding: "0rem 6rem 0rem 6rem" }}>Phone#</p>

                    <p style={{ padding: "0rem 6rem 0rem 6rem" }}>Address:</p>

                    <p>Location:</p>



                </div> */}
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
                        fontFamily:'aller_lite'
                      }}
                    >
                      {doc.Order_id}{" "}
                    </p>
                  </div>
                  <div className="col-2">
                    <p id="O_l_p">{doc.Order_data.Person}</p>
                  </div>
                  <div className="col-2">
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
                      <div className="col-2 bt_sec">
                  <select id="Rider_Selection">
                    {Rider_data &&
                      Rider_data.map((doc) => {
                        return <option style={{fontSize:"2rem"}} onClick={(e)=>{set_Selected_Rider(e.target.value);set_Rider_Id(doc.Rider_id)}}>{doc.Rider_data.name}</option>;
                      })}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      Deliver_Order( doc.Order_data, doc.Order_id , Select_Rider_Id);
                    }}
                    id={doc.Order_id}
                  >
                    Deliver
                  </button>
                    </div>
                 
                </div>
              );
            }
          })}{" "}
      </div>

      {/* ==================================================== page 4 ================================ */}

      <div className="row Order_row" id="pg4">
        {Order &&
          Order.map((doc) => {
            if (doc.Status == "Deliver") {
              return (
                <div className="row Order_List" id={doc.Order_id}>
                  <div className="col-1">
                    <p id="O_l_p" > {doc.Order_id}</p>
                  </div>
                  <div className="col-2">

                  <p id="O_l_p">{doc.Order_data.Person}</p>
                  </div>
                  <div className="col-2">
                  <p id="O_l_p">{doc.Order_data.Phone}</p>
                  </div>
                  <div className="col-3">
                  <p id="O_l_p">{doc.Order_data.Address}{" "}{" "}{doc.Order_data.Location}: {doc.Order_data.City}{" "}
                  </p>
                  </div>
                  <div className="col-2" id="pay_stat">
                  <p >Payment Status = {doc.Order_data.Payment_Status} </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      $("#" + doc.Order_id + "inner_details").toggle();
                    }}
                    id="Admin_bt"
                  >
                    Show_Details
                  </button>

                  <div
                    className="row details"
                    id={doc.Order_id + "inner_details"}
                  >
                           {doc.Order_data.Items &&
                        doc.Order_data.Items.map((e) => {
                          return (
                            <div className="row item_details_admin">
                              <div className="col-2 idm">{e.id}</div>

                              <div className="col-1 idm">{e.data.Name}</div>

                              <div className="col-1 idm">{e.data.Type}</div>

                              <div className="col-1 idm">{"Price = " + e.data.Price}</div>

                              <div className="col-1 idm">{"QTY : " + e.data.Quantity}</div>

                              <div className="col-1 idm">
                                {e.data.Quantity * e.data.Price}
                              </div>
                            </div>
                          );
                        })}
                    <div
                      className="col-12"
                      style={{
                        fontSize: "2rem",
                        paddingLeft: "75%",
                        boxSizing: "border-box",
                      }}
                    >
                      {"Total : " + doc.Order_data.Grand_Total}{" "}
                    </div>
                  </div>
                </div>
              );
            }
          })}{" "}
      </div>

      {/* ===========================================Page 5 Rider  ===========================*/}

      <div className="row Rider" id="pg5">
        <div className="col-12">
          <ManageRider />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
