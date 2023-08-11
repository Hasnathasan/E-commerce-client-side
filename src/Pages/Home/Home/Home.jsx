import useCosmetics from "../../../Components/useCosmetics";
import Banner from "../Banner/Banner";
import ProductContainer from "../Product/ProductContainer";

const Home = () => {
    const [cosmetics] = useCosmetics();
    return (
        <div>
            <Banner></Banner>
            <ProductContainer products={cosmetics} heading={"Explore Cosmetic Items"}></ProductContainer>
        </div>
    );
};

export default Home;