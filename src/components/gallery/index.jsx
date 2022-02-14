import React, { useCallback, useEffect, useRef, useState } from "react";
import './index.css';
import Slider from "react-slick";

const Gallery = ({title, subTitle, data = [], index = 0, close }) => {
 const settings = {
  dots: false,
  arrows: false,
  focusOnSelect: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  touchThreshold: 1000,
  swipeToSlide: true,
  swipe: true,
  draggable: true,
  fade: true,
  accessibility: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        fade: false,
      },
    },
  ],
 }
const [active, setActive] = useState(0);
const [currentNumber, setCurrentNumber] = useState(`${active+1}/${data.length}`)
const myRef = useRef(null);
const carouselRef = useRef(null);
const scrollIntoView = useCallback(() => {
  const el = myRef.current;
  if (el) {
    setTimeout(() => {
      const element = el.querySelector(".thumb-active");
      element && element.scrollIntoView();
    }, 0);
  }
},[])

const onChange = useCallback((ind) => {
  setActive(ind);
  scrollIntoView();
  setCurrentNumber(`${ind+1}/${data.length}`);
},[scrollIntoView, setActive, setCurrentNumber, data])

const changeSlide = useCallback((ind) => {
  setActive(ind);
  scrollIntoView();
  setCurrentNumber(`${ind+1}/${data.length}`);
  carouselRef.current.slickGoTo(ind);
},[setActive, scrollIntoView, setCurrentNumber, data])



const detestClick = useCallback((e) => {
  switch (e.keyCode) {
    case 37:
      carouselRef.current.slickPrev();
      break;
    case 39:
     carouselRef.current.slickNext();
      break;
    default:
      break;
  }
},[])

const triggerLeft = useCallback(() => {
  carouselRef.current.slickNext();
},[]);

const triggerRight = useCallback(() => {
  carouselRef.current.slickPrev();
},[]);

useEffect(()=>{
  document.addEventListener("keydown", (event) => {
    detestClick(event);
  });
  if (index) {
    changeSlide(this.index);
  }
}, [changeSlide, detestClick, index])
useEffect(() => {
  return () => {
    document.removeEventListener("keydown", (event) => {
      detestClick(event);
    });
  };
}, [detestClick]);

  return (
    <div className="md:flex md:p-8 fixed top-0 left-0 w-full h-full items-center justify-center z-50">
      <div className="overlay" onClick={close}></div>
      <div className="bg-white shadow-shadow-6 md:rounded-20 overflow-auto h-full relative z-20">
        <div className="py-4 px-6 md:px-12 border-00 border-b  border-solid border-gray-3">
          <h2 className="text-2xl font-medium">{ title }</h2>
        </div>
        <div className="absolute top-2 right-3 cursor-pointer" onClick={close}>
          <i className="fa fa-times-circle-o text-xl" aria-hidden="true"></i>
        </div>
        <div className="grid grid-cols-1 md:flex px-6 md:px-12 w-full pb-6 h-custom-80">
          <div
            className="md:max-w-320 w-full pt-4 md:pr-4 border-00 border-solid md:border-r md:border-gray-3"
          >
            <h3 className="font-medium text-xl">
              { subTitle? subTitle : 'Gallery' }
            </h3>
            <div
              className="md:max-h-screen-2 overflow-auto pb-3 md:pb-0 md:pr-3 scroll-section w-full"
            >
              <div className="flex flex-nowrap overflow-visible md:grid md:grid-cols-2 gap-1" ref={myRef}>
                {
                  data.map((item, i)=> (
                    <div
                      className={`relative border-2 border-solid border-transparent cursor-pointer h-20 min-w-20 overflow-hidden ${i === active? 'border-black thumb-active': ''}`}
                      key={'galerry-' + i}
                      onClick={()=>changeSlide(i)}
                    >
                      <img src={item.image.url} className="w-full h-full object-cover" alt="" />
                    </div>
                  ))
                }
                
              </div>
            </div>
          </div>
          <div className="w-full md:pl-4 pt-4 overflow-hidden relative">
            <div className="arrow-left cursor-pointer" onClick={triggerLeft}>
              <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
            </div>
            <div className="arrow-right cursor-pointer" onClick={triggerRight}>
              <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
            </div>
            <Slider ref={carouselRef} {...settings} afterChange={onChange}
            >
              {
                data.map((item, i) => <div
                className="bg-black text-center md:h-screen-2"
                key={'gallery-image-' + i}
              >
                <div className="h-full w-full leading-0">
                  <img className="object-cover h-full w-full" src={item.image.url} alt="" />
                </div>
              </div>)
              }
              
            </Slider>
            <div className="mt-3 flex justify-between">
              <div>
                { currentNumber }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery;
