import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const Login = () => {
  return (
    <div className="h-screen">
      <div className=" max-w-lg bg-white">
        <Tabs value="login">
          <TabsHeader>
            <Tab value="login">Login</Tab>
            <Tab value="signup">Signup</Tab>
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            <TabPanel value="login">
              <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                  Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Enter your details to register.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                  <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Name" />
                    <Input size="lg" label="Email" />
                    <Input type="password" size="lg" label="Password" />
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
                  />
                  <Button className="mt-6" fullWidth>
                    Register
                  </Button>
                  <Typography
                    color="gray"
                    className="mt-4 text-center font-normal"
                  >
                    Already have an account?{" "}
                    <a href="#" className="font-medium text-gray-900">
                      Sign In
                    </a>
                  </Typography>
                </form>
              </Card>
            </TabPanel>
            <TabPanel value="signup">
              <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                  Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Enter your details to register.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                  <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Name" />
                    <Input size="lg" label="Email" />
                    <Input type="password" size="lg" label="Password" />
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
                  />
                  <Button className="mt-6" fullWidth>
                    Register
                  </Button>
                  <Typography
                    color="gray"
                    className="mt-4 text-center font-normal"
                  >
                    Already have an account?{" "}
                    <a href="#" className="font-medium text-gray-900">
                      Sign In
                    </a>
                  </Typography>
                </form>
              </Card>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
