import { useState } from "react";
import RegisterContainer from "./Register";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../consts'

function Register() {
    const [mail, setMail] = useState('')
    const [name, setName] = useState('')
    const [phoneno,setPhoneNo]=useState(0)
    const [isLoading,setIsLoading]=useState(false)
    const notifySuccess = (x) => toast.success(x, {
        position: "top-center",
        hideProgressBar: false,
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
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
         if(name.trim().length===0){
              notifyError("Enter valid Name")
              return
        }
         if(mail.trim().length===0){
              notifyError("Enter valid email")
              return
        }
        if(phoneno.trim().length!==10 ){
              notifyError("Enter valid Phone number")
              return

        }
        setIsLoading(true)
        let result=await axios.post(global.baseUrl+'signup',{
            "name": name,
            "email": mail,
            "accountno": "",
            "phoneNum": phoneno,
            "isEmailVerified": false,
            "isPhoneNumVerified": false,
            "isTelegramVerified": false,
            "telegramChatId": 0
        })
        setIsLoading(false)
        if(result.data.status==='success'){
            notifySuccess("Your account number is "+result.data.payload)
        }
        else{
            notifyError(result.data.message)
        }

        // console.log(mail, password)
        // let result = await axios.post("http://127.0.0.1:3001/signup", { mail, password })
        // if (result.data.message == "Registration successful") {
        //     notifySuccess(result.data.message);
        //     navigator("/login")
        // }
        // else {
        //     notifyError(result.data.message)
        // }
    }

    return (<RegisterContainer>
        <div className="d-flex justify-content-center align-items-center body">
            <div className="inside-container-1 d-flex justify-content-end align-items-center">
                <div className="login d-flex flex-column justify-content-center align-items-center gap-2 ">

                    {/* <div className="d-flex align-items-center gap-2">
                        < FaVoteYea size='40' />
                        <div className="fs-2">Vote</div>
                    </div> */}

                    <div className="wb">
                        Create an Account
                    </div>

                    <div>

                    </div>

                    <div className="d-flex flex-column jusitfy-content-around">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input onChange={(e)=>{setName(e.target.value)}} type="text" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email address</label>
                            <input onChange={(e)=>{setMail(e.target.value)}} type="email" class="form-control" />
                        </div>
                         <div class="mb-3">
                            <label class="form-label">Phone num</label>
                            <input onChange={(e)=>{setPhoneNo(e.target.value)}} type="number" class="form-control" />
                        </div>
                        {!isLoading&&<button class="btn btn-primary" onClick={handleSubmit}>Submit</button>
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
    </RegisterContainer>)
}

export default Register;