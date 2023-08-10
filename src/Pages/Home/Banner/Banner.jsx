import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import slider1 from '../../../../public/Slider1.jpg'
import slider2 from '../../../../public/Slider2.jpg'
import slider5 from '../../../../public/Slider5.jpg'
const Banner = () => {
    const settings = {
        fade: true,
        infinite: true,
        autoplay: true,
        speed: 700,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false ,
        cssEase: "linear"
      };
    return (
        <div className="w-[95%] mx-auto bg-blue-50 h-[180px] md:h-[480px] mt-4 rounded-lg overflow-hidden">
            <Slider {...settings}>
                <div className=" w-full h-[180px] md:h-[480px]">
                    <div className="h-full bg-center bg-cover bg-no-repeat flex flex-col space-y-2 justify-center ps-2 md:ps-10" style={{backgroundImage: `linear-gradient(to right, #ddffdd71, #dddddd0e),url(${slider1})`}}>
                    <h4 className="md:text-lg font-semibold text-blue-500">Buy What you want</h4>
                        <h1 className="text-2xl md:text-5xl uppercase font-bold">This is Nothing Here</h1>
                        <button className="md:px-4 py-2 w-32 md:w-36 border transition-all duration-200 border-black hover:bg-[#f47f6d80] hover:border-[#f47f6d] hover:text-white">Buy Now</button>
                    </div>
                </div>
                <div className=" w-full h-[180px] md:h-[480px]">
                    <div className="h-full bg-top bg-cover flex bg-no-repeat flex-col space-y-2 justify-center ps-2 md:ps-10" style={{backgroundImage: `linear-gradient(to right, #63b5f89d, #dddddd0e),url(${slider2})`}}>
                    <h4 className="md:text-lg font-semibold text-blue-500">Buy What you want</h4>
                        <h1 className="text-2xl md:text-5xl uppercase font-bold">This is Nothing Here</h1>
                        <button className="md:px-4 py-2 w-32 md:w-36 border transition-all duration-300 border-black hover:bg-[#6df48a93] hover:border-[#6df48a] hover:text-white">Buy Now</button>
                    </div>
                </div>
                <div className=" w-full h-[180px] md:h-[480px]">
                    <div className="h-full bg-center bg-cover flex flex-col bg-no-repeat space-y-2 justify-center ps-2 md:ps-10" style={{backgroundImage: `linear-gradient(to right, #6df48a93, #dddddd0e),url(${slider5})`}}>
                    <h4 className="md:text-lg font-semibold text-blue-500">Buy What you want</h4>
                        <h1 className="text-2xl md:text-5xl uppercase font-bold">Explore All new shows</h1>
                        <button className="md:px-4 py-2 w-32 md:w-36 border transition-all duration-200 border-black hover:bg-[#63b5f89d] hover:border-[#63b5f8] hover:text-white">Buy Now</button>
                    </div>
                </div>
        </Slider>
        </div>
    );
};

export default Banner;