import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import useCarts from "../../Hooks/useCarts";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Cart = () => {
  const {user} = useContext(AuthContext)
  const [carts, isCartsLoading, refetch] = useCarts();
  const [totalBalance, setTotalBalance] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const {loading} = useContext(AuthContext)
  useEffect( () => {
    const total = carts?.reduce((balance, cart) => balance + parseInt(cart?.price?.real_price), 0)
    setTotalBalance(total)
  },[carts])
  
  console.log(carts);
  if (isCartsLoading && loading) {
    return <h1>Loading</h1>;
  }
  const orders = carts?.map(({addedBy, category, price, specification}) => {return  {addedBy, category, price, specification}})
  console.log(orders);
  const handleDelete = id => {
    axios.delete(`http://localhost:5000/deleteCart?id=${id}`)
    .then(res => {
      if(res.data.deletedCount > 0){
        Swal.fire(
          'Product removed from cart',
          'Add New products from all product',
          'success'
          )
          refetch()
      }
      })
    }
    const handlePayment = event => {
      event.preventDefault()
      axios.post(`http://localhost:5000/orders`, orders)
    .then(res => {
      if(res.data.insertedCount > 0){
        axios.delete(`http://localhost:5000/deletefullCart/${user?.email}`)
        .then(res => {
          if(res.data.deletedCount > 0){
            Swal.fire(
              'Congratulations!',
              'Your payment is successful',
              'success'
              )
              refetch()
          }
          })
      }
      })
    }
    
  return (
    <div className="container mx-auto">
    
    {
      carts?.length > 0 ? <div>
        <Card className=" max-w-[400px] p-6 my-8">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Total: {totalBalance} TK</span> 
            <button onClick={handleOpen} className="md:px-4 py-2 w-20 md:w-28 border border-black hover:bg-[#44a849] hover:border-[#44a849] hover:text-white">Pay</button>
            </div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <form onSubmit={handlePayment}>
            <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Payment
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Your Name" size="lg" required/>
            <Input label="Card Number" size="lg" required/>
            <Input type="date" label="Expiration date" size="lg" required/>
            <Input label="CVC" size="lg" required/>
          </CardBody>
          <CardFooter className="pt-0">
            <button className="bg-green-500 rounded-lg py-2 w-full hover:bg-green-600 text-white text-lg"  >
              Pay
            </button>
          </CardFooter>
          </form>
          
        </Card>
      </Dialog>
          </Card>
         <Card className=" h-full w-full overflow-auto mb-40">
        
      <table className="w-full min-w-max table-auto text-left">
        <thead>
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
                  Price
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
          </thead> 
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
                  {cart.price.real_price}
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
    </Card></div>: <Card className="text-center w-[70%] mx-auto my-16 overflow-hidden py-40"><h1 className="text-5xl font-bold text-green-500 mb-5">Nothing is here</h1>
          <p className="text-2xl font-semibold text-center">Add Product From All Product</p>
          </Card>
    }
    </div>
  );
};

export default Cart;
