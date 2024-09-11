import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import {
  AiOutlineBarChart,
  AiOutlineCloudUpload,
  AiOutlineDelete,
  AiOutlineTable,
} from "react-icons/ai";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { setCurrData, setCurrView } from "../../lib/slices/homeSlice";
import { useDispatch } from "react-redux";
import formatDate from "../../utils/formatDate";
import UNIVERSAL from "../../config";
import ReactLoading from "react-loading";

const FilesList = () => {
  const { fetchData, loading } = useApi();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState([]);

  const removeBase = (url) => {
    return url && url?.startsWith(UNIVERSAL.BASEURL)
      ? url.slice(UNIVERSAL.BASEURL?.length)
      : null;
  };

  const getFiles = async (url) => {
    const endpoint = {
      method: "get",
      url: url || "/auth/employee/management/?limit=10",
    };
    const res = await fetchData(endpoint);
    if (res?.results) {
      setPagination({
        next: removeBase(res?.next),
        previous: removeBase(res?.previous),
      });
      setList(res?.results);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  const handleDestroy = async (id) => {
    setList(list?.filter((sd) => sd?.id !== id));
    const endpoint = {
      method: "delete",
      url: `/auth/employee/management/${id}/`,
    };
    await fetchData(endpoint);
  };

  return (
    <div>
      <div
        style={{
          padding: "20px 0",
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={() => getFiles(pagination?.previous)}
            className={`pagination-btn ${pagination?.previous ? true : false}`}
          >
            <HiOutlineChevronLeft />
          </button>
          <button
            onClick={() => getFiles(pagination?.next)}
            className={`pagination-btn ${pagination?.next ? true : false}`}
          >
            <HiOutlineChevronRight />
          </button>
        </div>
        <button
          style={{
            height: "35px",
            padding: "0 15px",
            border: "1px solid #5986d9",
            backgroundColor: "#fff",
            color: "#5986d9",
            fontSize: "14px",
            borderRadius: "3px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          onClick={() => dispatch(setCurrView("fu"))}
        >
          <AiOutlineCloudUpload fontSize={19} />
          <span>Upload Another File</span>
        </button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "966px" }}>
          <div className="grid-table-row header">
            {["Index", "File", "Created At", "Data Length", "Actions"]?.map(
              (singleItem, i) => (
                <div key={i} className="grid-table-cell">
                  {singleItem}
                </div>
              )
            )}
          </div>
          <div style={{ height: "calc(100vh - 200px)", overflowY: "auto" }}>
            {loading ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReactLoading
                  type="cylon"
                  color="#5886d9"
                  height={"85px"}
                  width={"100px"}
                />
              </div>
            ) : (
              <div>
                {list?.map((singleItem, i) => (
                  <div key={i} className="grid-table-row body">
                    <div className="grid-table-cell">{singleItem?.id}</div>
                    <div
                      className="grid-table-cell"
                      onClick={() => {
                        dispatch(setCurrData(singleItem?.attendance_info));
                        dispatch(setCurrView("table"));
                      }}
                    >
                      {singleItem?.created_at + "-" + singleItem?.id}.csv
                    </div>
                    <div className="grid-table-cell">
                      {formatDate(singleItem?.created_at)}
                    </div>
                    <div className="grid-table-cell">
                      {singleItem?.attendance_info?.length}
                    </div>
                    <div className="grid-table-cell action">
                      <div
                        className="action-btn"
                        onClick={() => {
                          dispatch(setCurrData(singleItem?.attendance_info));
                          dispatch(setCurrView("table"));
                        }}
                      >
                        <AiOutlineTable />
                      </div>
                      <div
                        className="action-btn"
                        onClick={() => {
                          dispatch(setCurrData(singleItem?.attendance_info));
                          dispatch(setCurrView("viz"));
                        }}
                      >
                        <AiOutlineBarChart />
                      </div>
                      <div
                        className="action-btn"
                        onClick={() => handleDestroy(singleItem?.id)}
                      >
                        <AiOutlineDelete />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesList;
