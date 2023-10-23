import { Button, Card, Col, Container, Row } from "react-bootstrap";
import image from "../assest/logo.png"

const CategoryView = ({category,deleteCat,viewCat,updateCat}) => {

    const imageStyle = {
         width: "120px",
         height: "120px",
         objectFit: "cover"
    }

    const deleteCategory = (categoryId) => {
        deleteCat(categoryId)
    }

    return category && (
        <div className="mb-2">
            <Card >
                <Card.Body>
                     <Row>
                        <Col md={2}>
                           <img src={(category.coverImage ? (category.coverImage.startsWith('http') ? category.coverImage : image) : image)} style={imageStyle}/>
                        </Col>
                        <Col md={8}>
                        <h5>{category.title}</h5>
                        <p>{category.description}</p>
                        </Col>
                        <Col md={2}>
                         <Container className="d-grid gap-1">
                            <Button 
                                size="sm" 
                                variant="info" 
                                onClick={(event)=>
                                    viewCat(category)}>View</Button>
                            <Button size="sm" variant="warning" onClick={(event)=>updateCat(category)}>Edit</Button>
                            <Button size="sm" variant="danger" onClick={(event)=>deleteCategory(category.categoryId)}>Delete</Button>
                         </Container>
                      </Col>
                     </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CategoryView;