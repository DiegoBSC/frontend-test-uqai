import React, { useState, useEffect, createContext } from "react";

import { Global } from "../helpers/Global";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [carsTotal, setCarsTotal] = useState({});
  const [brandsTotal, setBrandsTotal] = useState({});
  const [usersTotal, setUsersTotal] = useState({});
  const [dataAllBrands, setDataAllBrands] = useState({});
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState(0);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      setLoading(false);
      return false;
    }

    const userObj = JSON.parse(user);
    const userId = userObj.id;

    const request = await fetch(Global.url + "v1/user/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const data = await request.json();

    const requestCars = await fetch(Global.url + "v1/car/cars-total", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const dataCars = await requestCars.json();

    const requestBrans = await fetch(Global.url + "v1/brand/brands-total", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const dataBrands = await requestBrans.json();

    const requestUsers = await fetch(Global.url + "v1/user/users-total", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const dataUsers = await requestUsers.json();

    const requestBrand = await fetch(Global.url + "v1/brand/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const dataAllBrands = await requestBrand.json();

    setAuth(data);
    setCarsTotal(dataCars);
    setBrandsTotal(dataBrands);
    setUsersTotal(dataUsers);
    setDataAllBrands(dataAllBrands);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        carsTotal,
        setCarsTotal,
        brandsTotal,
        setBrandsTotal,
        usersTotal,
        setUsersTotal,
        dataAllBrands,
        setDataAllBrands,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
