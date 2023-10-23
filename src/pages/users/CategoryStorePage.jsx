import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink,Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { Breadcrumb, Col, Container, Row } from "react-bootstrap"
import { getProductsOfCategories } from '../../services/product.service'
import InfiniteScroll from "react-infinite-scroll-component";
import SingleProductCard from "../../components/users/SingleProductCard";
import CategoryView from '../../components/users/CategoryView'

const CategoryStorePage = () => {
  
  const {categoryId,categoryTitle} = useParams()
  const [products,setProducts] = useState(null)   
  const [currentPage,setCurrentPage] = useState(0);
  
  useEffect(()=>{
      loadProductsOfCategories(0,9,'addedDate','desc')
  },[categoryId])

  const loadNextPage = () => {
    setCurrentPage(currentPage+1);
  }

  const loadProductsOfCategories = (pageNumber,pageSize,sortBy,sortDir) => {
     getProductsOfCategories(categoryId,pageNumber,pageSize,sortBy,sortDir)
     .then(data=>{
        if (currentPage===0) {
            setProducts({...data})
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

  return products && (
     <>
       <Container fluid className="px-5 pt-3">
        <Row>
            
            <Col md={2}>
              <CategoryView/>
            </Col>
            <Col md={10}>
            <Breadcrumb>
              <Breadcrumb.Item><Link to="/store">Store</Link></Breadcrumb.Item>
              <Breadcrumb.Item>{categoryTitle}</Breadcrumb.Item>
            </Breadcrumb>
              {products.content.length >0 ? ProductView() : <h1>No item available in this category.</h1>}
            </Col>
        </Row>
       </Container>
     </>
  )
}

export default CategoryStorePage