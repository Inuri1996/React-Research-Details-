
import React,{useState,useEffect} from 'react';

import fireDb  from "../firebase";
import  { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";


const Home = () => {

 const [data, setData] = useState({});
 const [sortedData, setSortedData] =useState([])
 const [sort, setsort] = useState(false);
 
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
        }, []);

        const onDelete = (id) => {
            if(
                window.confirm("Are you sure that you wanted to delete that contact?")
            ){
                fireDb.child(`research-details/${id}`).remove((err) => {
                    if(err){
                        toast.error(err);
                    }else{
                        toast.success("Student Details Delete Successfully");
                    }
                });
            }
        };

const handleChange = (e) => {
    setsort(true);
    fireDb.child("research-details")
    .orderByChild(`${e.target.value}`)
    .on("value", (snapshot) => {
        let sortedData =[];
        snapshot.forEach((snap) => {
            sortedData.push(snap.val());
        });
        setSortedData(sortedData);
        });
    
};

const handleReset = () => {
setsort(false);
};




    return (
        <div style={{ marginTop:"100px" }}>
            <table className="styled-table">
                <thead>
                    <tr>
                       <th style={{ textAlign:"center" }}>NO.</th> 
                       <th style={{ textAlign:"center" }}>Student Name</th> 
                       <th style={{ textAlign:"center" }}>IndexNO</th> 
                       <th style={{ textAlign:"center" }}>Email</th> 
                       <th style={{ textAlign:"center" }}>Research Title</th> 
                       <th style={{ textAlign:"center" }}>Supervisor</th> 
                       <th style={{ textAlign:"center" }}>Contact</th> 
                       
                       {!sort && <th style={{ textAlign:"center" }}>Action</th> }
                    </tr>
                </thead>

{!sort && (

<tbody>
{Object.keys(data).map((id, index) => {
    return(
        <tr key={id}>
            <th scope="row">{index + 1}</th>
            <td>{data[id].name}</td>
            <td>{data[id].index}</td>
            <td>{data[id].email}</td>
            <td>{data[id].title}</td>
            <td>{data[id].supervisor}</td>
            <td>{data[id].contact}</td>
            
            <td>
                <Link to={`./update/${id}`}>
                <button className='btn btn-edit'>Edit</button>
                </Link>
                <button className='btn btn-delete' 
                onClick={() => onDelete(id)}>Delete</button>
                <Link to={`./view/${id}`}>
                <button className='btn btn-view'>View</button>
                </Link>
            </td>
        </tr>
    )
})}
</tbody>
 )}

 {sort && (
    <tbody>
        {sortedData.map((item, index) => {
            return(
                <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.index}</td>
                <td>{item.email}</td>
                <td>{item.title}</td>
                <td>{item.supervisor}</td>
                <td>{item.contact}</td>
                </tr>
            );
        })}
    </tbody>
 )}
              
 </table> 
           <label> Sort By:</label>
           <select className='dropdown' name='colvalue' onChange={handleChange}>
                <option>please select</option>
                <option value="name">Student Name</option>
                <option value="index">IndexNO</option>
                <option value="email">Email</option>
                <option value="title">Research Title</option>
                <option value="supervisor">Supervisor</option>
                <option value="contact">Contact</option>
                
           </select>
           <button className='btn btn-reset' onClick={handleReset}>
            Reset
            </button>
            <br/>
            
            
                
        </div>
    );
};

export default Home;