import "./AuthModal.css";
import Login from "./Login";
import Register from "./Register";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAuth } from "../../lib/slices/headerSlice";
import useApi from "../../hooks/useApi";
import { saveCredentials } from "../../lib/slices/authSlice";
import { toast } from "react-toastify";

const AuthModal = () => {
  const dispatch = useDispatch();
  const { fetchData, loading } = useApi();
  const [activeTab, setActiveTab] = useState("login");
  const openAuth = useSelector((state) => state?.header?.openAuth);

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });

  const handleChangeValue = (e) => {
    setFormValues((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    const { username, password } = formValues;

    const endpoint = {
      method: "post",
      url: "/auth/login",
      data: { username, password },
    };
    const res = await fetchData(endpoint);
    if (res?.access) {
      dispatch(
        saveCredentials({ token: res?.access, username: res?.user?.username })
      );
      dispatch(setOpenAuth(false));
    } else {
      toast.error("Credential not matched!");
    }
  };

  const handleRegistration = async () => {
    const { username, password } = formValues;
    const endpoint = {
      method: "post",
      url: "/auth/registration",
      data: { username, password },
    };
    const res = await fetchData(endpoint);
    if (res?.username) handleLogin();
    else {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (openAuth) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setFormValues({});
    }
  }, [openAuth]);

  return (
    openAuth && (
      <div
        className={`auth-modal ${openAuth}`}
        onClick={() => dispatch(setOpenAuth(false))}
      >
        <div
          className="auth-modal-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="auth-modal-tabs-container">
            <div
              className={`single-auth-modal-tab ${activeTab === "login"}`}
              style={{ cursor: activeTab === "login" ? "auto" : "pointer" }}
              onClick={() => {
                setFormValues({});
                setActiveTab("login");
              }}
            >
              Sign in
            </div>
            <div
              className={`single-auth-modal-tab ${activeTab === "register"}`}
              style={{ cursor: activeTab !== "login" ? "auto" : "pointer" }}
              onClick={() => {
                setFormValues({});
                setActiveTab("register");
              }}
            >
              New account
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              activeTab === "login" ? handleLogin() : handleRegistration();
            }}
          >
            {activeTab === "login" ? (
              <Login {...{ formValues, handleChangeValue, loading }} />
            ) : (
              <Register {...{ formValues, handleChangeValue, loading }} />
            )}
          </form>
        </div>
      </div>
    )
  );
};

export default AuthModal;
