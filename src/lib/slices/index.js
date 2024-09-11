import authSlice from "./authSlice";
import headerSlice from "./headerSlice";
import homeSlice from "./homeSlice";

const reducer = {
  auth: authSlice,
  header: headerSlice,
  home: homeSlice,
};

export default reducer;
