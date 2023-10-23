import {
  Col,
  Container,
  Row,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import Base from "../components/Base";
import { NavLink } from "react-router-dom";
import Logo from "../assest/logo.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/user.service";

const Register = () => {
  let [data, setDate] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    about: "",
  });

  //handleChange
  const handleChange = (event, property) => {
    setDate({
      ...data,
      [property]: event.target.value,
    });
  };

  const clearData = () => {
    setDate({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      about: "",
    });

    setErrorDate({
      errorData: null,
      isError: false,
    });
  };

  const [loading, setLoading] = useState(false);

  const [errorDate, setErrorDate] = useState({
    isError: false,
    errorData: null,
  });

  //Registration api function
  const submitForm = (event) => {
    event.preventDefault();
    console.log(data);

    if (data.name === undefined || data.name.trim() === "") {
      toast.error("Name is required.");
      return;
    }
    if (data.email === undefined || data.email.trim() === "") {
      toast.error("Email is required.");
      return;
    }
    if (data.password === undefined || data.password.trim() === "") {
      toast.error("Password is required.");
      return;
    }
    if (
      data.confirmPassword === undefined ||
      data.confirmPassword.trim() === ""
    ) {
      toast.error("Confirm Password is required.");
      return;
    }
    if (data.gender === undefined || data.gender.trim() === "") {
      toast.error("Gender is required.");
      return;
    }
    if (data.about === undefined || data.about.trim() === "") {
      toast.error("About is required.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password not matched !!");
    }
    //api call
    setLoading(true);
    registerUser(data)
      .then((userDate) => {
        console.log(userDate);
        toast.success("User created successfully !!");
        clearData();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
        console.log(error);
        setErrorDate({
          isError: true,
          errorData: error,
        });
        toast.error("Something went wrong. Try Again!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const registerForm = () => {
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
                  Signup Here
                </h2>
                <Form noValidate onSubmit={submitForm}>
                  {/* name feild */}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter your name</Form.Label>
                    <Form.Control
                      type="text"
                      value={data.name}
                      placeholder="Enter name"
                      onChange={(event) => handleChange(event, "name")}
                      isInvalid={errorDate.errorData?.response?.data?.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorDate.errorData?.response?.data?.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Email feild */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter your email</Form.Label>
                    <Form.Control
                      type="email"
                      value={data.email}
                      placeholder="Enter email"
                      onChange={(event) => handleChange(event, "email")}
                      isInvalid={errorDate.errorData?.response?.data?.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorDate.errorData?.response?.data?.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Password feild */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Enter new passowrd</Form.Label>
                    <Form.Control
                      type="password"
                      value={data.password}
                      placeholder="Enter password"
                      onChange={(event) => handleChange(event, "password")}
                      isInvalid={errorDate.errorData?.response?.data?.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorDate.errorData?.response?.data?.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Confrim Password feild */}
                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm passowrd</Form.Label>
                    <Form.Control
                      type="password"
                      value={data.confirmPassword}
                      placeholder="Re Enter password"
                      onChange={(event) =>
                        handleChange(event, "confirmPassword")
                      }
                    />
                  </Form.Group>

                  {/* Gender feild */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Select Gender</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        label="Male"
                        name="gender"
                        value={"Male"}
                        type={"radio"}
                        id={`gender`}
                        checked={data.gender === "Male"}
                        onChange={(event) => handleChange(event, "gender")}
                      />
                      <Form.Check
                        inline
                        name="gender"
                        label="Female"
                        value={"Female"}
                        type={"radio"}
                        id={`gender`}
                        checked={data.gender === "Female"}
                        onChange={(event) => handleChange(event, "gender")}
                      />
                    </div>
                  </Form.Group>
                  {/* About feild */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Write something about yourself</Form.Label>
                    <Form.Control
                      as={"textarea"}
                      rows="6"
                      placeholder="Write here"
                      value={data.about}
                      onChange={(event) => handleChange(event, "about")}
                      isInvalid={errorDate.errorData?.response?.data?.about}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorDate.errorData?.response?.data?.about}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Container>
                    <p className="text-center">
                      Already Register ! <NavLink to="/login">Login</NavLink>
                    </p>
                  </Container>

                  <Container className="text-center">
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
                      <span hidden={loading}>Register</span>
                    </Button>
                    <Button
                      className="ms-3 ps-4 pe-4"
                      variant="danger"
                      onClick={clearData}
                    >
                      RESET
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Base
      title="Electro Store / Signup"
      description="Fill the form correctly to register with us. By register with us you can use services we provide."
    >
      {registerForm()}
    </Base>
  );
};

export default Register;
