import { Button, Card, Chip, Typography } from "@material-tailwind/react";
import axios from "axios";
import useUsers from "../../../Components/useUsers";
const ManageUsers = () => {
  const [users, isUsersLoading, refetch] = useUsers()
  const handleRoleChange = (email, role) => {
    console.log(email, role);
    axios.patch(`http://localhost:5000/changeUserRole/${email}`, {role})
        .then(data => {
            console.log(data.data)
            if(data.data.modifiedCount > 0){
                refetch()
            }
        })
  };
  if(isUsersLoading){
    return <h1>Loading</h1>
  }
  return (
    <div className="w-[90%] my-20">
        <Card className="overflow-auto h-full w-full">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Email
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Number
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Role
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Change User Role
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ email, number, role }, index) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {email}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {number}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-center"
                    >
                      <Chip className="w-min" variant="ghost" value={role} />
                    </Typography>
                  </td>
                  <td className="p-4 space-x-2">
                    <Button
                      onClick={() => handleRoleChange(email, "admin")}
                      color="red"
                      disabled={role === "admin"}
                    >
                      Admin
                    </Button>
                    <Button onClick={() => handleRoleChange(email, "user")} color="green" disabled={role === "user"}>User</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
    </div>
  );
};

export default ManageUsers;
