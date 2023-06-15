# Link to Video Presentation
```
https://drive.google.com/file/d/1hXTiHNwLOPEEhYoz6Xr4OYcy29RS_JiB/view?usp=sharing
```

# midterm-project
## React.js and Strapi Authentication Project

This is a project that aims to provide a simple and efficient way to implement user authentication in a [React.js]application using [Strapi] as the backend API.

# final-project
## The Implementation of Cat API!

This is a project that aims to fully implement a functioning Cat API, which randomly generates Cat Pictures/GIFs as well as press a button to randomly generate a new batch of adorable cats!

## Prerequisites

To get started with this project, you will need to have the following installed on your machine:

```
-[Node.js]
-[NPM] or [Yarn]
-[Git]
-[Strapi]
-[React.js]
```

## Installation

1. Install Node.js and NPM/Yarn

- Go to the Node.js website (https://nodejs.org) and download the appropriate installer for your operating system.
Run the installer and follow the instructions to complete the installation.
Verify that Node.js and npm are installed:

- Open a [terminal] or [cmd].
Type node -v and press Enter. This should display the version number of Node.js installed on your system.
Type npm -v and press Enter. This should display the version number of npm installed on your system.
If both commands display version numbers, Node.js and npm are installed and working properly.

2. Install React.js
- Go to your [terminal] or [cmd] and redirect it to your folder on where you want to install [React.js]

- Enter create-react-app <project-name-here> and wait until it's finished.

3. Install Strapi
- Go to the Strapi website (https://strapi.io/)

- Go to your [terminal] or [cmd] and redirect it your your folder on where you want to install [Strapi]

- Enter npx create-strapi-app@latest <project-name-here>

- Answer the prompts that appear and wait until it's finished installing.

- If the [Strapi] installation fails, go back to your [terminal] or [cmd] and enter yarn config set network-timeout 600000 -g
to extend the timeout.

4. Install Git

- Go to this website (https://git-scm.com/downloads)

- Download the latest version of Git

- Install the .exe file.

- If unsure how to install, go to this website (https://phoenixnap.com/kb/how-to-install-git-windows)

5. Install the Packages needed
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
-- Creating the Login Form with Validation --

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

-- Create middleware to protect authenticated routes. --

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

-- Implement logout functionality. --

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

## Cat API

The Cat API is a service that provides access to a collection of cat images and information. It allows you to fetch random cat images, search for specific breeds, and more.

### Random Cat Image

To fetch a random cat image, you can make a GET request to the following endpoint:
- (GET https://api.example.com/cats/random)


This will return a JSON response containing a random cat image URL. You can then use this URL to display the cat image on your website or application.

### Search Cat Breeds

To search for cat breeds, you can make a GET request to the following endpoint:
-- (GET https://api.example.com/cats/breeds?q=<search_query>)
  

Replace `<search_query>` with your desired search term. The API will return a JSON response containing a list of cat breeds that match the search query.

...

(Provide additional examples or API endpoints as needed)

# Updated Implementation of Cat API in my Homepage!
```
import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomNav from "../CustomNav";
import { userData } from "../../helpers";
import "./Home.css";
import backgroundMusic from "../music/vermilion_town.mp3";

const Home = () => {
  const { username } = userData();
  const [catImages, setCatImages] = useState([]);

  useEffect(() => {
    fetchCatImages();
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const fetchCatImages = () => {
    axios
      .get("https://api.thecatapi.com/v1/images/search?limit=9")
      .then((response) => {
        const catImageUrls = response.data.map((image) => image.url);
        setCatImages(catImageUrls);
      })
      .catch((error) => {
        console.error("Error fetching cat images:", error);
      });
  };

  return (
    <div>
      <CustomNav />
      <div className="home">
        <h1>Welcome to Cat Moments, {username}</h1>
        <div className="header">
          <h2>Random Cat Generator!</h2>
          <p>Here's your Randomly Generated Cats using Cat API!</p>
        </div>
        <div className="button-container">
          <button onClick={fetchCatImages}>Generate More Cat Images</button>
        </div>
        <div className="cat-images">
          {catImages.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Cat ${index + 1}`}
              className="cat-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
```





