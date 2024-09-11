import {
  AiOutlineCloudUpload,
  AiOutlinePrinter,
  AiOutlineTable,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAuth } from "../../lib/slices/headerSlice";
import { setCurrView } from "../../lib/slices/homeSlice";
import { useRef, useState } from "react";
import PieChartViz from "./PieChartViz";
import {
  HiDownload,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import BarChartViz from "./BarChartViz";
import LineGraphViz from "./LineGraphViz";
import html2canvas from "html2canvas";
import ReactToPrint from "react-to-print";
import useWindowSize from "../../hooks/useWindowSize";

const Vizualization = () => {
  const { have_unsave } = useSelector((state) => state?.home);
  const dispatch = useDispatch();
  const [chartIndex, setChartIndex] = useState(1);
  const { width } = useWindowSize();

  let printableContentRef = useRef();

  const downloadChartAsImage = () => {
    const chartContainer = document.querySelector(".recharts-wrapper"); // Get the chart's container
    const image = new Image();

    html2canvas(chartContainer).then((canvas) => {
      image.src = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image.src;
      link.download = "chart.png";
      link.click();
    });
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
            onClick={() => dispatch(setCurrView("table"))}
          >
            <AiOutlineTable fontSize={19} />
            <span>{width > 700 ? "View In Table" : "Table"}</span>
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
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <ReactToPrint
            documentTitle="dataviztrack"
            trigger={() => (
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
                onClick={downloadChartAsImage}
              >
                <AiOutlinePrinter fontSize={19} />
                {width > 700 ? <span>Print</span> : ""}
              </button>
            )}
            content={() => printableContentRef.current}
          />
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
            onClick={downloadChartAsImage}
          >
            <HiDownload fontSize={19} />
            {width > 700 ? <span>Download Chart</span> : ""}
          </button>
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
            {width > 700 ? <span>Upload Another File</span> : ""}
          </button>
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "600px" }}>
          <div
            style={{
              height: "calc(100vh - 160px)",
              overflowY: "auto",
              borderTop: "1px solid #ddd",
            }}
          >
            <div className="chart-header">
              <button
                onClick={() =>
                  setChartIndex(chartIndex === 1 ? 3 : chartIndex - 1)
                }
                className="chart-header-btn"
              >
                <HiOutlineChevronLeft />
              </button>
              <p className="chart-title">
                {chartIndex === 1
                  ? "Check in and check out time frame"
                  : chartIndex === 2
                  ? "Employee-wise Total Working Hours"
                  : "Date-wise Total Working Hours"}
              </p>
              <button
                onClick={() =>
                  setChartIndex(chartIndex === 3 ? 1 : chartIndex + 1)
                }
                className="chart-header-btn"
              >
                <HiOutlineChevronRight />
              </button>
            </div>
            <div ref={printableContentRef}>
              {chartIndex === 1 ? (
                <BarChartViz />
              ) : chartIndex === 2 ? (
                <PieChartViz />
              ) : (
                <LineGraphViz />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vizualization;
