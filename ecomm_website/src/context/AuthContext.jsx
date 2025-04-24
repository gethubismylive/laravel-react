import { createContext, useState, useEffect } from "react";

export const Authcontext = createContext();

export const Authcontextprovied = ({ children }) => {
  const admininfo = localStorage.getItem("admin")
//   const userinfo = Cookies.get("usertoken");
const api = "http://127.0.0.1:8000/api/"

  const [user, setuser] = useState(admininfo ? JSON.parse(admininfo) : null);
//   const [customer, setcustomer] = useState(userinfo ? JSON.parse(userinfo) : null);

  const login = (user) => {
    setuser(user);
    localStorage.setItem("admin",JSON.stringify(user))
  };

  const logout = () => {
    localStorage.removeItem("admin")
    setuser(null);
  };

  const customerlogout = () => {
    // setcustomer(null);
  };

  const customerlogin = (customer) => {
    // setcustomer(customer);
  };

  useEffect(() => {
    const storedAdminInfo = localStorage.getItem("admin");
    // const storedCustomerInfo = Cookies.get("usertoken");

    if (storedAdminInfo) {
      setuser(JSON.parse(storedAdminInfo));
    }

    // if (storedCustomerInfo) {
    //   setcustomer(JSON.parse(storedCustomerInfo));
    // }
  }, []);

  return (
    <Authcontext.Provider value={{ login, user, logout, customerlogin, customerlogout,api }}>
      {children}
    </Authcontext.Provider>
  );
};