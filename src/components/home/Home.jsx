import { useEffect, useState } from "react";
import HomeContainer from "./Home";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import { FaShieldAlt } from "react-icons/fa";
import { FcPrivacy } from "react-icons/fc";
import { PiDetectiveFill } from "react-icons/pi";
import Modal from "../modal/Modal.jsx";
function Home() {

  const location=useLocation()
  const [userDetails,setUserDetails]=useState({})
  useEffect(()=>{
    setUserDetails(location.state)
  },[])
  console.log(userDetails)
  return (
    <HomeContainer>
      <Navbar></Navbar>
      {/* top  */}
      <div className="d-flex justify-content-center align-items-center w-100 gap-2">
        <div className="d-flex justify-content-center flex-column align-items-center gap-2 w-100">

          <div className="display-4 fw-bold">Secure Banking</div>

          <div className="display-4 fw-bold">made <span className="text-primary">Simple</span></div>

          <div className="opacity-50  w-50 text-center">
            Banking at your fingertips.
          </div>
          <div>

          </div>
          <div className="d-flex justify-content-around w-75 mt-2">

           
            <Modal userDetails={userDetails} setUserDetails={setUserDetails}/>
          </div>
        </div>
        <div className="d-flex justify-content-start w-100">
          <img width={550} src="https://img.freepik.com/free-vector/finance-services-financial-transaction-e-commerce-e-payment_335657-3134.jpg" />
        </div>
      </div>

      {/* middle */}

      <div className="d-flex flex-column justify-content-center align-items-center gap-2 w-100 mt-3">
        <div className="display-6 fw-medium">
          Transactions made simple while still being
        </div>
        <div className="display-6 fw-medium">
          fully <span className="text-primary">secure and reliable</span>
        </div>
      </div>

      {/* bottom */}

      <div className="d-flex justify-content-center align-items-center gap-4 w-100 mt-3">

        <div className="d-flex justify-content-end w-100">
          <img width={550} src="https://static.vecteezy.com/system/resources/previews/017/156/338/original/cyber-safety-cyber-security-and-privacy-concept-girl-works-on-a-laptop-illustration-of-security-personal-access-user-authorization-internet-and-data-protection-cybersecurity-vector.jpg" alt="" />
        </div>
        <div className="d-flex flex-column gap-3 justify-content-center align-items-start w-100">

          {/* point 1 */}
          <div>
            <div className="d-flex align-items-center gap-2 fs-4">
              <div className="text-primary">
                <FaShieldAlt />
              </div>
              <div className="fw-bold">
                Security and Accurate:
              </div>
            </div>
            <div className="opacity-50 w-75 mt-2 ms-2">
              Enhanced accuracy and security by combining Otp authentication and Face recognition
            </div>
          </div>
          {/* point 2 */}
          <div>
            <div className="d-flex align-items-center gap-2 fs-4">
              <div className="text-primary">
                <FcPrivacy />
              </div>
              <div className="fw-bold">
                Privacy and Reliability :

              </div>
            </div>
            <div className="opacity-50 w-75 mt-2 ms-2">
              Redundancy and privacy protection, ensuring reliable authentication while safeguarding voter privacy
            </div>
          </div>

          {/* point 3 */}
          <div>
            <div className="d-flex align-items-center gap-2 fs-4">
              <div className="text-primary">
                <PiDetectiveFill />
              </div>
              <div className="fw-bold">
                Fraud Resilience:
              </div>
            </div>
            <div className="opacity-50 w-75 mt-2 ms-2">
              multiple security layers deters fraud by adding complexity and making it challenging for attackers.
            </div>
          </div>


        </div>
      </div>



     
    </HomeContainer>
  )
}

export default Home;