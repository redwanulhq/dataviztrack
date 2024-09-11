import ReactLoading from "react-loading";

const LoadingBtn = ({ height, isSmall }) => {
  return (
    <div
      style={{
        height: height || "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#333",
        borderRadius: "3px",
        width: "100%",
      }}
    >
      <ReactLoading
        type="cylon"
        color="#fff"
        height={isSmall ? "44px" : "55px"}
        width={isSmall ? "45px" : "56px"}
      />
    </div>
  );
};

export default LoadingBtn;
