import ModalContainer from "./Modal";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../consts";
function Modal({ userDetails, setUserDetails }) {
  const [step, setStep] = useState(0);
  const [isLoadingUP, setIsLoadingUP] = useState(false);
  const [step2Loading, setStep2Loading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);

  const updateProfile = () => {
    if (userDetails.isEmailVerified && userDetails.isTelegramVerified) {
      notifySuccess("Your profile is updated. Proceed to next step");
      return;
    } else {
      setStep(1);
    }
  };

  const notifySuccess = (x) =>
    toast.success(x, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const notifyError = (x) =>
    toast.error(x, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const sendEmailOtp = async () => {
    setStep2Loading(true);
    let result = await axios.post(
      global.baseUrl + "sendmail?email=" + userDetails.email
    );
    if (result.data.status == "success") {
      setOtpSent(true);
      notifySuccess(result.data.message);
    } else {
      notifyError(result.data.message);
    }
    setStep2Loading(false);
  };

  const verifyOtp = async () => {
    if (otp.trim().length === 0) {
      notifyError("Enter valid otp");
      return;
    }
    setOtpVerificationLoading(true);
    let data = {
      service: "email",
      identifier: userDetails.email,
      otp: otp.toString(),
      timestamp: 0,
    };
    let result = await axios.post(global.baseUrl + "verify-email-otp", data);
    if (result.data.status == "success") {
      setOtpSent(true);
      notifySuccess(result.data.message);
      let data = { ...userDetails };
      data.isEmailVerified = true;
      setUserDetails(data);
      if (userDetails.isTelegramVerified) {
        setStep(0);
      } else {
        setStep(1);
      }
    } else {
      notifyError(result.data.message);
    }
    setOtpVerificationLoading(false);
  };
  return (
    <ModalContainer>
      <button
        class="btn btn-outline-primary"
        onClick={() => {
          setStep(0);
        }}
        data-bs-toggle="modal"
        data-bs-target="#steps"
      >
        Start
      </button>
      {/* Modal */}
      <div class="modal modal-lg  fade" id="steps" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            {/* step - 0 */}
            {step == 0 && (
              <div class="modal-body pb-3" style={{ height: "400px" }}>
                {/* Heading */}
                <div className="d-flex justify-content-between mb-3">
                  <div className="text-center w-100">
                    <h1
                      class="modal-title text-primary fs-5"
                      id="exampleModalLabel"
                    >
                      Complete Below Steps
                    </h1>
                  </div>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="d-flex gap-2 justify-content-around">
                  <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                    <div>Step-1</div>
                    <img
                      width={200}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmjJvFh9aVNg7nx-nGqNto13G3mZrVMNXBYA&usqp=CAU"
                      alt=""
                    />
                    {!isLoadingUP && (
                      <button
                        class="btn btn-outline-primary"
                        onClick={updateProfile}
                      >
                        Update Profile
                      </button>
                    )}
                    {isLoadingUP && (
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {step == 1 && (
              <div class="modal-body pb-3" style={{ height: "400px" }}>
                <div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center gap-3">
                  <button
                    class="btn btn-outline-primary w-25"
                    onClick={() => {
                      setStep(2);
                    }}
                    disabled={userDetails.isEmailVerified}
                  >
                    Verify Email
                  </button>

                  <button
                    class="btn btn-outline-primary w-25"
                    onClick={() => {
                      setStep(3);
                    }}
                    disabled={userDetails.isTelegramVerified}
                  >
                    Verify Telegram
                  </button>
                </div>
              </div>
            )}

            {/* step 2 */}

            {step == 2 && (
              <div class="modal-body pb-3" style={{ height: "400px" }}>
                <div className="d-flex justify-content-between mb-3">
                  <div className="text-center w-100">
                    <h1
                      class="modal-title text-primary fs-5"
                      id="exampleModalLabel"
                    >
                      Link your Email Id
                    </h1>
                  </div>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center gap-3">
                  <input
                    type="text"
                    className="form-control w-50"
                    value={userDetails.email}
                  />
                  {!step2Loading && (
                    <button
                      class="btn btn-outline-primary w-25"
                      onClick={() => {
                        sendEmailOtp();
                      }}
                    >
                      SendOtp
                    </button>
                  )}
                  {step2Loading && (
                    <div className="d-flex justify-content-center w-25">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  {otpSent && (
                    <input
                      type="number"
                      className="form-control w-50"
                      onChange={(e) => {
                        setOtp(e.target.value);
                      }}
                    />
                  )}
                  {otpSent && !otpVerificationLoading && (
                    <button
                      class="btn btn-outline-primary w-25"
                      onClick={() => {
                        verifyOtp();
                      }}
                    >
                      Verify Otp
                    </button>
                  )}
                  {otpVerificationLoading && (
                    <div className="d-flex justify-content-center w-25">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </ModalContainer>
  );
}

export default Modal;
