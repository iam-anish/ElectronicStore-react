import { Button, Card, Col, Container, Row, Table,Modal, ListGroup, Badge, Form } from "react-bootstrap";
import { formDate } from "../services/helper.service";
import {useState} from "react"
import { toast } from "react-toastify";
import { updateOrder } from "../services/order.service";
import DatePicker from "react-datepicker";
import {Link} from "react-router-dom";

const SingleOrderView = (
    {order,ordersData,setOrdersData}
) => {

    //for view modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //for update modal
    const [showUpdate, setShowUpdate] = useState(false);
    const handleUpdateClose = () => setShowUpdate(false);
    const handleUpdateShow = () => setShowUpdate(true);

    const [selectedOrder,setSelectedOrder] = useState(undefined);

    const handleView = () => {
        handleShow()
    }

    const handleUpdate = () => {
      setSelectedOrder({...order})
      handleUpdateShow()
    }

    const handleOrderUpdate = async (event) => {
        event.preventDefault()
        console.log(selectedOrder)

        if(selectedOrder.billingName.trim() === ''){
          toast.error("Billing Name required !!")
          return;
        }
        if(selectedOrder.billingAddress.trim() === ''){
         toast.error("Billing Address required !!")
         return;
        }
        if(selectedOrder.billingPhone.trim() === ''){
         toast.error("Billing Phone required !!")
         return;
        }
      //   if(selectedOrder.diliveredDate.trim() === ''){
      //    toast.error("Dilivered Date required !!")
      //    return;
      //   }
        if(selectedOrder.orderStatus.trim() === ''){
         toast.error("Order Status required !!")
         return;
        }
        if(selectedOrder.paymentStatus.trim() === ''){
         toast.error("Payment Status required !!")
         return;
        }

        try {
         const data = await updateOrder(selectedOrder,selectedOrder.orderId)
         toast.success("Order details updated",{
            position: "top-right"
         })

         const newList = ordersData.content.map(item=>{
            if (
               item.orderId === selectedOrder.orderId
            ) {
               return data
            }
            else return item;
         })

         setOrdersData({
            ...ordersData,
            content: newList
         })

        } catch (error) {
           console.log(error)
           toast.error("Error: Order not updated")
        }
      }

    const openEditOrderModal = () => {
       return selectedOrder && ( 
         <>
      <Modal show={showUpdate} onHide={handleUpdateClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
         <Form onSubmit={handleOrderUpdate}>

            {/* billing Name */}
            <Form.Group>
               <Form.Label>Billing Name</Form.Label>
               <Form.Control type="text" 
               value={selectedOrder.billingName} 
               onChange={
                  (event) => {
                     setSelectedOrder({
                        ...selectedOrder,
                        billingName:event.target.value
                     })   
                  }
               }/>
            </Form.Group>

            {/* billing Phone */}
            <Form.Group className="mt-3">
               <Form.Label>Billing Phone</Form.Label>
               <Form.Control type="text" 
               value={selectedOrder.billingPhone} 
               onChange={
                  (event) => {
                     setSelectedOrder({
                        ...selectedOrder,
                        billingPhone:event.target.value
                     })   
                  }
               }/>
            </Form.Group>

            {/* billing Address */}
            <Form.Group className="mt-3">
               <Form.Label>Billing Address</Form.Label>
               <Form.Control as={'textarea'} type="text" 
               value={selectedOrder.billingAddress} 
               onChange={
                  (event) => {
                     setSelectedOrder({
                        ...selectedOrder,
                        billingAddress:event.target.value
                     })   
                  }
               }/>
            </Form.Group>
            {/* Payment Status */}
            <Form.Group className="mt-3">
            <Form.Label>Payment Status</Form.Label>
               <Form.Select
               onChange={(event)=>{
                     setSelectedOrder({
                        ...selectedOrder,
                        paymentStatus: event.target.value
                     })
               }}
               >
                  <option selected={selectedOrder.paymentStatus==='NOTPAID'} value="NOTPAID">NOT PAID</option>
                  <option selected={selectedOrder.paymentStatus==='PAID'} value="PAID">PAID</option>
               </Form.Select>
            </Form.Group>

             {/* Order Status */}
             <Form.Group className="mt-3">
            <Form.Label>Order Status</Form.Label>
               <Form.Select 
                onChange={(event)=>{
                  setSelectedOrder({
                     ...selectedOrder,
                     orderStatus: event.target.value
                  })
            }}
               >
                  <option selected={selectedOrder.orderStatus==='PENDING'} value="PENDING">PENDING</option>
                  <option selected={selectedOrder.orderStatus==='DISPATCHED'} value="DISPATCHED">DISPATCHED</option>
                  <option selected={selectedOrder.orderStatus==='ONWAY'} value="ONWAY">ONWAY</option>
                  <option selected={selectedOrder.orderStatus==='DELIVERED'} value="DELIVERED">DELIVERED</option>
               </Form.Select>
            </Form.Group>
            {/* billing date */}
            <Form.Group className="mt-3">
               <Form.Label>Delivered Date</Form.Label>
               <Form.Control type="date" 
               value={(selectedOrder?.diliveredDate?.slice(0,10))}
               onChange={
                  (event) => {
                     setSelectedOrder({
                        ...selectedOrder,
                        diliveredDate:event.target.value + " 00:00:00.000"
                     })   
                  }
               }/>
            </Form.Group>

            <Container className="text-center">
            <Button type="submit" variant="primary">
            Save Changes
          </Button>
            </Container>

         </Form>
      


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
       )
    }

    const viewOrderDetailModal = () => {
        return(
            <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <Card>
                <Card.Body>
                <Row>
                    <Col>
                    <b>Order Id: </b> {order.orderId}
                    </Col>
                    <Col md={5}>
                    <b>Ordered By: </b> {order.user.name}
                    </Col>
                 </Row>
                    <Row className="mt-3">
                    <Col>
                     <Table bordered >
                        <tbody>
                            <tr>
                              <td>
                                Billing Name
                              </td>
                              <td className="fw-bold">
                              {order.billingName}
                              </td>
                           </tr>
                            <tr>
                              <td>
                                Phone Number
                              </td>
                              <td className="fw-bold">
                              {order.billingPhone}
                              </td>
                           </tr>
                           <tr>
                              <td>
                                Items
                              </td>
                              <td className="fw-bold">
                              {order.orderItems.length}
                              </td>
                           </tr>
                           <tr className={order.paymentStatus === 'NOTPAID' ? 'table-danger' : 'table-success' }>
                              <td>
                                Payment Status
                              </td>
                              <td className="fw-bold">
                               {order.paymentStatus}
                              </td>
                           </tr>
                           <tr className={order.orderStatus === 'NOTPAID' ? 'table-danger' : 'table-success' }>
                              <td>
                                Ordered Status
                              </td>
                              <td className="fw-bold">
                              {order.orderStatus}
                              </td>
                           </tr>
                           <tr>
                              <td>
                                Ordered Date
                              </td>
                              <td className="fw-bold">
                              {formDate(order.orderedDate)}
                              </td>
                           </tr>
                           <tr>
                                <td>Billing Address</td>
                                <td>{order.billingAddress}</td>
                            </tr>
                            <tr>
                                <td>Dilivered Date</td>
                                <td>{order.diliveredDate ? order.diliveredDate : 'Not Delivered'}</td>
                            </tr>
                            <tr>
                                <td>Order Amount</td>
                                <td>₹ {order.orderAmount}</td>
                            </tr>
                        </tbody>
                     </Table>
                    </Col>
                    </Row>
                </Card.Body>
             </Card>
             <Card className="mt-3">
                <Card.Body>
                    <h4>Order Items</h4>
                    <ListGroup>
                        {
                           order.orderItems.map((item,index) => (
                            <ListGroup.Item  className="border border-2" action key={item.orderItemId}>
                                <p className="text-muted">Product Id: {item.product.productId}</p>
                                <Row>
                                    <Col>
                                       <h5>{index+1}. {item.product.title}</h5>
                                       <Badge size={'lg'}>Quantity: {item.quantity}</Badge>
                                       <Badge className="ms-2" bg="success" size={'lg'}>Total Amounts: ₹{item.totalprice}</Badge>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                           ))
                        }
                    </ListGroup>
                </Card.Body>
             </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        )
    }


    return(
        <>
        <Card className="shawdow mb-3">
            <Card.Body>
                 <Row>
                    <Col>
                    <b>Order Id: </b> {order.orderId}
                    </Col>
                    <Col>
                    <b>Ordered By: </b> {order.user.name}
                    </Col>
                 </Row>
                 <Row className="mt-3">
                    <Col>
                       <Table bordered striped>
                         <tbody>
                         <tr>
                              <td>
                                Billing Name
                              </td>
                              <td className="fw-bold">
                              {order.billingName}
                              </td>
                           </tr>
                           <tr>
                              <td>
                                Phone Number
                              </td>
                              <td className="fw-bold">
                              {order.billingPhone}
                              </td>
                           </tr>
                           <tr>
                              <td>
                                Items
                              </td>
                              <td className="fw-bold">
                              {order.orderItems.length}
                              </td>
                           </tr>
                           <tr className={order.paymentStatus === 'NOTPAID' ? 'table-danger' : 'table-success' }>
                              <td>
                                Payment Status
                              </td>
                              <td className="fw-bold">
                               {order.paymentStatus}
                              </td>
                           </tr>
                           <tr className={order.orderStatus === 'NOTPAID' ? 'table-danger' : 'table-success' }>
                              <td>
                                Ordered Status
                              </td>
                              <td className="fw-bold">
                               {order.orderStatus}
                              </td>
                           </tr>
                           <tr>
                              <td>
                                Ordered Date
                              </td>
                              <td className="fw-bold">
                              {formDate(order.orderedDate)}
                              </td>
                           </tr>
                           </tbody>
                       </Table>
                    </Col>
                 </Row>
                 <Container className="text-center">
                     {ordersData &&<Button variant="outline-danger" onClick={handleUpdate}>Update</Button>}   
                      <Button variant="outline-info ms-2" onClick={handleView}>Order Details</Button>
                 </Container>
            </Card.Body>
        </Card>

        {viewOrderDetailModal()}
        {openEditOrderModal()}
        </>
    )
}

export default SingleOrderView;