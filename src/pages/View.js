import React,{useState,useEffect} from "react";
import {Link, useParams } from "react-router-dom";
import './View.css';
import fireDb  from "../firebase";

const View = () => {
    const [user, setUser] = useState({});
    const {id} = useParams();
    useEffect(() => {
        fireDb.child(`research-details/${id}`).get().then((snapshot) => {
            if(snapshot.exists()){
                setUser({...snapshot.val()});
        
            }else{
                setUser({});
            }
        });
    },[id]);

    console.log("user",user);
    return (
        <div style={{ marginTop: "50px" }}>
            <div className="card">
                <div className="card-header">
                    <p> Student Research Details</p>
                </div>
                <div className="container">
                    <strong>ID:  </strong>
                    <span>{id}</span>
                    <br/><br/>

                    <strong>Name:  </strong>
                    <span>{user.name}</span>
                    <br/><br/>

                    <strong>Index No:  </strong>
                    <span>{user.index}</span>
                    <br/><br/>

                    <strong>Email:  </strong>
                    <span>{user.email}</span>
                    <br/><br/>

                    <strong>Title:  </strong>
                    <span>{user.title}</span>
                    <br/><br/>

                    <strong>Supervisor:  </strong>
                    <span>{user.supervisor}</span>
                    <br/><br/>

                    <strong>Contact:  </strong>
                    <span>{user.contact}</span>
                    <br/><br/>

                    <Link to="/Home">
                    <button className="btn btn-edit">Go Back</button>
                    </Link>
                </div>
            </div>
               
        </div>
    );
};

export default View;