import store from "../lib/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
        <ToastContainer
          position="bottom-left"
          autoClose={2500}
          limit={3}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          // theme="colored"
        />
      </BrowserRouter>
    </Provider>
  );
}

export default AppProviders;
