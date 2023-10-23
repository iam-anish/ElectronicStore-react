import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { toast } from "react-toastify"
import SingleOrderView from "../../components/SingleOrderView"
import UserContext from "../../context/UserContext"
import { Container,Row,Col, Card, Alert, Button, Form } from "react-bootstrap";
import { getOrdersOfUser } from "../../services/order.service"

const Order = () => {

    const {userData,isLogin} = useContext(UserContext)
    const [orders,setOrders] = useState([])

    useEffect(()=>{
        if (isLogin) {
            loadOrderOfUsers()
        }  
    },[isLogin])
    const loadOrderOfUsers = async () => {
        try {
           const result = await getOrdersOfUser(userData.user.userId)
           console.log(result);
           setOrders(result)
        } catch (error) {
           console.log(error);
           toast.error("Error in loading orders")
        }
    }

    const ordersView = () => {
        return(
            <Card className="shadow">
               <Card.Header>
                   <h3>Your Orders</h3>
               </Card.Header>
               <Card.Body>
                 {
                    orders.map(o => {
                        return(
                            <SingleOrderView order={o}/>
                        )
                    })
                  }
               </Card.Body>
            </Card>
        )
    }


    return(
        <>
        <Container className="mt-3">
             {ordersView()}
        </Container>
        </>
    )
}

export default Order; 