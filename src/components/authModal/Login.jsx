import { useState } from "react";
import { RiKey2Line, RiUser6Line } from "react-icons/ri";
import LoadingBtn from "../ui/LoadingBtn";

const Login = ({ formValues, handleChangeValue, loading }) => {
  const [passShow, setPassShow] = useState(false);

  return (
    <div className="auth-modal-form-container">
      <div className="single-auth-input-box">
        <div className="saib-icon">
          <RiUser6Line />
        </div>
        <input
          value={formValues?.username}
          onChange={handleChangeValue}
          name="username"
          placeholder="Username"
          required
        />
      </div>
      <div className="single-auth-input-box sai-pass-box">
        <div className="saib-icon">
          <RiKey2Line />
        </div>
        <input
          type={passShow ? "text" : "password"}
          value={formValues?.password}
          onChange={handleChangeValue}
          name="password"
          placeholder="Password"
          required
        />
        <div onClick={() => setPassShow(!passShow)}>
          {passShow ? "Hide" : "Show"}
        </div>
      </div>
      <div className="forgot-pass-link">Forgot your password?</div>
      {loading ? (
        <LoadingBtn height={"50px"} />
      ) : (
        <button className="auth-from-submit-btn" type="submit">
          Login
        </button>
      )}
    </div>
  );
};

export default Login;
