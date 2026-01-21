import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from "../../../components/Header";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ProductGallery from "../../CorporateGifts/Productgallery";
import './index.css';
import ProductDetails from "../ProductDetails";
import Footer from "../../../components/Footer";
import RecentlyViewed from "../../CorporateGifts/RecentlyViewed";
import SimilarProducts from "../../CorporateGifts/SimilarProducts";
import ProductFullSpecs from "../ProductFullSpecs";


const ApparelProductPage = () => {
  const { id } = useParams();
  const [imagesList, setImagesList] = useState([]);

  const [primaryCarousel, setPrimaryCarousel] = useState([]);
  const [secondaryCarousel, setSecondaryCarousel] = useState([]);



  const [productData, setProductData] = useState({
    name: "",
    tagline: "",
    features: [],
    keyFeature: "",
    delivery: "",
    additionalInfo: []
  });
  const [fullspecifications, setFullSpecifications] = useState(null);
  console.log("product data ---------> ");

  useEffect(() => {
    axios.get(`http://localhost:5002/apparel/products/${id}`)
      .then(res => {
        const row = res.data;
        console.log("response ---------> ", row);

        setImagesList(row.images || []);

        setProductData({
          name: row.name,
          tagline: row.productData.tagline,
          features: row.productData.features || [],
          keyFeature: row.productData.keyFeature,
          delivery: row.productData.delivery,
          additionalInfo: row.productData.additionalInfo || []
        });

        setFullSpecifications(row.fullSpecifications);


        setPrimaryCarousel(row.carousels.primary || []);
        setSecondaryCarousel(row.carousels.secondary || []);


        console.log("full specifications -------> ", row.fullSpecifications);
      })
      .catch(err => console.error(err));
  }, [id]);





  return (
    <div className="bg-white flex flex-col justify-center items-center">
      <Header />
      <Breadcrumbs />
      <div className="flex flex-row justify-center gap-8 mt-6 mb-10 bg-white mx-4">
        <ProductGallery images={imagesList} />
        <ProductDetails product={productData} />
      </div>
      <ProductFullSpecs specs={fullspecifications} />

      <SimilarProducts pcarousel={primaryCarousel} />
      <RecentlyViewed scarousel={secondaryCarousel} />
      <Footer />


    </div>
  )
}
export default ApparelProductPage;
