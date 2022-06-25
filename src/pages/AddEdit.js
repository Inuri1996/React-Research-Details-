//import firebase from 'firebase/compat/app'
import firebase from "firebase/app";
import "firebase/database";
import 'firebase/firestore'

import React,{useState,useEffect} from "react";
import {useHistory,useParams } from "react-router-dom";
import './AddEdit.css';
import fireDb  from "../firebase";
import { toast } from "react-toastify";


const initialState ={
    name: "",
    index:"",
    email: "",
    title: "",
    supervisor: "",
    contact: "",
    
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const {name,index,email,title,supervisor,contact} =state;
    
     const history = useHistory();

const {id} = useParams();

useEffect(() => {
    fireDb.child("research-details").on("value", (snapshot) => {
       if(snapshot.val() !== null) {
           setData({ ...snapshot.val() });
       } else {
            setData({});
        }
   });
       return () => {
            setData({});
        };
}, [id]);

useEffect(() => {
    if(id){
        setState({...data[id]});
    }else{
        setState({...initialState});
    }

    return() => {
        setState({...initialState});
    }
},[id,data]);

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state,[name]:value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !index || !email || !title || !supervisor || !contact ){
            toast.error("please provide value in each input field");
        }else{
            if(!id){

                fireDb.child("research-details").push(state,(err) =>{
                    if(err){
                        toast.error(err);
                    }else{
                        toast.success("Research Details Added sucessfully");
                    }
                });
            }else{
                fireDb.child(`research-details/${id}`).set(state,(err) =>{
                    if(err){
                        toast.error(err);
                    }else{
                        toast.success("Research Details Updated sucessfully");
                    }
                });
            }
            
            setTimeout(() => history.push("/Home"),500);
        }


    };


    return (
        <div style={{ marginTop: "100px" }}>
           <form style={{ 

            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
            }}
            onSubmit={handleSubmit}
            >

                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Student name.." 
                value={name || ""} 
                onChange={handleInputChange}
                />

                <label htmlFor="index">Index No</label>
                <input 
                type="text" 
                id="index" 
                name="index" 
                placeholder="Student IndexNo.." 
                value={index || ""} 
                onChange={handleInputChange}
                />

                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Student Email.." 
                value={email || ""} 
                onChange={handleInputChange}
                />

                <label htmlFor="title">Title</label>
                <input 
                type="text" 
                id="title" 
                name="title" 
                placeholder="Research Title.." 
                value={title || ""} 
                onChange={handleInputChange}
                />


                <label htmlFor="supervisor">Supervisor Name</label>
                <input 
                type="text" 
                id="supervisor" 
                name="supervisor" 
                placeholder="Supervisor Name" 
                value={supervisor || ""} 
                onChange={handleInputChange}
                />

                <label htmlFor="contact">Contact Number</label>
                <input 
                type="number" 
                id="contact" 
                name="contact" 
                placeholder="Contact Number" 
                value={contact || ""} 
                onChange={handleInputChange}
                />

                

                <input type ="submit" value={id ? "update" : "save" }/>

            </form>     
        </div>
    );
};

//const fireDb = firebase.initializeApp(firebaseConfig);
//export default fireDb.database().ref();
export default AddEdit;
