import { Container } from "react-bootstrap"

let styleContainer = {
    background: "#383838",
    height: "200px"

}

const Footer = () => {
    return(
        <Container fluid className="p-4 text-white d-flex justify-content-center align-items-center text-center" style={styleContainer}>
            <div>
            <h3>We provide best Products</h3>
            <p>All rights reserved - <b>Substring Technologies</b></p>
            </div>
        </Container>
    );
}

export default Footer;