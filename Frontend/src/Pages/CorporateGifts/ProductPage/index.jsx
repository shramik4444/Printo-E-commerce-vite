import Header from "../../../components/Header";
import Breadcumbs from "../../../components/Breadcrumbs";
import Footer from "../../../components/Footer";
import ProductGallery from "../Productgallery";
import ProductInfo from "../ProductInfo";
import ProductCarousel from "../SimilarProducts";
import RecentlyViewed from "../RecentlyViewed";

import './index.css';

const ProductPage = () => {
    const imagesList = ["https://printo-s3.dietpixels.net/cloudinary/res/dxivtqnri/image/upload/Drinkware/Dazzle-Mug/Dazzle-Mug/1657963990.jpg?quality=70&format=webp&w=256",
        "https://printo-s3.dietpixels.net/cloudinary/res/dxivtqnri/image/upload/Drinkware/Dazzle-Mug/Dazzle-Mug-1/1657963986.jpg?quality=70&format=webp&w=1080",
        "https://printo-s3.dietpixels.net/cloudinary/res/dxivtqnri/image/upload/Drinkware/Dazzle-Mug/Dazzle-Mug-2/1657963987.jpg?quality=70&format=webp&w=1080"]
    return (
        <div className="flex flex-col items-center justify-center bg-white">

            <Header />
            <Breadcumbs />
            <div className='flex flex-row justify-center items-start gap-8 mt-6 mb-10 mx-4 bg-white'>
                <ProductGallery images={imagesList} />
                <ProductInfo />
            </div>
            <ProductCarousel />
            <RecentlyViewed />
            <Footer />
        </div>
    )
}

export default ProductPage;