import { useEffect } from "react"
import { useState } from "react"
import { Col, Container, ListGroup, Row } from "react-bootstrap"
import { getCategories } from "../../services/category.service"
import { NavLink,Link } from "react-router-dom";
import image from "../../assest/logo.png"
import { getAllLiveProducts, getAllProducts } from "../../services/product.service";
import { toast } from "react-toastify";
import SingleProductCard from "./SingleProductCard";
import InfiniteScroll from "react-infinite-scroll-component";

const CategoryView = () => {

    const [categories,setCategories] = useState(null)

    const imageStyle = {
        width: "40px",
        height: "40px",
        objectFit: "cover"
    }

    useEffect(()=>{
        loadCategories(0,100000)
    },[])

    const loadCategories = (pageNumber,pageSize) => {
        getCategories(pageNumber,pageSize).then(data=>{
             console.log(data)
             setCategories({...data})
        }).catch(error=>{
            console.log(error)
        })
    }

    const categoryInnerView = () => {
        return (
            <>
               <ListGroup variant="flush" className="sticky-component">
                <ListGroup.Item as={NavLink} to="/store" action >
                    
                  <span className="ms-2">All Products</span>
                 </ListGroup.Item>

                {categories.content.map(cat=>(
                    <ListGroup.Item as={Link} to={`/store/${cat.categoryId}/${cat.title}`} key={cat.categoryId} action >
                        <img className="rounded-circle" src={(cat.coverImage ? (cat.coverImage.startsWith('http') ? cat.coverImage : image) : image)} style={imageStyle}/>
                      <span className="ms-2">{cat.title}</span>
                   </ListGroup.Item>
                ))}

               </ListGroup>
            </>
        )
    }

    return categories && (
        <>
          {categoryInnerView()}
        </>
    )
}

export default CategoryView