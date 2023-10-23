import { useEffect } from "react"
import { useState } from "react"
import { Col, Container, ListGroup,Breadcrumb, Row } from "react-bootstrap"
import { getCategories } from "../../services/category.service"
import { NavLink,Link } from "react-router-dom";
import image from "../../assest/logo.png"
import { getAllLiveProducts, getAllProducts } from "../../services/product.service";
import { toast } from "react-toastify";
import SingleProductCard from "./SingleProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import CategoryView from "../users/CategoryView";

const Store = () => {

    const [products,setProducts] = useState(null)
    const [currentPage,setCurrentPage] = useState(0);

    const loadNextPage = () => {
        setCurrentPage(currentPage+1);
    }

    useEffect(()=>{
        loadProducts(currentPage,9,'addedDate','desc')
    },[])

    useEffect(()=>{
       if (currentPage>0) {
          loadNextPage(currentPage,9,'addedDate','desc')
       }  
    },[currentPage])

    const loadProducts = (pageNumber,pageSize,sortBy,sortDir) => {
        getAllLiveProducts(pageNumber,pageSize,sortBy,sortDir).then(data=>{
            if (currentPage===0) {
                setProducts({...data})
                console.log(data)
            }else{
                setProducts({
                content: [...products.content,...data.content],
                lastPage: data.lastPage,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages
                })
            }
        }).catch(error=>{
            console.log(error)
            toast.error("Error in loading products")
        })
    }


    const ProductView = () => {
        return products && (
            <InfiniteScroll
                 dataLength={products.content.length}
                  next={loadNextPage}
                  hasMore={!products.lastPage}
                  loader={<h3 className="text-center my-4">Loading...</h3>}
                  endMessage={<p className="text-center my-3">All products loaded</p>}
                >
            <Container fluid>     
            <Row>
                {
                  products.content.map(p=>(
                     <Col key={p.productId} md={3}>
                        <SingleProductCard product={p} />
                     </Col>
                  ))
                }
            </Row>
            </Container>   
            </InfiniteScroll>
        )
    }

    return(
        <Container fluid className="px-5 pt-3">
            <Row>
                <Col md={2}>
                    <CategoryView/>
                </Col>
                <Col md={10}>
                <Breadcrumb>
              <Breadcrumb.Item as={Link} to="/store">Store</Breadcrumb.Item>
              <Breadcrumb.Item>All Products</Breadcrumb.Item>
            </Breadcrumb>
                   {ProductView()}
                </Col>
            </Row>
        </Container>
    )
}

export default Store;