import React from 'react'
import { Button, Card, Col,Container,Row } from 'react-bootstrap'
import { getProductImageUrl } from '../../services/helper.service'
import defaultNoImage from "../../assest/defaultNoImageCopy.png"
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { toast } from 'react-toastify';

const SingleCartItemView = ({item}) => {
  const {cart,removeItem,addItem} = useContext(CartContext);  
  return (
    <Card className='shadow mt-2' style={{backgroundColor: '#e5e5e9'}}>
        <Card.Body>

           <Row>
            <Col md={'1'}>
             <Container>
                <img 
                style={{
                    width: "50px",
                    height: "50px",
                    objectFit: 'contain'
                }}
                onError={(event)=>{
                    event.currentTarget.setAttribute('src',defaultNoImage);
                }}
                src={getProductImageUrl(item.product?.productId)}
                />
             </Container>
            </Col>
            <Col md={'9'}>
               <h5>{item.product.title}</h5>
               <Row>
                 <Col>
                  <p><span className='text-muted'>Quantity:</span> <b>{item.quantity}</b></p>
                 </Col>
                 <Col>
                 <p><span className='text-muted'>Price:</span> <b>₹ {item.product.discountedPrice}</b></p>
                 </Col>
                 <Col>
                 <p><span className='text-muted'>Total Price:</span> <b>₹ {item.totalPrice}</b></p>
                 </Col>
               </Row>
            </Col>
            <Col md={2} className='text-center'>
                <div className="d-grid">
                   <Button onClick={event=>(
                      removeItem(item.cartItemId)
                   )} variant='info' size='sm'>Remove</Button>
                </div>
                <div className='mt-2'>
                    <Row>
                        <Col className="d-grid">
                        <Button 
                        onClick={event=>{
                            const decreaseQuantity = item.quantity-1;
                            if (decreaseQuantity>0) {
                                addItem(item.quantity-1,item.product.productId,()=>(
                                    toast.success("Quantity is updated",{
                                        position: "top-right"
                                    })
                                ))
                            } else {
                                toast.info("Quantity can not be less than 1")
                            } 
                        }} variant='danger' size='sm'>-</Button>
                        </Col>
                        <Col className="d-grid">
                        <Button
                        onClick={event=>{
                            const increaseQuantity = item.quantity+1;
                            if (increaseQuantity<6) {
                                addItem(item.quantity+1,item.product.productId,()=>(
                                    toast.success("Quantity is updated",{
                                        position: "top-right"
                                    })))
                                }else {
                                toast.info("More than 5 not allowed")
                            } 
                        }} size='sm'>+</Button>
                        </Col>
                    </Row>
                </div>
            </Col>
           </Row>

        </Card.Body>
    </Card>
  )
}

export default SingleCartItemView
