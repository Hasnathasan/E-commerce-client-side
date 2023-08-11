import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Rating from "react-rating";
import { FaRegStar, FaStar, FaTag } from "react-icons/fa";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useCarts from "../../Components/useCarts";

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const Details = () => {
  const {id} = useParams();
  const {user} = useContext(AuthContext);
  const [, , refetch] = useCarts();
  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: [`product/${id}`],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products/details?id=${id}`
      );
      return res.json();
    },
  });
  console.log(product);
  
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );
  if (isProductLoading) {
    return <h1>Loading</h1>;
  }
  const { specification, price, category, images, review, rating } = product;
  const cartItem = {addedBy: user?.email, category, images, specification, review, rating}
  const handleAddToCart = () => {
    axios.post(`http://localhost:5000/carts`, cartItem)
      .then(res => console.log(res))
  }
  return (
    <div className="mx-auto max-w-[1160px] my-10 rounded-lg shadow-lg shadow-cyan-50">
      <div className="bg-white flex flex-col md:flex-row p-5 gap-10"> 
        <div className="md:w-[400px]">
          <div ref={sliderRef} className="keen-slider w-full mb-7  border border-gray-400">
            {product.images.map((img, index) => (
              <div
                key={index}
                className="keen-slider__slide number-slide1 w-full h-[380px] p-3"
              >
                <img className="w-full h-full" src={img} alt="" />
              </div>
            ))}
          </div>

          <div ref={thumbnailRef} className="keen-slider thumbnail">
            {product.images.map((img, index) => (
              <div
                key={index}
                className="keen-slider__slide number-slide1 w-16 h-16 border border-dashed border-gray-400"
              >
                <img src={img} className=" cursor-pointer w-full h-full" alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="pt-10 space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-700">{specification?.title}</h1>
            <div className="flex items-center gap-5 relative">
            <Rating
                    className="text-orange-400"
                    emptySymbol={<FaRegStar></FaRegStar>}
                    fullSymbol={<FaStar></FaStar>}
                    fractions={2}
                    initialRating={product.rating}
                    readonly
            />
            <p className=" absolute -top-[3px] left-24">{product.rating} rating | {product.review} review</p>
            </div>
            <p>Brand: {specification.brand}</p>
            <div className="flex gap-5">
                <h5 className="text-xl text-gray-400 font-semibold line-through">TK. {price.real_price}</h5>
                <h5 className="text-xl font-semibold text-gray-700">TK. {price.discounted_price}</h5>
                <p className="text-sm text-gray-600">You save TK.{price.real_price - price.discounted_price}  ({parseInt(((price.real_price-price.discounted_price) / price.real_price ) * 100)}%)</p>
            </div>
            <div>
            <p className="text-green-500 text-sm flex mt-16 items-center gap-2"><FaTag></FaTag>১০% অতিরিক্ত ছাড় ও নিশ্চিত ফ্রি শিপিং পশ্চিমবঙ্গের ৭৯৯+৳ বাংলা বই অর্ডারে।</p>
            <p className="text-green-500 text-sm flex my-3 items-center gap-2"><FaTag></FaTag>BD এর প্রতিটি পণ্যের সাথে নিশ্চিত ১টি 35ml Rin liquid ফ্রি! এছাড়াও ২৯% পর্যন্ত ছাড়!</p>
            <button onClick={ () => handleAddToCart()} className="md:px-4 py-2 w-32 md:w-36 border border-black hover:bg-[#63b5f8] hover:border-[#63b5f8] hover:text-white">Add to Cart</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
