import { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button, Table,Form,Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import UserProfileView from "../../components/users/UserProfileView";
import UserContext from "../../context/UserContext";
import { getUser,updateUser as updateUserAPI} from "../../services/user.service";

const Profile = () => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);

  const [updateUser,setUpdateUser] = useState(null);
  const [updateLoading,setUpdateLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);

  useEffect(() => {
    if (userContext.userData) {
      getUserDataFromServer();
    }
  }, [userContext.userData]);

  const getUserDataFromServer = () => {
    const userId = userContext.userData.user.userId;
    const jwtToken = userContext.userData.jwtToken;

    getUser(userId, jwtToken)
      .then((data) => {
        setUser(data);
        setUpdateUser(data)
        console.log(data);
      })
      .catch((error) => {
        setUser(null);
        console.log(error);
      });
  };

  const updateFieldHandler = (event,property) => {
     setUpdateUser({
        ...updateUser,
        [property]: event.target.value
     })
  }

  const updateUserData = () => {
     if(updateUser.name===undefined || updateUser.name.trim() === ''){
        toast.error("User name requied !!")
        return
     }
     if(updateUser.about===undefined || updateUser.about.trim() === ''){
        toast.error("Abour name requied !!")
        return
     }
     setUpdateLoading(true);
     updateUserAPI(updateUser).then(updatedUser=>{
        console.log(updatedUser)
        setShow(false)
        toast.success("User details updated !!")
     }).catch(error=>{
        console.log(error)
     }).finally(
        setUpdateLoading(false)
     );
  }


  const updateViewModal = () => {
    return (
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update user details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col sm={{ span: 10, offset: 1 }}>
                    <Table
                      className="border-5 text-center"
                      responsive
                      striped
                      bordered
                      hover
                      variant="secondary"
                    >
                         <tbody>
                         <tr>
                           <td>Name</td>
                           <td>
                             <Form.Control 
                                 type="text" 
                                 value={updateUser.name}
                                 onChange={(event)=>updateFieldHandler(event,'name')}
                                 />
                             </td>
                         </tr>
                         <tr>
                           <td>Email</td>
                           <td>{updateUser.email}</td>
                         </tr>
                         <tr>
                           <td>Password</td>
                           <td>
                           <Form.Control 
                              placeholder="Enter your new password" 
                              type="password"
                              onChange={(event)=>updateFieldHandler(event,'password')}
                              />
                             </td>
                         </tr>
                         <tr>
                           <td>Gender</td>
                           <td>{updateUser.gender}</td>
                         </tr>
                         <tr>
                           <td>About</td>
                           <td>
                           <Form.Control className="text-center" as={'textarea'} value={updateUser.about}
                           onChange={(event)=>updateFieldHandler(event,'about')}
                           />
                             </td>
                         </tr>
                         <tr>
                           <td>Roles</td>
                           <td>
                             {user.roles.map((role) => (
                               <div key={role.roleId}>{role.roleName}</div>
                             ))}
                           </td>
                         </tr>
                       </tbody>
                    </Table>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateUserData} disabled={updateLoading}>
            <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        className="me-2"
                        role="status"
                        aria-hidden="true"
                        hidden={!updateLoading}
                      />
                      <span hidden={!updateLoading}>Loading..</span>
                      <span hidden={updateLoading}>Save Changes</span>  
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <Container>
        <Row>
          <Col sm={{ span: 10, offset: 1 }}>
            {user && (
              <>
                <UserProfileView
                  user={user}
                  handleShowModal={handleShowModal}
                />
                {updateViewModal()}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
