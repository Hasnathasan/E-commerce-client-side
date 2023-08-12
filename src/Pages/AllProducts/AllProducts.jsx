import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
const AllProducts = () => {
  const [products, isProductsLoading] = useProducts();
  console.log(products);
  if(isProductsLoading){
    return <h1>Loading</h1>
  }
  
  return (
    <div className="w-[95%] md:w-[80%] mx-auto my-20">
        <Card className="overflow-auto h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
        {
            products?.length > 0 ? <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Brand
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Category
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Details
                </Typography>
              </th>
            </tr>
          </thead> : <div className="text-center overflow-hidden py-40"><h1 className="text-5xl font-bold text-green-500 mb-5">Nothing is here</h1>
          <p className="text-2xl font-semibold text-center">Add Product From All Product</p>
          </div>
        }
        <tbody>
          {products?.map((product, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {product.specification.title}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {product.specification.brand}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {product.category}
                </Typography>
              </td>
              <td className="p-4">
              <Link to={`/details/${product._id}`} ><button className="md:px-4 py-2 w-20 md:w-32 border border-black hover:bg-[#63b5f8] hover:border-[#63b5f8] hover:text-white">View Details</button></Link> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </Card>
    </div>
  );
};

export default AllProducts;




