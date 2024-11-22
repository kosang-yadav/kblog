import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function proetected({children, authentication}){
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.status)

    useEffect(() => {
        if(authentication && authStatus !== authentication) navigate("/login");
        else if(!authentication && authStatus !== authentication) navigate("/");
        setLoader("false");
    }, [authStatus, navigate, authentication])
    

    return (
        loader ? <>{children}</> : <h1>Loading...</h1>
    )
}