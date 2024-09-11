import useSliderData from "../../hooks/useSliderData";

const Slider = ({ sliderIndex = 0, isNav }) => {
  const data = useSliderData();

  return (
    <div className="review-image-slider-container">
      <div
        className="review-boxes"
        style={{
          transform: `translateX(${sliderIndex * -100}%)`,
        }}
      >
        {isNav ? (
          <>
            <div className="review-box">
              <img src={data[0]?.img} alt="" />
            </div>
            <div className="review-box">
              <img src={data[1]?.img} alt="" />
            </div>
            <div className="review-box">
              <img src={data[2]?.img} alt="" />
            </div>
            <div className="review-box">
              <img src={data[3]?.img} alt="" />
            </div>
            <div className="review-box">
              <img src={data[4]?.img} alt="" />
            </div>
            <div className="review-box">
              <img src={data[5]?.img} alt="" />
            </div>
            <div className="review-box">
              <img src={data[6]?.img} alt="" />
            </div>
          </>
        ) : (
          <>
            <div className={`review-box ${sliderIndex === 0 ? true : false}`}>
              <img src={data[0]?.img} alt="" />
            </div>
            <div className={`review-box ${sliderIndex === 1 ? true : false}`}>
              <img src={data[1]?.img} alt="" />
            </div>
            <div className={`review-box ${sliderIndex === 2 ? true : false}`}>
              <img src={data[2]?.img} alt="" />
            </div>
            <div className={`review-box ${sliderIndex === 3 ? true : false}`}>
              <img src={data[3]?.img} alt="" />
            </div>
            <div className={`review-box ${sliderIndex === 4 ? true : false}`}>
              <img src={data[4]?.img} alt="" />
            </div>
            <div className={`review-box ${sliderIndex === 5 ? true : false}`}>
              <img src={data[5]?.img} alt="" />
            </div>
            <div className={`review-box ${sliderIndex === 6 ? true : false}`}>
              <img src={data[6]?.img} alt="" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Slider;
