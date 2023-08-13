import useCosmetics from "../../../Hooks/useCosmetics";
import Banner from "../Banner/Banner";
import Gallery from "../Gallery/Gallery";
import ProductContainer from "../Product/ProductContainer";

const Home = () => {
    const [cosmetics] = useCosmetics();
    console.log(cosmetics);
    return (
        <div>
            <Banner></Banner>
            <ProductContainer products={cosmetics} heading={"Explore Cosmetic Items"}></ProductContainer>
            <Gallery></Gallery>
        </div>
    );
};

export default Home;