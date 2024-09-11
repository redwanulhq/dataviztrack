import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrData,
  setCurrView,
  setHaveUnsave,
} from "../../lib/slices/homeSlice";
import Papa from "papaparse";
import ReactLoading from "react-loading";
import useApi from "../../hooks/useApi";

const UploadFile = ({ setUnsavedFile }) => {
  const token = useSelector((state) => state?.auth?.token);
  const dispatch = useDispatch();
  const { fetchData } = useApi();
  const [loading, setLoading] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/csv": [],
    },
  });

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("csv", file);
    const endpoint = {
      method: "post",
      url: "/auth/employee/management/",
      data: data,
    };
    const res = await fetchData(endpoint);
    if (res?.created_at) {
      setLoading(false);
      dispatch(setCurrData(res?.attendance_info));
      dispatch(setHaveUnsave(false));
      dispatch(setCurrView("table"));
    }
  };

  useEffect(() => {
    if (acceptedFiles?.length) {
      setLoading(true);
      const file = acceptedFiles[0];
      if (token) {
        uploadFile(file);
      } else {
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            const data = results?.data;
            data?.pop();
            setUnsavedFile(file);
            dispatch(setHaveUnsave(true));
            dispatch(setCurrData(data));
            dispatch(setCurrView("table"));
            setLoading(false);
          },
        });
      }
    }
  }, [acceptedFiles]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "calc(100vh - 66px)",
      }}
    >
      <div
        style={{
          border: "2px dashed #cccccc",
          width: "100%",
          borderRadius: "6px",
          height: "calc(100% - 40px)",
          maxHeight: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: loading ? "auto" : "pointer",
        }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        {loading ? (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "-30px",
            }}
          >
            <p style={{ fontSize: "24px" }}>Parsing CSV</p>
            <ReactLoading
              type="spin"
              color="#333"
              height={"80px"}
              width={"80px"}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "18px", marginBottom: "-5px" }}>
              Drag and Drop, <b>browse from your device</b>
            </p>
            <p>(You can select only CSV file)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
