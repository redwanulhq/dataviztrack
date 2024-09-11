import "./design.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import Slider from "./Slider";
import { useState } from "react";
import useSliderData from "../../hooks/useSliderData";

const Design = () => {
  const [sliderIndex, setSliderIndex] = useState(1);
  const data = useSliderData();

  return (
    <div className="container">
      <div
        style={{
          height: "calc(100vh - 68px)",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="slider-grid">
          <div className="slider-arrow-container left">
            <Slider sliderIndex={sliderIndex - 1} isNav />
            <div
              className="slider-nav-overlay"
              style={{
                pointerEvents: sliderIndex > 1 ? "all" : "none",
                color: sliderIndex > 1 ? "#fff" : "#ffffff47",
              }}
              onClick={() =>
                setSliderIndex(sliderIndex > 1 ? sliderIndex - 1 : 0)
              }
            >
              <FiChevronLeft />
            </div>
          </div>
          <div className="main-slider-container">
            <div className="main-slider-grid">
              <Slider sliderIndex={sliderIndex} />
              <div className="main-slider-content">
                <div className="review-text-container">
                  <div className="quote-container">
                    <BiSolidQuoteAltLeft />
                    <BiSolidQuoteAltRight />
                  </div>
                  <p>{data[sliderIndex]?.review}</p>
                </div>
                <div className="slider-content-footer">
                  <div>{data[sliderIndex]?.name}</div>
                  <div>{data[sliderIndex]?.designation}</div>
                  <div>{data[sliderIndex]?.company}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="slider-arrow-container right">
            <Slider sliderIndex={sliderIndex + 1} isNav />
            <div
              className="slider-nav-overlay"
              style={{
                pointerEvents: sliderIndex < 5 ? "all" : "none",
                color: sliderIndex < 5 ? "#fff" : "#ffffff47",
              }}
              onClick={() =>
                setSliderIndex(sliderIndex < 5 ? sliderIndex + 1 : 0)
              }
            >
              <FiChevronRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;
