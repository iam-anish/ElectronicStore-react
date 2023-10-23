import { Card,Container,Table,Image, Button } from "react-bootstrap";
import Profile from "../../assest/Profile.jpeg";

const UserProfileView = ({user=null,handleShowModal}) => {
   return(
    <>
     {(user && (
        <Card className="m-5 shadow">
            <Card.Body>
                <Container className="text-center">
                    <Image 
                    src={Profile}
                    width="100"
                    height="100"
                    roundedCircle
                    className="border border-primary mb-2"
                    alt="Profile Image"/>
                </Container>
                <h3 className="text-center text-uppercase text-primary">User Details</h3>
                <div className="mt-3">

                    <Table className="border-5 text-center" responsive striped bordered hover variant="secondary">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{user.gender}</td>
                            </tr>
                            <tr>
                                <td>About</td>
                                <td>{user.about}</td>
                            </tr>
                            <tr>
                                <td>Roles</td>
                                <td>{user.roles.map(role=> <div key={role.roleId}>{role.roleName}</div>)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <Container className="text-center">
                     <Button variant="success" onClick={handleShowModal}>Update</Button>
                     <Button className="ms-2" variant="warning">Orders</Button>
                </Container>

            </Card.Body>
        </Card>
     ))}
    </>
   )
}

export default UserProfileView;
 