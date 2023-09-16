"use client";
import Image from "next/image";
import vector from "@/public/login.png";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function index() {

  const router = useRouter()

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loginStatus, setLoginStatus] = useState();
  const [employeeData, setEmployeedata] = useState({});

  useEffect(() => {
    localStorage.setItem("employeeData", JSON.stringify(employeeData));
  }, [employeeData]);

  const login = async () => {
    const obj = {
      email: email,
      password: password,
    };

    await axios
      .post("http://localhost:8000/api/auth", obj)
      .then((res) => {
        if (res.data.edata == "error") {
          setLoginStatus("err");
        } else {
          setLoginStatus("sucess");
          const obj ={
            email:res.data.edata[0].email,
            name:`${res.data.edata[0].fname} ${res.data.edata[0].lname}`,
            employee_type:res.data.edata[0].employee_id
          }
          setEmployeedata(obj);
          if(res.data.edata[0].employee_id==1){
            router.push("./dashboard")
          }else{
            router.push("./pos")
          }
      
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="min-h-screen ">
    {loginStatus!=='sucess'?(  <div className="flex flex-row min-h-screen ">
        <div className="md:w-1/3 hidden md:visible  md:flex flex-col justify-center items-center background-login-first">
          <span className="main-name-login">
            NetRow <br />
            Point of Sale
          </span>
        </div>

        <div className="w-full md:w-2/3 flex flex-col justify-center items-center big-main">
          <div className="main-login-view flex flex-col justify-center gap-4">
            <div className="login-text-view">
              <span className="login-text">LogIn</span>
            </div>
            <div className="input-view relative">
              <EmailIcon className="absolute" />
              <input
                className="input-m"
                placeholder="Email"
                onChange={(e) => {
                  e.preventDefault, setEmail(e.target.value);
                }}
              />
            </div>

            <div className="input-view relative">
              <HttpsIcon className="absolute" />
              <input
                className="input-m"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  e.preventDefault, setPassword(e.target.value);
                }}
              />
            </div>

            <button className="login-btn" onClick={login}>
              LogIn
            </button>
          </div>
        </div>
      </div>):(<Link  href={"./dashboard"}></Link>)}
    </main>
  );
}
