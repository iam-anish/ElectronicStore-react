import { useContext } from "react";
import { Button, Card, Col, Container,Row } from "react-bootstrap";
import { Outlet,NavLink,useNavigate, Navigate } from "react-router-dom";
import { isLoggedIn } from "../../auth/HelperAuth";
import UserContext from "../../context/UserContext";

const Dashboard = () => {

    const userContext = useContext(UserContext);
    const redirect = useNavigate() 

    //private dashboard view
    const dashboardView = () => {
        return(
        <>
           <Outlet/>
          {/* <h2>{JSON.stringify(userContext)}</h2> */}
        </>
        )
    }

    //not loggedi in view
    const notLoggedInView = () => {
        return(
            <Container className="mt-5">
                <Row>
                    <Col md={{
                        span: 8,
                        offset: 2
                    }}
                    >
                       <Card className="shadow">
                          <Card.Body className="text-center">

                            <h3>You are not logged In</h3>
                            <p>Please do login to view the page </p>
                            <Button as={NavLink} to="/login" variant="success">Login Now</Button>
                          </Card.Body>
                       </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

    return(
        (isLoggedIn()) ? (dashboardView()) : (<Navigate to="/login" />)
    );
};

export default Dashboard;