import { useState } from "react";
import { useEffect } from "react";
import { useContext} from "react";
import { Container,Row,Col, Card, Alert, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SingleCartItemView from "../components/users/SingleCartItemView";
import CartContext from "../context/CartContext";
import UserContext from "../context/UserContext";
import useJwtTokenExpiration from "../hooks/useJwtTokenExpiration";
import { createOrder } from "../services/order.service";

function Cart(){

    const flag = useJwtTokenExpiration();
    console.log(flag);

    const [orderPlacedClicked,setOrderPlacedClicked] = useState(false)
    useEffect(()=>{
        if (orderPlacedClicked) {
            document.getElementById('FormPlaceOrder').style.display='block';
            setTimeout(() => {
                document.getElementById('FormPlaceOrder').style.opacity=1;
            }, 100);
        }
    },[orderPlacedClicked])

   const {cart,item} = useContext(CartContext);
   const {userData,isLogin} = useContext(UserContext)

   const [orderDetails,setOrderDetails] = useState({
    billingAddress: "",
    billingName: "",
    billingPhone: "",
    cartId: "",
    orderStatus: "",
    paymentStatus: "",
    userId: ""
   })

   const getTotalCartAmount = () => {
      let amount=0;
      cart.items.forEach(item=>{
        amount+=item.totalPrice
      })
      return amount;
   }

   //create order
   const handleOrderCreation = async () => {
      if (orderDetails.billingName.trim()==="") {
        toast.info("Billing name is required",{
            position: "bottom-right"
        })
        return;
      }
      if (orderDetails.billingPhone.trim()==="") {
        toast.info("Billing Phone is required",{
            position: "bottom-right"
        })
        return;
      }
      if (orderDetails.billingAddress.trim()==="") {
        toast.info("Billing Address is required",{
            position: "bottom-right"
        })
        return;
      }

      //set required other details 
      orderDetails.cartId = cart.cartId;
      orderDetails.orderStatus = "PENDING"
      orderDetails.paymentStatus = "NOT PAID"
      orderDetails.userId = userData.user.userId

      console.log(orderDetails)

      try {
        const result = await createOrder(orderDetails)
        console.log(result);
        toast.success("Order created !! proceeding for paymeny")
      } catch (error) {
        console.log(error);
        toast.error("Error in creating order")
      }
   }

   const orderFormView = () => {
     return(
        <Form>
            {/* {billing Name} */}
            <Form.Group className="mt-3">
                <Form.Label>Billing Name</Form.Label>
                <Form.Control
                 type="text" placeholder="Enter here"
                 value={orderDetails.billingName}
                 onChange={event=>{
                    setOrderDetails({
                        ...orderDetails,
                        billingName:event.target.value
                    })
                 }}
                 />
            </Form.Group>

            {/* {billing Phone} */}
            <Form.Group className="mt-3">
                <Form.Label>Billing Phone</Form.Label>
                <Form.Control type="number" placeholder="Enter here"
                value={orderDetails.billingPhone}
                onChange={event=>{
                   setOrderDetails({
                       ...orderDetails,
                       billingPhone:event.target.value
                   })
                }}
                />
            </Form.Group>

            {/* {billing Address} */}
            <Form.Group className="mt-3">
                <Form.Label>Billing Address</Form.Label>
                <Form.Control rows={6} as={"textarea"} placeholder="Enter here"
                value={orderDetails.billingAddress}
                onChange={event=>{
                   setOrderDetails({
                       ...orderDetails,
                       billingAddress:event.target.value
                   })
                }}
                />
            </Form.Group>

            <Container className="mt-3 text-center">
                <Button variant="success" size="sm"
                onClick={event=>{
                    handleOrderCreation()
                }}
                >
                   Create Order & Proceed to Pay
                </Button>
            </Container>
        </Form>
    )
   }

   const cartView = () => {
     return <>
      <Card className="mt-3 shadow">
         <Card.Body>
            <Row className="px-5">
                <Col>
                  <h3>Cart</h3>
                </Col>
                <Col className="text-end">
                  <h3>{cart.items.length} Items</h3>
                </Col>
            </Row>
            <Row className="px-5 mt-3">
                <Col>
                  {
                    cart.items.map(item=>(
                        <SingleCartItemView key={item.cartItemId} item={item}/>
                    ))
                  }
                </Col>
            </Row>
            <Row className="px-5 pt-3">
                <Col className="text-end">
                  <h3>Total Amount : ₹{getTotalCartAmount()}</h3>
                </Col>
            </Row>
            <Container className="text-center">
               { !orderPlacedClicked && <Button onClick={event=>(
                    setOrderPlacedClicked(true )
                )}>Place Order</Button>}
            </Container>
         </Card.Body>
      </Card>
     </>
   }
    return(
        <>
        <div className="">
            <Container fluid={orderPlacedClicked} className="px-5"> 
                <Row>
                    <Col md={orderPlacedClicked ? 8:12} className="animation">
                      {cart && (cart.items.length > 0 ? (cartView()) : (
                        <Alert className="mt-4">
                             <h3>No items in cart</h3>
                        </Alert>
                      )) }
                      {!cart && (
                        <Alert className="mt-4 text-center shadow">
                             <h3>You are not logged In</h3>
                             <p>In order to access your card do login first</p>
                             <Button as={Link} to="/Login" variant="success">
                                Login
                             </Button>
                        </Alert>
                      ) }
                    </Col>
                    {
                        ( 
                            <Col style={{opacity:0,display:'none'}} id="FormPlaceOrder" md={4}>
                                <Card className="mt-3 shadow"> 
                                    <Card.Body>
                                    <h4>Fill the form to complete order</h4>
                                     {orderFormView()}
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }
                </Row>
            </Container>
        </div>
       </>
    );
}

export default Cart;