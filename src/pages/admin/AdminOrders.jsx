import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleOrderView from "../../components/SingleOrderView";
import { getAllOrders } from "../../services/order.service";

const AdminOrders = () => {

    const [ordersData,setOrdersData] = useState(null);
    const [currentPage,setCurrentPage] = useState(0);

    useEffect(()=>{
        getOrdersDataLocally();
    },[])

    useEffect(()=>{
        if(currentPage>0){
            getOrdersDataLocally();
        } 
    },[currentPage])

    const getOrdersDataLocally = async () => {
      try{
        let data = await getAllOrders(currentPage,10,'orderedDate','desc'); 
        console.log(data);
        if (currentPage==0) {
            setOrdersData(data);
        }
        else{
            setOrdersData({
            content: [...ordersData.content,...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages
            })
        }
      }catch(e){
        console.log(e);
      }
    }

    const loadNextPage = () => {
       setCurrentPage(currentPage+1)
    }

    const ordersView = () => {
        return(
            <Card className="shadow">
               <Card.Header>
                   <h3>All orders is here</h3>
               </Card.Header>
               <Card.Body>
                 <InfiniteScroll
                  dataLength={ordersData.content.length}
                  next={loadNextPage}
                  hasMore={!ordersData.lastPage}
                  loader={<h3 className="text-center my-4">Loading...</h3>}
                  endMessage={<p className="text-center my-3">All orders loaded</p>}
                 >
                 {
                    ordersData.content.map(o => {
                        return(
                            <SingleOrderView order={o} ordersData={ordersData} setOrdersData={setOrdersData}/>
                        )
                    })
                  }
                 </InfiniteScroll>
               </Card.Body>
            </Card>
        )
    }


    return(
        <Container>
            <Row>
                <Col>
                   { ordersData && ordersView()}
                </Col>
            </Row>
        </Container>
    )
}

export default AdminOrders;