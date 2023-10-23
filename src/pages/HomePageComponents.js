import { Card, Container, Row,Col, Badge,Button,Form } from "react-bootstrap"
import SingleProductCard from "../components/users/SingleProductCard";
import {FaLocationDot} from "react-icons/fa6";
import {IoCall} from "react-icons/io5"
import {BiLogoGmail} from "react-icons/bi"
export const trendingProducts = (products) => {

    return (
        <Container>
            <Row>
                <h3 className="text-center">Trending Products List</h3>
                {
                  products.map((product)=>(
                    <Col md={4}>
                      <SingleProductCard product={product}/>
                    </Col>
                  ))
                }
            </Row>
        </Container>
    )
}

export const infoWithImageInRightSection = (image,title, text) => {
    return(
       <Container>
         <Row>
            <Col className="d-flex align-items-center">
                <div className="text-center">
               <h3>{title}</h3>
               <p>{text}</p>
               <Button>Store</Button>
               </div>
            </Col>
            <Col className="text-center">
               <img src={image} alt=""/>
            </Col>
        </Row>
       </Container>
    )
}

export const infoWithImageInLeftSection = (image,title, text) => {
    return(
       <Container>
         <Row>
            <Col className="text-center">
               <img src={image} alt=""/>
            </Col>
            <Col className="d-flex align-items-center">
                <div className="text-center">
                <h3>{title}</h3>
                <p>{text}</p>
               <Button>Store</Button>
               </div>
            </Col>
        </Row>
       </Container>
    )
}

export const contactForm = () => {
    return(
        <>
         <Container>
                
            <div className="text-center">
                <h3>Contact Us</h3>
            </div>
        <Row>
             <Col md={8}>
             <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
             </Col>
             <Col className="text-center"> 
             <Container>
                <Row className="my-3">
                    <Col>
                    <FaLocationDot size={30}/>
                    <p className="mt-2">San Francisco, CA 94126, USA</p>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                    <IoCall size={30}/>
                    <p className="mt-2">+ 01 234 567 89</p>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                    <BiLogoGmail size={30}/>
                    <p className="mt-2">contact@mdbootstrap.com</p>
                    </Col>
                </Row>
        </Container>
             </Col>
        </Row>    
         
        </Container>
        
        </>
    )
}