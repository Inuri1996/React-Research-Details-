import React,{useEffect, useState} from "react";
import {Link,useLocation,useHistory} from "react-router-dom";
import "./Header.css"

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();
    const [search,setSearch]=useState("");

    const history = useHistory();

    useEffect(() => {
        if(location.pathname === "/home") {
            setActiveTab("home");
        } else if (location.pathname === "/add") {
            setActiveTab("AddContact");
        } else if (location.pathname === "/about"){
            setActiveTab("About");
        }
    }, [location]);

    const handleSubmut =  (e) => {
        e.preventDefault();
        history.push(`/Search?name=${search}`);
        setSearch("");
    }


    return (
        <div className="header">
            <p className="logo">Research Deatails</p>
            <div className="header-right">
                <form onSubmit={handleSubmut} style={{ display:"inline"  }}>
                    <input
                    type="text"
                    className="inputField"
                    placeholder="search "
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    />

                </form>

            <Link to="/Home">
           <p className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}>
                Home
             </p>
            </Link>

            <Link to="/add">
            <p 
            className={`${activeTab === "AddContact" ? "active" : "" }`}
            onClick={() => setActiveTab("AddContact")}>
                Add Contact
            </p>
           </Link>

            <Link to="/about">
            <p 
            className={`${activeTab === "About" ? "active" : "" }`}
            onClick={() => setActiveTab("About")}>
                About
            </p>
            </Link>


           </div>
               
        </div>
    );
};

export default Header;