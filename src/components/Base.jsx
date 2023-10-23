import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";

let styleContainer = {
    background: "#383838",
    height: "200px"

}

const Base = ({title="Page Title",
               description="Welcome to dynamic Store",
               children,
               buttonEnabled=false,
               buttonText='Show Now',
               buttonLink='/',
               buttonType='primary'}) => {
   return(

    <div> 
       
       <Container fluid className="p-4 text-white d-flex justify-content-center align-items-center text-center" style={styleContainer}>
           <div>
           <h3 className="text-center">{title}</h3>
           <p className="text-center">{description && description}</p>
          {buttonEnabled && <Button as={NavLink} to={buttonLink} variant={buttonType}>{buttonText}</Button>}
           </div>
       </Container>
       {children}
       <Footer></Footer>
    </div>

   );
}

export default Base;