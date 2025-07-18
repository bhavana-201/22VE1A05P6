import React, { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

function Redirect(){
    const { code } = useParams();
    const navigate = useNavigate();
    useEffect(() =>{
        const originalUrl = localStorage.getItem(code);
        if(originalUrl){
            window.location.href = originalUrl;
        }
        else{
            alert("url not found");
            navigate("/");
        }

    },[code, navigate]);
    return <p>Redirecting...</p>

}

export default Redirect;