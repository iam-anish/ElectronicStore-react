import { Container,Row,Col } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/HelperAuth";
import SideMenu from "../../components/admin/SideMenu";

const AdminDashboard = () => {

    const adminDashboardView = () => {
        return(
            <div>
             <Container fluid className="py-4 px-5">
                <Row>
                    <Col md={{
                        span: 2
                    }}>
                        <SideMenu/>
                    </Col>
                    <Col md={10}>
                       <Outlet/>
                    </Col>
                </Row>
             </Container>
            </div>
        )
    }

    return(
        (isAdminUser()) ? (adminDashboardView()) : (<Navigate to='/users/home' />)
    )
}

export default AdminDashboard;