import { Badge, Card, Col,Row } from "react-bootstrap";
import { getUserImageUrl } from "../services/helper.service";
import defaultImage from "../assest/default-image.jpg"

const SingleUserView = ({user}) => {
    return(
        <>
          <Card className="mb-2">
             <Card.Body>
                   <Row>
                     <Col md={1}>
                        <img style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover"
                        }}
                        className="rounded-circle"
                        src={user.imageName ? getUserImageUrl(user.userId) : defaultImage } alt="" 
                        onError={(event)=>{
                            event.currentTarget.setAttribute("src",defaultImage)
                        }}
                        />
                     </Col>
                     <Col md={11} className="ps-4">
                       <h5 className="mb-0">{user.name}</h5>
                       <p className="text-muted mb-0">{user.email}</p>
                       {user.roles.map(role=>{
                         return(
                            <Badge pill key={role.roleId}>{role.roleName}</Badge>
                         )
                       })}
                     </Col>
                   </Row>
             </Card.Body>
          </Card>
        </>
    )
}

export default SingleUserView;