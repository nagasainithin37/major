import { useState } from "react";
import LoginContainer from "./Login.js";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import '../../consts'
function Login() {
    const [accountNo, setAccountNo] = useState('')
    const navigator = useNavigate()
    const [isLoading,setIsLoading]=useState(false)
    const notifySuccess = (x) => toast.success(x, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });;
    const notifyError = (x) => toast.error(x, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    var handleSubmit = async () => {
        if(accountNo.trim().length===0){
            notifyError("Enter valid Account Number")
            return
        }
        setIsLoading(true)
        let result=await axios.post(global.baseUrl+"login?accountNo="+accountNo)
        if(result.data.status==='success'){
            localStorage.setItem("mail",result.data.payload.email)
            navigator("/home",{state:result.data.payload})
            // console.log(result.data.payload)
        }
        else{
            notifyError(result.data.message);
        }
        setIsLoading(false)
        // console.log(mail, password)
        // let result = await axios.post("http://127.0.0.1:3001/login", { mail, password })

        // if (result.data.message == "Login successful") {
        //     notifySuccess(result.data.message);
        //     localStorage.setItem("mail", mail)
        //     navigator("/home")
            
        // }
        // else if(result.data.message == "Password is incorrect, please try again"){
        //     notifyError(result.data.message);
        // }
        // else {
        //     notifyError(result.data.message);
        //     navigator("/signup")
        // }

    }

    return (<LoginContainer>
        <div className="d-flex justify-content-center align-items-center body">
            <div className="inside-container-1 d-flex justify-content-end align-items-center">
                <div className="login d-flex flex-column justify-content-center align-items-center gap-2 ">

                    <div className="wb">
                        Login
                    </div>

                    <div>

                    </div>

                    <div className="d-flex flex-column jusitfy-content-around">
                        <div class="mb-3">
                            <label class="form-label">Account Number</label>
                            <input onChange={(e)=>{setAccountNo(e.target.value)}} type="number" class="form-control" />
                        </div>
                        
                        {!isLoading&&<button class="btn btn-primary" onClick={handleSubmit}>Login</button>
                        }
                        {isLoading&&<div className="d-flex justify-content-center"><div class="spinner-border " role="status">
                            <span class="visually-hidden">Loading...</span>
                            </div></div>}

                    </div>

                </div>
            </div>
              <div className="inside-container-2 d-flex justify-content-start align-items-center">
                <div className="login-image" >
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/online-banking-portal-4468635-3783933.png?f=webp" />

                </div>
            </div>
        </div>
        <ToastContainer />
    </LoginContainer>)
}

export default Login;