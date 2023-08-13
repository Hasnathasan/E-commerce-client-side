import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Card,
  Input,
  Checkbox,
  Typography,
  CardHeader,
  CardBody,
  Spinner,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import eMart from '../../../public/logo.png'

const Authentication = () => {
  const [type, setType] = useState("login");
  const [loading, setLoading] = useState(false);
  const { loginWithEmail, signUpWithEmail, logOut } =
    useContext(AuthContext);
    const navigate = useNavigate()
  const handleLogin = (event) => {
    setLoading(true)
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const number = form.number.value;
    const password = form.password.value;
    axios
      .get(`https://e-commerce-server-side-eosin.vercel.app/eachUsers?email=${email}`)
      .then((result) => {
        if (result.data.number !== number) {
          setLoading(false)
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Number didn't matched!"
          })

        } else {
          loginWithEmail(email, password)
            .then((result) => {
              Swal.fire(
                'Congratulations',
                'Logged in successfull',
                'success'
              )
              form.reset();
              navigate("/")
              
            })
            .catch((error) => {
              return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.message}`
              })
            });
        }
        setLoading(false)
      });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.emailForSignUp.value;
    const number = form.numberForSignUp.value;
    const password = form.passwordForSignUp.value;
    signUpWithEmail(email, password)
      .then((result) => {
        const newUser = { email: result.user.email, number: number, role: "user" };
        axios.post("https://e-commerce-server-side-eosin.vercel.app/users", newUser).then((data) => {
          if (data.data.insertedId) {
            Swal.fire(
              'Congratulation',
              'Now login to continue',
              'success'
            )
            form.reset();
            logOut();
          }
        });
      })
      .catch((error) => {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.message}`
        })
      });
  };
  return (
    <Card className="w-full max-w-md mx-auto my-6">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center rounded-b-none py-4 px-4 text-center"
      >
        <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
          <img className="w-24" src={eMart} alt="" />
        </div>
      </CardHeader>
      <CardBody>
        <Tabs value={type}>
          <TabsHeader className="relative z-0 ">
            <Tab value="login" onClick={() => setType("login")}>
              Login
            </Tab>
            <Tab value="signup" onClick={() => setType("signup")}>
              Signup
            </Tab>
          </TabsHeader>
          <TabsBody
            className="!overflow-x-hidden"
            animate={{
              initial: {
                x: type === "login" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: type === "login" ? 400 : -400,
              },
            }}
          >
            <TabPanel className="flex justify-center" value="login">
              <Card color="transparent" shadow={false}>
                <form
                  onSubmit={handleLogin}
                  className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96"
                >
                  <div className="mb-4 flex flex-col gap-3">
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      size="lg"
                      label="Email"
                      required
                    />
                    <Input
                      type="number"
                      id="number"
                      name="number"
                      size="lg"
                      label="Number"
                      required
                    />
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      size="lg"
                      label="Password"
                      required
                    />
                  </div>
                  <Checkbox
                    label={
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center font-normal"
                      >
                        I agree the
                        <a
                          href="#"
                          className="font-medium transition-colors hover:text-gray-900"
                        >
                          &nbsp;Terms and Conditions
                        </a>
                      </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                    required
                  />
                  {
                    !loading ? <button className="w-full bg-cyan-500 py-2 rounded-md text-white text-lg hover:bg-cyan-600">
                    Login
                  </button> : <div className="w-full bg-cyan-500 flex justify-center py-2 rounded-md text-white text-lg hover:bg-cyan-600"><Spinner color="blue" /></div>
                  }
                  
                </form>
              </Card>
            </TabPanel>
            <TabPanel className="flex justify-center" value="signup">
              <Card color="transparent" shadow={false}>
                <form
                  onSubmit={handleSignUp}
                  className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96"
                >
                  <div className="mb-4 flex flex-col gap-3">
                    <Input
                      type="text"
                      id="emailForSignUp"
                      name="emailForSignUp"
                      size="lg"
                      label="Email"
                      required
                    />
                    <Input
                      type="number"
                      id="numberForSignUp"
                      name="numberForSignUp"
                      size="lg"
                      label="Number"
                      required
                    />
                    <Input
                      type="password"
                      id="passwordForSignUp"
                      name="passwordForSignUp"
                      size="lg"
                      label="Password"
                      required
                    />
                  </div>
                  <Checkbox
                    label={
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center font-normal"
                      >
                        I agree the
                        <a
                          href="#"
                          className="font-medium transition-colors hover:text-gray-900"
                        >
                          &nbsp;Terms and Conditions
                        </a>
                      </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                    required
                  />
                  <button className="w-full bg-cyan-500 py-2 rounded-md text-white text-lg hover:bg-cyan-600">
                    Register
                  </button>
                </form>
              </Card>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default Authentication;
