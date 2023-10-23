import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {AiFillHome,AiFillDashboard} from "react-icons/ai";
import {BiSolidCategory} from "react-icons/bi";
import {RiLogoutBoxRFill} from "react-icons/ri";
import {MdCategory,MdAddBox, MdViewDay} from "react-icons/md";
import {FaCartArrowDown,FaUsers} from "react-icons/fa";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const SideMenu = () => {
   
  const {logout} = useContext(UserContext)


    return(
        <>
           <ListGroup variant="flush" className="sticky-component">
              <ListGroup.Item as={NavLink} to="/admin/home" action >
                <AiFillHome size={20}/>
                <span className="ms-2">Home</span>
                 </ListGroup.Item>
              <ListGroup.Item as={NavLink} to="/admin/add-category" action >
                <BiSolidCategory size={20}/>
                <span className="ms-2">Add Category</span></ListGroup.Item>
              <ListGroup.Item as={NavLink} to="/admin/categories" action >
                <MdCategory size={20}/>
                <span className="ms-2">View Categories</span></ListGroup.Item>
              <ListGroup.Item as={NavLink} to="/admin/add-product" action >
              <MdAddBox size={20}/>
                <span className="ms-2">Add Product</span></ListGroup.Item>
              <ListGroup.Item as={NavLink} to="/admin/products" action >
              <MdViewDay size={20}/>
                <span className="ms-2">View Product</span></ListGroup.Item>
              <ListGroup.Item as={NavLink} to="/admin/orders" action >
              <FaCartArrowDown size={20}/>
                <span className="ms-2">Orders</span></ListGroup.Item>
              <ListGroup.Item as={NavLink} to="/admin/users" action >
              <FaUsers size={20}/>
                <span className="ms-2">Users</span></ListGroup.Item>
              <ListGroup.Item as={NavLink} to="/users/home" action >
              <AiFillDashboard size={20}/>
                <span className="ms-2">Dashboard</span></ListGroup.Item> 
              <ListGroup.Item action onClick={event=>{
                  logout()
                }}>
              <RiLogoutBoxRFill size={20}/>
                <span className="ms-2">Logout</span></ListGroup.Item> 
           </ListGroup>
        </>
    )
}

export default SideMenu;