import { Card, Col, Container, Row } from "react-bootstrap";

const AdminHome = () => {

    return (
        <Container>
            <Row>
                <Col>
                  <Card className="shadow-sm">
                    <Card.Body>
                        <h3 className="text-center">Welcome to Admin Dashboard</h3>
                    </Card.Body>
                  </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminHome;