import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

const AddClass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState([])
  const onSubmit = async(data) => {
    const { title, summary, brand, real_price, discounted_price, category, images, review, rating } = data;
    setSelectedFile(images[0])
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBBAPI}`, {
          method: 'POST',
          body: formData,
        });
  
  
        if (response.ok) {
            const data = await response.json();
            setImage(data.data.url)
        } else {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: "Try to upload another image. You can't use same image twice!"
              })
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
  
    const newProduct = {
      category,
      images: [image],
      review: parseInt(review),
      rating: parseInt(rating),
      price: {real_price: parseInt(real_price), discounted_price: parseInt(discounted_price)},
      specification: { title, brand, summary}
    };

    axios.post('https://e-commerce-server-side-eosin.vercel.app/products', newProduct)
        .then(res => {
            if(res.data.insertedId){
                reset()
                Swal.fire(
                    'Product Added',
                    'It will visible to users',
                    'success'
                  )
            }
        })

  };
  return (
    <div className="w-full my-16">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] mx-auto card bg-white shadow-lg p-10">
        <h2 className="text-3xl font-bold text-slate-500 mb-4 text">Add a new Product</h2>
        <div className="grid gap-4 items-center justify-center sm:grid-cols-2 sm:gap-6">
          <div className="">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Name
            </label>
            {errors.title?.type === "required" && (
              <p className="text-red-500" role="alert">
                Product Name is required
              </p>
            )}
            <input
              type="text"
              {...register("title", { required: true })}
              name="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type Product Name"
            />
          </div>
          <div className="">
            <label
              htmlFor="images"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            {errors.images?.type === "required" && (
              <p className="text-red-500" role="alert">
                Image is required
              </p>
            )}
            <input
              type="file"
              {...register("images", { required: true })}
              name="images"
              id="images"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Class image url"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            {errors.category?.type === "required" && (
              <p className="text-red-500" role="alert">
                Category Name is required
              </p>
            )}
            <select name="category" id="category" {...register("category", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" >
                <option value="cosmetics">cosmetic</option>
                <option value="electronic">electronic</option>
                <option value="fashion">fashion</option>
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="brand"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Brand
            </label>
            {errors.brand?.type === "required" && (
              <p className="text-red-500" role="alert">
                Brand Name is required
              </p>
            )}
            <input
              type="text"
              {...register("brand", { required: true })}
              name="brand"
              id="brand"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="rating"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              rating
            </label>
            {errors.rating?.type === "required" && (
              <p className="text-red-500" role="alert">
                rating is required
              </p>
            )}
            <input
              type="number"
              {...register("rating", { required: true })}
              name="rating"
              id="rating"
              max={5}
              min={0}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="review"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Total reviews
            </label>
            {errors.reviews?.type === "required" && (
              <p className="text-red-500" role="alert">
                reviews is required
              </p>
            )}
            <input
              type="number"
              {...register("review", { required: true })}
              name="review"
              id="review"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="real_price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Real Price
            </label>
            {errors.real_price?.type === "required" && (
              <p className="text-red-500" role="alert">
                Real Price is required
              </p>
            )}
            <input
              type="number"
              {...register("real_price", { required: true })}
              name="real_price"
              id="real_price"
              placeholder="300 Tk"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="discounted_price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Discounted price
            </label>
            {errors.discounted_price?.type === "required" && (
              <p className="text-red-500" role="alert">
                Discounted price is required
              </p>
            )}
            <input
              type="number"
              {...register("discounted_price", { required: true })}
              name="discounted_price"
              id="discounted_price"
              placeholder="250 Tk"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
        </div>
        <label
              htmlFor="summary"
              className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              Summary
            </label>
            {errors.summary?.type === "required" && (
              <p className="text-red-500" role="alert">
                Summary is required
              </p>
            )}
        <textarea {...register("summary", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" name="summary" id="summary" cols="30" rows="5"></textarea>
        <Button className="mt-5" type="submit" color="blue">
          Add Class
        </Button>
      </form>
    </div>
  );
};

export default AddClass;
