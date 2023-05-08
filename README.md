# midterm-project
## React.js and Strapi Authentication Project

> This is a project that aims to provide a simple and efficient way to implement user authentication in a [React.js]application using [Strapi] as the backend API.

## Prerequisites

> To get started with this project, you will need to have the following installed on your machine:

-[Node.js]
-[NPM] or [Yarn]
-[Git]
-[Strapi]
-[React.js]

## Installation

1. Install Node.js and NPM/Yarn

> Go to the Node.js website (https://nodejs.org) and download the appropriate installer for your operating system.
Run the installer and follow the instructions to complete the installation.
Verify that Node.js and npm are installed:

> Open a [terminal] or [cmd].
Type node -v and press Enter. This should display the version number of Node.js installed on your system.
Type npm -v and press Enter. This should display the version number of npm installed on your system.
If both commands display version numbers, Node.js and npm are installed and working properly.

2. Install React.js
> Go to your [terminal] or [cmd] and redirect it to your folder on where you want to install [React.js]

> Enter create-react-app <project-name-here> and wait until it's finished.

3. Install Strapi
> Go to the Strapi website (https://strapi.io/)

> Go to your [terminal] or [cmd] and redirect it your your folder on where you want to install [Strapi]

> Enter npx create-strapi-app@latest <project-name-here>

> Answer the prompts that appear and wait until it's finished installing.

> If the [Strapi] installation fails, go back to your [terminal] or [cmd] and enter yarn config set network-timeout 600000 -g
to extend the timeout.

4. Install the Packages needed
```
[axios] - npm install axios
[bootstrap] - npm install bootstrap
[react] - npm install react
[react-dom] - npm install react-dom
[react-router-dom] - npm install react-router-dom
[react-scripts] - npm install react-scripts
[react-toastify] - npm install react-toastify
[reactstrap] - npm install reactstrap
```

## Implementing the React.js Application
> -- Creating the Login Form with Validation --

```
const initialUser = { password: "", identifier: "" };

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleChange = ({target}) => {
    const {name, value}= target;
    setUser((currentUser) => ({
        ...currentUser,
        [name]: value,
    }))
  };

  const handleLogin =  async () => {
    const url = `http://localhost:1337/api/auth/local`;
    try {
        if(user.identifier && user.password){
            const {data} = await axios.post(url, user)
            if(data.jwt){
                storeUser(data);
                toast.success("Logged in successfully!", {
                    hideProgressBar: true,
                });
                setUser(initialUser)
                navigate('/')
            }
        }
    } catch (error) {
        toast.error(error.message, {
            hideProgressBar: true,
        });  
    }
  };

  return (
    <Row className="login">
      <Col sm="12" md={{ size: 4, offset: 4 }}>
        <div>
          <h1>Bread Directory</h1>
          <h2>Login</h2>
          <FormGroup>
            <Input
              type="email"
              name="identifier"
              value={user.identifier}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </FormGroup>
          <Button color="primary" onClick={handleLogin}>
            Login
          </Button>
          <h6>
            Click <Link to='/registration'>Here</Link> to Sign up!
          </h6>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
```

> -- Create middleware to protect authenticated routes. --

```
export const Protector = ({ Component }) => {
    const navigate = useNavigate();
  
    const { jwt } = userData();
  
    useEffect(() => {
      if (!jwt) {
        navigate("/login");
      }
    }, [navigate, jwt]);
  
    return < Component />;
  };
```

> -- Implement logout functionality. --

```
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", "");
    navigate("/login");
  }, [navigate]);

  return null;
};
  
export default Logout;
```

## Usage

1. Start the React.js App and Strapi App by redirecting the folders you installed them in separate [terminal] or [cmd]
2. Type npm start 
3. Wait until the both of them boot up. They should automatically open up in your browser. If not, manually enter the link provided in
the terminal to your url bar to open the application.
4. If everything done successfully, you should be redirected to the LOGIN page.
5. If you don't have an account, click the REGISTER button below.
6. If you are done registering, it should redirect you to the LOGIN page again.
7. LOGIN with your email and password. If done right you would be redirected to the HOME page.
8. LOGOUT after you are done.



