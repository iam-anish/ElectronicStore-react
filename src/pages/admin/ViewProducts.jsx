import { useEffect, useState } from "react";
import { Container, Row,Col,Table, Card, Form, Pagination, InputGroup, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import SingleProductView from "../../components/admin/SingleProductView";
import { getAllProducts,searchProduct as searchProductAPI } from "../../services/product.service";
import { PRODUCT_PAGE_SIZE } from "../../services/helper.service";

const ViewProducts = () => {

    const [products,setProducts] = useState(null);
    const [previousProducts,setPreviousProducts] = useState(null);

    const [searchQuery,setSearchQuery] = useState('')

    useEffect(()=>{
      getProducts(0,PRODUCT_PAGE_SIZE,"addedDate","asc"); 
    },[])

    const getProducts = (
        pageNumber = 0,
  pageSize = PRODUCT_PAGE_SIZE,
  sortBy = "addedDate",
  sortDir = "asc"
    ) => {

        getAllProducts(pageNumber,pageSize,sortBy,sortDir).then(data=>{
            console.log(data)
            setProducts(data)
            setPreviousProducts(data)
        }).catch(error=>{
            console.log(error)
            toast.error("Error in loading products !!")
        })
    }

    const searchProduct = () => {

      if(searchQuery === undefined || searchQuery.trim() === ''){
         return
      }

      searchProductAPI(searchQuery)
      .then(data=>{
        if(data.content.length <= 0){
          toast.info("No result found")
          return
        }
        setProducts(data)
      }).catch(error=>{
         console.log(error);
      })

    }

    const updateProductList = (productId) => {
      const newArray = products.content.filter((p) => {
        return p.productId != productId;
      });

      setProducts({
        ...products,
        content: newArray,
      });
    }

    const productView = () => {
        return(
            <Card>
                    <Card.Body>
                        <div className="mb-3">  
                            <Row>
                                <Col>
                                <h5>View Products</h5>
                                </Col>
                                 <Col>
                                   <Form.Group>
                                    <InputGroup>
                                      <Form.Control onChange={(event)=>{
                                      if(event.target.value === ''){
                                        if(previousProducts){
                                          setProducts(previousProducts)
                                        }
                                      }
                                        setSearchQuery(event.target.value)
                                    }}
                                      value={searchQuery}
                                       type="text" placeholder="Search Product Here"/>
                                      <Button onClick={searchProduct} variant="secondary">Search</Button>
                                     </InputGroup>
                                   </Form.Group>
                                 </Col>
                             </Row>
                        </div>
                        
                    <Table className="text-center" responsive bordered size="sm" style={{fontSize: '12px'}}>
                     <thead>
                        <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Price(₹)</th>
                        <th>Discounted(₹)</th>
                        <th>Live</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {products.content.map((product,index)=>{
                             return(
                               <SingleProductView key={index} index={index} product={product} updateProductList={updateProductList} products={products} setProducts={setProducts}/>
                             )
                        })}
                     </tbody>
                  </Table>

                  <Container className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.First onClick={(event)=>{
                                    getProducts(0)
                                  }}/>
                            <Pagination.Prev onClick={(event)=>{
                                  if((products.pageNumber-1)<=0){
                                    return
                                  }
                                    getProducts(products.pageNumber-2)
                                  }}/>
                            { 
                              [...Array(products.totalPages)].map((ob,i)=>i).map(item=>{
                                return products.pageNumber === item+1 ? 
                                  <Pagination.Item active key={item}>{item+1}</Pagination.Item> :
                                  <Pagination.Item onClick={(event)=>{
                                    getProducts(item)
                                  }} key={item}>{item+1}</Pagination.Item>
                            }) 
                            }
                            <Pagination.Next onClick={(event)=>{
                                  if(products.lastPage){
                                    return
                                  }
                                    getProducts(products.pageNumber)
                                  }}/>
                            <Pagination.Last onClick={(event)=>{
                                    getProducts(products.totalPages-1)
                                  }}/>
                        </Pagination>
                    </Container>

                    </Card.Body>
                  </Card>
        )
    }

    return(
        <>
          <Container fluid>
            <Row>
                <Col>
                   {
                     products ? productView() : ''
                   }
                </Col>
            </Row>
          </Container>
          </>
    )
}

export default ViewProducts;