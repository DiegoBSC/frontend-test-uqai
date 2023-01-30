import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'

export default function Logout() {
    const {setAuth, setCarsTotal,setBrandsTotal, setUsersTotal} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{

        localStorage.clear();

        setAuth({});
        setCarsTotal({});
        setBrandsTotal({});
        setUsersTotal({});

        navigate("/login");
        
    })
  return (
    <h1>Cerrando Sesion...</h1>
  )
}
