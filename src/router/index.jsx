import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Design from "../pages/design/Design";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="design" element={<Design />} />
      <Route
        path="*"
        exact={true}
        element={
          <div className="container">
            <div
              style={{
                display: "flex",
                height: "calc(100vh - 68px)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>Not Found!</p>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default Router;
