import { useState } from "react";
import { RiUser6Line, RiKey2Line } from "react-icons/ri";
import LoadingBtn from "../ui/LoadingBtn";

const Register = ({ formValues, handleChangeValue, loading }) => {
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
          type="text"
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
      <div className="single-auth-input-box">
        <div className="saib-icon">
          <RiKey2Line />
        </div>
        <input
          type={passShow ? "text" : "password"}
          value={formValues?.confirm_password}
          onChange={handleChangeValue}
          name="confirm_password"
          placeholder="Confirm password"
          required
        />
      </div>

      {loading ? (
        <LoadingBtn height={"50px"} />
      ) : (
        <button className="auth-from-submit-btn" type="submit">
          Create Account
        </button>
      )}
    </div>
  );
};

export default Register;
