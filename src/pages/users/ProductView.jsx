import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Row, Container, Badge,Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ShowHtml from "../../components/ShowHtml";
import { getProductImageUrl } from "../../services/helper.service";
import { getProduct } from "../../services/product.service";
import {Link} from "react-router-dom";
import defaultNoImage from "../../assest/defaultNoImage.png"
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ProductView = () => {

  const {addItem} = useContext(CartContext);
  const { productId } = useParams();
  const [product, setProducts] = useState(null);

  useEffect(() => {
    loadUser(productId);
  }, []);

  const loadUser = (productId) => {
    getProduct(productId)
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddItem = (productId,quantity) => {
      if (!product.stock) {
          Swal.fire('Out Of Stock','Product is out of stock so you cann\'t add to cart.','info')
          return
      }

      addItem(quantity,productId,()=>(
        toast.success("Item added to cart",{
            position: "top-right"
        })))
  }

  const productView = () => {
    return (
      <Container>
        <Row>
          <Col>
            <Card className="mt-4 shadow-sm">
              <Card.Body>
                <Container>
                  <Row>
                    <Col md={4}>
                      <img
                        style={{
                          width: "400px",
                          height: "400px",
                        }}
                        src={getProductImageUrl(product.productId)}
                        onError={(event)=>{
                            event.currentTarget.setAttribute('src',defaultNoImage);
                        }}
                      />
                    </Col>
                    <Col md={8}>
                      <h3>{product.title}</h3>
                      <p>
                        sort description{" "}
                        <span>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Deserunt, tenetur!
                        </span>
                      </p>
                      <Badge
                        className="ms-2"
                        pill
                        bg={product.stock ? "success" : "danger"}
                      >
                        {product.stock ? "In Stock" : "Out of Stock"}
                      </Badge>
                      <Container className="text-center">
                        <span className="h2 text-muted">
                          ₹ <s>{product.price}</s>
                        </span>
                        <b>
                          <span className="h1 ms-2">
                            {product.discountedPrice}
                          </span>
                        </b>
                      </Container>
                  <Container className="d-grid mt-3">
                      <Button as={Link} to={`/store/product/${product.productId}`} variant="warning" size="sm"
                          onClick={event=>handleAddItem(product.productId,1)}
                    >Add to Cart</Button>
                   </Container>
                    </Col>
                  </Row>
                </Container>
                <div>
                  <ShowHtml htmlText={product.description} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return product && productView();
};

export default ProductView;
