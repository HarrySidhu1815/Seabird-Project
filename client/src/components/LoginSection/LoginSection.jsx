import React, { useState } from "react";
import classes from "./LoginSection.module.css";
import Input from "../../UI/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import button from "../../assets/LogInButton.svg";
import {
  logInFailure,
  logInStart,
  logInSuccess,
} from "../../redux/user/userSlice";
import Modal from "../../UI/Modal";
import TermsOfUse from "./TermsOfUse";

export default function LoginSection() {
  const [formData, setFormData] = useState({ admin: false });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const [agree, setAgree] = useState(false)
  const [resetError, setResetError] = useState();
  const [success, setSuccess] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { id, type, checked, value } = e.target;

    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  }

  function handlePasswordResetClick() {
    setShowEmailModal(true);
  }

  async function handleResetPassword() {
    setResetLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, type: "old-user" }),
      });

      const data = await res.json();
      setResetLoading(false);

      if (data.success === false) {
        setResetError(data.message);
      } else {
        setResetError(null);
        setSuccess(true);
      }
    } catch (error) {
      setResetLoading(false);
      setResetError(error);
    }
  }

  function handleCancel() {
    setResetError(null);
    setSuccess(false);
    setShowEmailModal(false);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      dispatch(logInStart);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.message === "Please agree to terms of aggrement") {
        dispatch(logInFailure(data));
        setTermsModal(true);
        return;
      }

      if (data.success === false) {
        dispatch(logInFailure(data));
        return;
      }

      dispatch(logInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(logInFailure(error));
    }
  }

  async function handleTermsOfUseForm(e){
    e.preventDefault()

    if (agree) {
      try {
        const res = await fetch("/api/auth/update-terms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email, termsAgreed: true }),
        });
        
        const data = await res.json();
        if (data.success) {
          setTermsModal(false);
        } else {
          alert("Error updating terms agreement:", data.message);
        }
      } catch (error) {
        alert("An error occurred while updating terms agreement", error);
      }
    } else {
      alert("Please agree to the terms before continuing.");
    }
  }

  return (
    <>
      {termsModal && (
        <Modal className={classes["terms-modal"]} onClose={() => {setTermsModal(false)}}>
          <TermsOfUse />
          <form className={classes.agreementForm}>
            <div>
              <input id="agreed" type="checkbox" onChange={() => setAgree(!agree)}
                  checked={agree}/>
              <label htmlFor="agreed">
                I have read and agree to follow Learning With Seabird’s terms of
                use.
              </label>
            </div>
            <button onClick={handleTermsOfUseForm}>Continue</button>
          </form>
        </Modal>
      )}
      {showEmailModal && (
        <Modal onClose={handleCancel} className={classes["reset-email-modal"]}>
          <h2>Are you sure you want to reset your password?</h2>
          <p>
            Enter your email and you will be sent a link to reset your password.
          </p>
          <form>
            <label>Enter email address</label>
            <div className={classes["reset-pass-email"]}>
              <Input
                type="email"
                name="email"
                title="Email"
                onChange={handleInputChange}
              />
            </div>
            {success && (
              <p className={classes.success}>
                Email sent to User successfully!
              </p>
            )}
            {resetError && <p className={classes.error}>{resetError}</p>}
          </form>
          <div className={classes["action-buttons"]}>
            <button
              className={`${classes["reset-email-btn"]}`}
              onClick={handleResetPassword}
              disabled={resetLoading}
            >
              {resetLoading ? "Sending" : "Reset Password"}
            </button>
            <button className={classes["cancel-btn"]} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
      <div className={classes["login-container"]}>
        <h1>
          Please enter your email and password to gain access to all materials
        </h1>
        {error && (
          <span className={classes.error}>
            {error.message || "Something went wrong"}
          </span>
        )}
        <form>
          <div className={classes.inputs}>
            <Input
              type="email"
              name="email"
              title="Email"
              onChange={handleInputChange}
            />
            <Input
              type="password"
              name="password"
              title="Password"
              onChange={handleInputChange}
            />
            <p>
              Forgot your password?{" "}
              <span
                className={classes["forgot-pass"]}
                onClick={handlePasswordResetClick}
              >
                Click here to reset it,
              </span>{" "}
              or request access again.
            </p>
          </div>
          <img onClick={handleFormSubmit} src={button} alt="submit button" />
        </form>
      </div>
    </>
  );
}
