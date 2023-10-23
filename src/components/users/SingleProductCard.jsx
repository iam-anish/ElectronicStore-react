import { Badge, Button, Card, Container } from "react-bootstrap";
import { getProductImageUrl } from "../../services/helper.service";
import {Link} from "react-router-dom";
import defaultNoImage from "../../assest/defaultNoImage.png"
const SingleProductCard = ({product}) => {

    const imageStyle = {
        width: "200px",
        height: "200px",
        objectFit: "contain"
    }

    return(
        <Card className="mt-3 shadow-sm">
            <Card.Body>
                 <Container className="text-center mb-3">
                    <img 
                    src={getProductImageUrl(product.productId)}
                    style={imageStyle}
                    onError={(event)=>{
                        event.currentTarget.setAttribute('src',defaultNoImage);
                    }}
                    />
                 </Container>
                 <h6>{product.title}</h6>
                 <p>sort description <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, tenetur!</span></p>
                 <Badge className="ms-2" pill bg={product.stock ? 'success' : 'danger'}>{product.stock ? 'In Stock' : 'Out of Stock'}</Badge>
                  <Container className="text-end">
                   <span className="h5 text-muted">₹ <s>{product.price}</s></span>
                   <b><span className="h4 ms-2">{product.discountedPrice}</span></b>
                  </Container>
                 <Container className="d-grid mt-3">
                    <Button as={Link} to={`/store/product/${product.productId}`} variant="success" size="sm">View Products</Button>
                 </Container>
            </Card.Body>
        </Card>
    )
}

export default SingleProductCard;