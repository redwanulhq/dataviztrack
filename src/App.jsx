import AuthModal from "./components/authModal/AuthModal";
import Header from "./components/header/Header";
import Router from "./router";

const App = () => {
  return (
    <div>
      <AuthModal />
      <Header />
      <Router />
    </div>
  );
};

export default App;
