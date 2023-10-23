
import Base from "../components/Base";

function Services(){
    return(
        <>
        <Base
        title="Service we provide"
        description="In this we will discuss about the service that we provide."
        buttonEnabled={true}
        buttonText="Home"
        buttonLink="/"
        buttonType="warning"
        >
          <h3>This is service page</h3>
        </Base>
       </>
        );
}

export default Services;