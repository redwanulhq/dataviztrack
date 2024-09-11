import { useDispatch, useSelector } from "react-redux";
import { setOpenAuth } from "../../lib/slices/headerSlice";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { logout } from "../../lib/slices/authSlice";
import { setCurrView } from "../../lib/slices/homeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";

const Header = () => {
  const view = useSelector((state) => state?.home?.curr_view);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const first_path = location?.pathname?.split("/")[1];
  const { width } = useWindowSize();

  return (
    <div style={{ borderBottom: "1px solid #ddd" }}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "65px",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            letterSpacing: "1.4px",
            cursor: "pointer",
          }}
          onClick={() => navigate("../")}
        >
          DataVizTrack
        </div>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {width > 540 && (
            <button
              style={{
                border: "none",
                height: "34px",
                cursor: "pointer",
                backgroundColor: "#fff",
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                textTransform: "capitalize",
                marginBottom: "-1px",
                borderBottom:
                  first_path === "design"
                    ? "1px solid #5886d9"
                    : "1px solid #fff",
                pointerEvents: first_path === "design" ? "none" : "auto",
              }}
              onClick={() => {
                navigate("./design");
              }}
            >
              Design
            </button>
          )}
          {auth?.token && (
            <button
              style={{
                border: "none",
                height: "34px",
                cursor: "pointer",
                backgroundColor: "#fff",
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                textTransform: "capitalize",
                marginBottom: "-1px",
                borderBottom:
                  view === "list" && !first_path
                    ? "1px solid #5886d9"
                    : "1px solid #fff",
                pointerEvents: !first_path && view === "list" ? "none" : "auto",
              }}
              onClick={() => {
                navigate("../");
                dispatch(setCurrView("list"));
              }}
            >
              {width > 380 ? "All Uploaded files" : "All files"}
            </button>
          )}
          {auth?.token ? (
            <button
              style={{
                border: "none",
                height: "34px",
                backgroundColor: "#fff",
                cursor: "pointer",
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                textTransform: "capitalize",
              }}
              onClick={() => dispatch(logout())}
            >
              {width > 460 && <span>{auth?.username}</span>}
              <span>
                <RiLogoutCircleRLine fontSize={19} color="red" />
              </span>
            </button>
          ) : (
            <button
              style={{
                border: "none",
                height: "34px",
                backgroundColor: "#333",
                color: "white",
                cursor: "pointer",
                padding: "0 24px",
                borderRadius: "25px",
                fontSize: "14px",
              }}
              onClick={() => dispatch(setOpenAuth(true))}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
