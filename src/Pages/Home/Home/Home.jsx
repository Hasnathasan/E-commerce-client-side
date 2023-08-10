import useCosmetics from "../../../Components/useCosmetics";
import Banner from "../Banner/Banner";
import ProductContainer from "../Product/ProductContainer";

const Home = () => {
    const [cosmetics, isCosmeticsLoading] = useCosmetics();
    if(isCosmeticsLoading){
        return
    }
    return (
        <div>
            <Banner></Banner>
            <ProductContainer products={cosmetics} heading={"Explore Cosmetic Items"}></ProductContainer>
        </div>
    );
};

export default Home;