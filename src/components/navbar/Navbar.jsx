import NavbarContainer from "./Navbar";
import { useEffect, useState } from "react";
import { IoLogOutSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Navbar() {
    const [username,setUsername]=useState("");
    const navigator = useNavigate()
    useEffect(()=>{
      setUsername(localStorage.getItem("mail"))
    },[])
    const logout=()=>{
      localStorage.clear()
      navigator("/login")

    }
  return (
    <NavbarContainer>
      <nav class="navbar navbar-expand-lg bg-primary">
        <div class="container-fluid ms-5">
          <a class="navbar-brand text-light fw-bold">Banking</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="d-flex justify-content-end gap-4 me-5 align-items-center">
            <div className="text-light fs-4">
             {username}   <FaUser />
            </div>
            <div className="fs-2">
            <IoLogOutSharp color="white" style={{'cursor':'pointer'}} onClick={logout}  />
            </div>
          </div>
        </div>
      </nav>
    </NavbarContainer>
  );

}

export default Navbar;