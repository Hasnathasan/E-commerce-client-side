import {
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import useCarts from "../../Components/useCarts";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Cart = () => {
  const [carts, isCartsLoading, refetch] = useCarts();
  const {loading} = useContext(AuthContext)
  console.log(carts);
  if (isCartsLoading && loading) {
    return <h1>Loading</h1>;
  }
  const handleDelete = id => {
    axios.delete(`http://localhost:5000/deleteCart?id=${id}`)
        .then(res => {
          Swal.fire(
            'Product removed from cart',
            'Add New products from all product',
            'success'
          )
            refetch()
            console.log(res)
        })
  }
  return (
    <Card className="container mx-auto h-full w-full overflow-auto my-20">
      <table className="w-full min-w-max table-auto text-left">
        {
            carts?.length > 0 ? <thead>
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
                  Product Type
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
                  Delete
                </Typography>
              </th>
            </tr>
          </thead> : <div className="text-center overflow-hidden py-40"><h1 className="text-5xl font-bold text-green-500 mb-5">Nothing is here</h1>
          <p className="text-2xl font-semibold text-center">Add Product From All Product</p>
          </div>
        }
        <tbody>
          {carts?.map((cart, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {cart.specification.title}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {cart.specification.brand}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {cart.specification.product_type}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {cart.category}
                </Typography>
              </td>
              <td>
                <Tooltip content="Delete from cart">
                  <IconButton className="text-red-600" onClick={() => handleDelete(cart._id)} variant="text">
                    <FaTrash></FaTrash>
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Cart;
