import { Card, Typography } from "@material-tailwind/react";
import useOrders from "../../../Hooks/useOrders";
const ManageOrders = () => {
  const [orders, isOrdersLoading] = useOrders();
  if(isOrdersLoading){
    return <h1>Loading</h1>
  }
  
  return (
    <div className="w-[90%] my-20">
        <Card className="overflow-auto h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
        {
            orders?.length > 0 ? <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Ordered by
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Price
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Category
                </Typography>
              </th>
            </tr>
          </thead> : <div className="text-center overflow-hidden py-40"><h1 className="text-5xl font-bold text-green-500 mb-5">Nothing is here</h1>
          <p className="text-2xl font-semibold text-center">Add Product From All Product</p>
          </div>
        }
        <tbody>
          {orders?.map((product, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {product?.specification.title}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {product?.addedBy}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {product?.price?.real_price} Tk
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {product?.category}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </Card>
    </div>
  );
};

export default ManageOrders;




