import ModalContainer from "./Modal";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Modal({userDetails,setUserDetails}) {

    const [step, setStep] = useState(0)
    let mail = localStorage.getItem("mail")
    const [isLoadingUP, setIsLoadingUP] = useState(false)
    const [isLoadingFR, setIsLoadingFR] = useState(false)
    const [isLoadingFV, setIsLoadingFV] = useState(false)
    const [profileUpdateLoading, setProfileUpdateLoading] = useState(false)
    const [profileImageUpdateLoading, setProfileImageUpdateLoading] = useState(false)
    const [fingerPrintUpdateLoading, setfingerPrintUpdateLoading] = useState(false)
    const [name, setName] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [aadharNo, setAadharNo] = useState('')
    const [voterId, setVoterId] = useState('')
    const [faceImg, setFaceImg] = useState(null);
    const [fingerprintImg, setFingerprintImg] = useState(null);
    const [faceImg1, setFaceImg1] = useState(null);
    const [fingerprintImg1, setFingerprintImg1] = useState(null);


    var handleSubmitData = async () => {

        if (name.trim().length == 0) {
            notifyError("Name is a mandatory field")
            return;
        }
        if (phoneNo.trim().length == 0) {
            notifyError("Phone number is a mandatory field")
            return;
        }
        if (aadharNo.trim().length == 0) {
            notifyError("Aadhar Number is a mandatory field")
            return;
        }
        if (voterId.trim().length == 0) {
            notifyError("Voter ID is a mandatory field")
            return;
        }

        setProfileUpdateLoading(true)
        let result = await axios.post("http://127.0.0.1:3001/home", { name, mail, phoneNo, aadharNo, voterId })
        if (result.data.message == "Data added successfully") {
            notifySuccess(result.data.message)
            setStep(2)

        }
        else {
            notifyError(result.data.message)
        }
        setProfileUpdateLoading(false)
    }

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
    const updateProfile = async () => {
        setIsLoadingUP(true)
        let response = await axios.post("http://127.0.0.1:3001/home/getProfile", { mail: localStorage.getItem('mail') })
        let result = response.data
        if (result.errorOccured) {
            notifyError(result.message)
            setIsLoadingUP(false)
            return
        }
        else if (!result.userDataExist) {
            setStep(1)
        }
        else if (!result.faceImgExists) {
            setStep(2)
        }
        else if (!result.fingerprintExists) {
            setStep(3)
        }
        else {
            notifySuccess("Your profile is upto date, Proceed to Step-2")
        }
        setIsLoadingUP(false)

    }
    var handleSubmitFaceImg1 = async () => {
        setProfileImageUpdateLoading(true)
        let result = await axios.post("http://127.0.0.1:3001/home/setFaceImg", { mail })
        if (result.data.message == "Image uploaded successfully") {
            console.log("Image uploaded successfully")
            notifySuccess(result.data.message)
            setStep(3)
        }
        else {
            notifyError(result.data.message)
        }
        setProfileImageUpdateLoading(false)
    };
    var handleSubmitFingerprintImg = async () => {
        try {
            setfingerPrintUpdateLoading(true)
            const formData = new FormData();
            formData.append('file', fingerprintImg);
            formData.append('mail', mail);

            // Make the API call with Axios
            const result = await axios.post("http://127.0.0.1:3001/home/fingerprintImg", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (result.data.message === "Image uploaded successfully") {
                console.log("Data added successfully");
                notifySuccess(result.data.message);
                setStep(0)
            } else {
                notifyError(result.data.message);
            }
            setfingerPrintUpdateLoading(false)
        } catch (error) {
            console.error("Error:", error);
            notifyError("An error occurred while uploading the image");
        }
    };
    var faceVerification1 = async () => {
        let result = await axios.post("http://127.0.0.1:3001/home/verifyFaceImg", { mail })
        if (result.data.message == "Face is Matched") {
            console.log("Face is Matched")
            notifySuccess(result.data.message + ", proceed to step-3")
        }
        else {
            notifyError(result.data.message)
        }
    };
    var fingerprintVerification = async () => {
        try {
            var mail = localStorage.getItem("mail")
            const formData = new FormData();
            formData.append('file', fingerprintImg1);
            formData.append('mail', mail);

            // Make the API call with Axios
            const result = await axios.post("http://127.0.0.1:3001/home/verifyFingerprint", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (result.data.message === "Fingerprint is Matched") {
                notifySuccess(result.data.message + ", Verification Completed! You can proceed to vote.");
                setStep(5)
            } else {
                notifyError(result.data.message + ", You can't proceed to vote.");
                setStep(6)
            }


        } catch (error) {
            console.error("Error:", error);
            notifyError("An error occurred while uploading the image");
        }
    };

    return (
        <ModalContainer>
            <button class="btn btn-outline-primary" onClick={() => { setStep(0) }} data-bs-toggle="modal" data-bs-target="#steps">Start</button>
            {/* Modal */}
            <div class="modal modal-lg  fade" id="steps" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">

                        {/* step - 0 */}
                        {step == 0 &&
                            <div class="modal-body pb-3" style={{ 'height': '400px' }}>
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="text-center w-100">
                                        <h1 class="modal-title text-primary fs-5" id="exampleModalLabel">Complete Below Steps</h1>
                                    </div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="d-flex gap-2 justify-content-around">

                                    {/*  */}
                                    <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                                        <div >Step-1</div>
                                        <img width={200} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmjJvFh9aVNg7nx-nGqNto13G3mZrVMNXBYA&usqp=CAU" alt="" />
                                        {!isLoadingUP &&
                                            <button class="btn btn-outline-primary" onClick={updateProfile} >Update Profile</button>
                                        }
                                        {isLoadingUP &&
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>

                                        }
                                    </div>
                                    {/*  */}
                                    <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                                        <div >Step-2</div>
                                        <img width={200} src="https://www.inventicons.com/uploads/iconset/1629/wm/512/facial-recognition-13.png" alt="" />
                                        {!isLoadingFR &&
                                            <button class="btn btn-outline-primary" onClick={faceVerification1} >Face Verification</button>
                                        }
                                        {isLoadingFR &&
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>

                                        }

                                    </div>
                                    {/*  */}
                                    <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                                        <div >Step-3</div>
                                        <img width={200} src="data:image/png;base64,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" alt="" />

                                        {!isLoadingFV &&
                                            <button class="btn btn-outline-primary" onClick={() => {
                                                setStep(4)

                                            }} >FingerPrint Verification</button>
                                        }
                                        {isLoadingFV &&
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>

                                        }

                                    </div>


                                </div>
                            </div>
                        }


                        {/* step - 1 */}
                        {step == 1 &&

                            <div className="modal-body pb-3" style={{ 'height': '400px' }}>
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="text-center w-100">
                                        <h1 class="modal-title text-primary fs-5" id="exampleModalLabel">Update Profile </h1>
                                    </div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="loginForm d-flex flex-column gap-2">
                                    <div class="col-12">
                                        <label class="form-label">Name</label>
                                        <input type="text" class="form-control" onChange={(e) => { setName(e.target.value) }} />
                                    </div>
                                    <div className="row">
                                        <div class="col-md-6">
                                            <label class="form-label">Email</label>
                                            <input class="form-control" value={localStorage.getItem("mail")} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Phone Number</label>
                                            <input type="text" class="form-control" onChange={(e) => { setPhoneNo(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div class="col-md-6">
                                            <label class="form-label">Aadhar Number</label>
                                            <input type="text" class="form-control" onChange={(e) => { setAadharNo(e.target.value) }} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Voter Id</label>
                                            <input type="text" class="form-control" onChange={(e) => { setVoterId(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div class="mt-2 d-flex justify-content-center w-100" >
                                        {!profileUpdateLoading &&

                                            <button class="btn btn-primary" onClick={handleSubmitData}>Submit</button>
                                        }
                                        {profileUpdateLoading &&

                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>

                                        }
                                    </div>
                                </div>
                            </div>

                        }



                        {/* step - 2 */}

                        {step == 2 &&

                            <div className="modal-body pb-3" style={{ 'height': '400px' }}>
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="text-center w-100">
                                        <h1 class="modal-title text-primary fs-5" id="exampleModalLabel">Update Profile </h1>
                                    </div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="d-flex justify-content-center w-100 h-100 mt-5">
                                    {!profileImageUpdateLoading &&

                                        <div className="d-flex flex-column gap-3">
                                            <img height={150} width={150} src="data:image/png;base64,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" alt="" />

                                            <button onClick={handleSubmitFaceImg1} className="btn btn-outline-primary" >
                                                Update your Face Image
                                            </button>
                                        </div>
                                    }
                                    {profileImageUpdateLoading &&
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>

                                    }
                                </div>
                            </div>

                        }

                        {step == 3 &&

                            <div className="modal-body pb-3" style={{ 'height': '400px' }}>
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="text-center w-100">
                                        <h1 class="modal-title text-primary fs-5" id="exampleModalLabel">Update Profile </h1>
                                    </div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="d-flex justify-content-center w-100 h-100 align-items-center">

                                    <div>
                                        <div class="mb-3 d-flex gap-2 align-items-center">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaoRVNDjZTSbLgzXMuNaMSOSKHPGbtIxGagZY3GAoDrl_d1urXez0XCis4uS1Jh1yYSn8&usqp=CAU" alt="" />
                                            <div>


                                                <div class="text-center mb-2  fw-bold">Upload Fingerprint Image</div>


                                                <input type="file" class="form-control" aria-label="file example" required onChange={(e) => { setFingerprintImg(e.target.files[0]) }} />
                                                <div class="invalid-feedback">Example invalid form file feedback</div>
                                                <div className="d-flex w-100 justify-content-center mt-3">
                                                    {!fingerPrintUpdateLoading &&

                                                        <button class="btn btn-primary" onClick={handleSubmitFingerprintImg}>Submit</button>
                                                    }


                                                    {fingerPrintUpdateLoading &&
                                                        <div class="spinner-border" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    }
                                                </div>

                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>

                        }

                        {step == 4 &&

                            <div className="modal-body pb-3" style={{ 'height': '400px' }}>
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="text-center w-100">
                                        <h1 class="modal-title text-primary fs-5" id="exampleModalLabel">Fingerprint Verification</h1>
                                    </div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="d-flex justify-content-center w-100 h-100 align-items-center gap-2">
                                    <img width={200} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaoRVNDjZTSbLgzXMuNaMSOSKHPGbtIxGagZY3GAoDrl_d1urXez0XCis4uS1Jh1yYSn8&usqp=CAU " alt="" />

                                    <div>
                                        <div class="mb-3">
                                            <label class="form-label text-center mb-2  fw-bold">Upload Fingerprint Image</label>
                                            <input type="file" class="form-control" aria-label="file example" required onChange={(e) => { setFingerprintImg1(e.target.files[0]) }} />
                                            <div class="invalid-feedback">Example invalid form file feedback</div>
                                        </div>
                                        {!fingerPrintUpdateLoading &&

                                            <button class="btn btn-primary" onClick={fingerprintVerification}>Submit</button>
                                        }


                                        {fingerPrintUpdateLoading &&
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        }
                                    </div>


                                </div>
                            </div>

                        }

                        {step == 5 &&

                            <div className="modal-body pb-3" style={{ 'height': '400px' }}>
                                <div className="d-flex justify-content-center align-items-center h-100 ">
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/vote-agreement-papers-4836675-4042195.png?f=webp" alt="" />

                                        <div className="display-6 text-primary fw-bold" style={{ fontSize: '50px' }}>
                                            You can Proceed for VOTING
                                        </div>
                                    </div>
                                </div>
                            </div>

                        }

                        {step == 6 &&

                            <div className="modal-body pb-3" style={{ 'height': '400px' }}>
                                <div className="d-flex justify-content-center align-items-center h-100 ">
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                        <img style={{ maxWidth: '100%', height: 'auto' }} src="data:image/jpeg;base64,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" alt="" />
                                        <div className="display-6 text-primary fw-bold" style={{ fontSize: '50px' }}>
                                            You can't Proceed for VOTING
                                        </div>
                                    </div>
                                </div>
                            </div>

                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </ModalContainer>
    )
}

export default Modal;
