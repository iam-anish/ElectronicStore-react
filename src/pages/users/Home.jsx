import { isAdminUser } from "../../auth/HelperAuth";

const Home = () => {
    return(
        <>
        <h1>This is home page</h1>
        <h1>{JSON.stringify(isAdminUser())}</h1>
        </>
    );
};

export default Home;