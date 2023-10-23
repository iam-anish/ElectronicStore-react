import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import axios from "axios";
import { contactForm, infoWithImageInLeftSection, infoWithImageInRightSection, trendingProducts } from "./HomePageComponents";

function Index(){

    const [products,setProduct] = useState(
        [{
            "addedDate": "yyyy-MM-dd HH:mm:ss",
            "category": {
              "categoryId": "string",
              "coverImage": "string",
              "description": "string",
              "title": "string"
            },
            "description": "string",
            "discountedPrice": 0,
            "live": true,
            "price": 0,
            "productId": "string",
            "productImageName": "string",
            "quantity": 0,
            "stock": true,
            "title": "string"
          },
          {
            "addedDate": "yyyy-MM-dd HH:mm:ss",
            "category": {
              "categoryId": "string",
              "coverImage": "string",
              "description": "string",
              "title": "string"
            },
            "description": "string",
            "discountedPrice": 0,
            "live": true,
            "price": 0,
            "productId": "string",
            "productImageName": "string",
            "quantity": 0,
            "stock": true,
            "title": "string"
          },
          {
            "addedDate": "yyyy-MM-dd HH:mm:ss",
            "category": {
              "categoryId": "string",
              "coverImage": "string",
              "description": "string",
              "title": "string"
            },
            "description": "string",
            "discountedPrice": 0,
            "live": true,
            "price": 0,
            "productId": "string",
            "productImageName": "string",
            "quantity": 0,
            "stock": true,
            "title": "string"
          }
        ]
    )

    return(
    <>
    <Base title="Shop what you need" description={'Welcome to trending Store, We provide best items as you required.'} buttonEnabled={true} >
      
      <div className="my-4">
      {trendingProducts(products)}
      </div>
      <div className="my-5">
      {infoWithImageInLeftSection('https://picsum.photos/300','Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur impedit qui distinctio recusandae iure reprehenderit provident quidem nostrum magni optio.')}
      </div>
      <div className="my-5">
      {infoWithImageInRightSection('https://picsum.photos/300','Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur impedit qui distinctio recusandae iure reprehenderit provident quidem nostrum magni optio.')}
      </div>
      <div className="my-4">
        {contactForm()}
      </div>
    </Base>
   </>
    );
}

export default Index;