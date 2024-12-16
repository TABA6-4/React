import React from "react";
import ImageSlider from "../components/ImageSlider.tsx";
import Introduction from "../components/Introduction.tsx";


const Home: React.FC = () => {
    return (
        <div style={{marginTop: "5rem"}}>
            <ImageSlider/>
            <Introduction/>
        </div>
    );
};

export default Home;