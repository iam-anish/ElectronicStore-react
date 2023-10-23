import { Col, Container, Row, Card, Form, Button,Spinner, Alert } from "react-bootstrap";
import Base from "../components/Base";
import Logo from "../assest/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user.service";
import UserContext from "../context/UserContext";

const Login = () => {

  const redirect = useNavigate()  
  const userContext = useContext(UserContext);

  let [data,setData] = useState({
    email: null,
    password: null
  })

  //handleChange
  const handleChange = (event,property) => {
    setData({
        ...data,
        [property]: event.target.value 
    })
  }

  const clearData = () => {
    setData({
        email: "",
        password: ""
    })
    setErrorData({
        isError: false,
        errorData: null
    })
  }

  const [errorData,setErrorData] = useState({
    isError: false,
    errorData: null
  })

  const [loading, setLoading] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    console.log(data)
    if(data.email===undefined || data.email.trim()===""){
       toast.error("Email is required") 
       return
    }
    if(data.password===undefined || data.password.trim()===""){
       toast.error("Password is required")
       return
    }

    // api call
    setLoading(true);
    loginUser(data).then((userData)=>{
        console.log(userData)
        toast.success("Login successfully !!");
        clearData();
        setErrorData({
            isError: false,
            errorData: null
        });

        //redirect to dashboard page

        // 1. For User
        // userContext.setIsLogin(true);
        // userContext.setUserData(userData)
        userContext.login(userData)
        redirect("/users/home")

    }).catch((error)=>{
        setErrorData({
            isError: true,
            errorData: error
        });
        console.log(error);
    }).finally(()=>{
        setLoading(false)
    })
  }

  const loginFrom = () => {
    return (
      <Container>
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <Card
              className="border-0 shadow p-4 m-3"
              style={{
                position: "relative",
                top: -60,
              }}
            >
              <Card.Body>
                {/* {JSON.stringify(userContext)} */}

                <Container className="text-center mb-3">
                  <img
                    src={Logo}
                    srcset=""
                    alt="Store Logo"
                    width={80}
                    height={80}
                  />
                </Container>
                <h2 className="text-muted mb-3 text-center text-uppercase">
                  Login Here
                </h2>

                <Alert variant="danger" show={errorData.isError} onClose={() => setErrorData({
                    isError: false,
                    errorData: null
                })} dismissible>{errorData.errorData?.response?.data?.message}</Alert>

                <Form noValidate onSubmit={submitForm}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter your email</Form.Label>
                    <Form.Control
                      type="text"
                      value={data.email}
                      placeholder="Enter here"
                      onChange={(event)=>handleChange(event,'email')}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPasswrod">
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control
                      type="password"
                      value={data.password}
                      placeholder="Enter here"
                      onChange={(event)=>handleChange(event,'password')}
                    />
                  </Form.Group>

                  <Container className="text-center mt-4">
                  <Button type="submit" variant="success" disabled={loading}>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        className="me-2"
                        role="status"
                        aria-hidden="true"
                        hidden={!loading}
                      />
                      <span hidden={!loading}>Loading..</span>
                      <span hidden={loading}>Login</span>
                    </Button>
                  <Button variant="danger" className="ms-3" onClick={clearData}>Reset</Button>
                  </Container>
                </Form>

                <Container className="text-center mt-2">
                  {/* <p>Forget Password <a href="/forget">Click here</a></p> */}
                  <p>
                    If not registered !{" "}
                    <NavLink to="/register">Click here</NavLink>
                  </p>
                </Container>
                  
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Base
      title="Electro Store / Login"
      description="Fill the form correctly to register with us. By register with us you can use services we provide."
    >
      {loginFrom()}
    </Base>
  );
};

export default Login;
