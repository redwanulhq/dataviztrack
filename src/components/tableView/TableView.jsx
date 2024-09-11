import { useDispatch, useSelector } from "react-redux";
import { AiOutlineBarChart, AiOutlineCloudUpload } from "react-icons/ai";
import { setOpenAuth } from "../../lib/slices/headerSlice";
import { setCurrView } from "../../lib/slices/homeSlice";

const TableView = () => {
  const { curr_data, have_unsave } = useSelector((state) => state?.home);
  const dispatch = useDispatch();

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
            style={{
              height: "35px",
              padding: "0 15px",
              backgroundColor: "#5986d9",
              border: "none",
              color: "#fff",
              fontSize: "14px",
              borderRadius: "3px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            onClick={() => dispatch(setCurrView("viz"))}
          >
            <AiOutlineBarChart fontSize={19} />
            <span>Visualize</span>
          </button>
          {have_unsave && (
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
              }}
              onClick={() => dispatch(setOpenAuth(true))}
            >
              Save Data
            </button>
          )}
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
      <div
        style={{
          height: "calc(100vh - 160px)",
          overflowY: "auto",
        }}
      >
        <table>
          <tbody>
            <tr>
              <td>Employee ID</td>
              <td>Employee Name</td>
              <td>Designation</td>
              <td>Date</td>
              <td>Check In</td>
              <td>Check Out</td>
            </tr>
            {curr_data?.map((row, i) => (
              <tr key={i}>
                <td>{row["Employee ID"]}</td>
                <td>{row["Employee Name"]}</td>
                <td>{row["Designation"]}</td>
                <td>{row["Date"]}</td>
                <td>{row["Check-In Time"]}</td>
                <td>{row["Check-Out Time"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;
