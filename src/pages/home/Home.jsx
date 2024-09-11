import { useDispatch, useSelector } from "react-redux";
import UploadFile from "../../components/uploadFile/UploadFile";
import TableView from "../../components/tableView/TableView";
import Vizualization from "../../components/vizualization/Vizualization";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import FilesList from "../../components/filesList/FilesList";
import { setHaveUnsave } from "../../lib/slices/homeSlice";

const Home = () => {
  const token = useSelector((state) => state?.auth?.token);
  const view = useSelector((state) => state?.home?.curr_view);
  const [unsavedFile, setUnsavedFile] = useState(null);
  const { fetchData } = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    const uploadFile = async () => {
      const data = new FormData();
      data.append("csv", unsavedFile);
      const endpoint = {
        method: "post",
        url: "/auth/employee/management/",
        data: data,
      };
      const res = await fetchData(endpoint);
      if (res?.created_at) {
        dispatch(setHaveUnsave(false));
        setUnsavedFile(null);
      }
    };
    if (token && unsavedFile) uploadFile();
  }, [token]);

  return (
    <div>
      <div className="container">
        {view === "table" ? (
          <TableView />
        ) : view === "viz" ? (
          <Vizualization />
        ) : token && view === "list" ? (
          <FilesList />
        ) : (
          <UploadFile {...{ setUnsavedFile }} />
        )}
      </div>
    </div>
  );
};

export default Home;
