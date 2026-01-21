import React, { useState } from 'react';
import './index.css';
// import Breadcumbs from '../Breadcrumbs';
// import ProductGallery from '../CorporateGifts/Productgallery';
// import ProductInfo from '../CorporateGifts/ProductInfo';
// import ProductCarousel from '../CorporateGifts/SimilarProducts';
// import RecentlyViewed from '../CorporateGifts/RecentlyViewed';
// import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  const cartPage = () => {
    navigate("/cart");
    console.log("cart page clicked ");
  }

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <header className='header'>

      <div className='header-top'>
        <div className='header-notice'>
          4 Hrs Express Delivery now in Bengaluru, Hyderabad, Chennai & Delhi
        </div>
      </div>


      {/* <div className='header-main'> */}
      <div className='header-container'>
        <div className='header-left'>

          <div className='header-second text-black'>
            <div className='left-text'>Track Order</div>

            <div className="header-right text-black">
              <a className="header-link">Store Locator</a>
              <a className="header-link">Sample Kit</a>
              <div className='button-cont'>Bussiness Solutions</div>

            </div>


          </div>



          <div className='logo-cont'>

            <div className="logo flex flex-row gap-12" >
              <a href="/">
                <img
                  src="https://printo-s3.dietpixels.net/site/Printo-logo/printo-logo_1710143759.png"
                  alt="Printo Logo"
                  onClick={() => window.location.href = '/'}
                />
              </a>
              <input type="search" placeholder="Search..." className='search-input bg-white' />
            </div>


            <div className="header-right-logo">

              <a className="header-link">Help Center</a>
              <button className="login-btn">Login / Signup</button>
              <div className="cart-icon" onClick={cartPage}>
                <span className="cart-count">0</span>
                🛒
              </div>
            </div>


          </div>
          <div className='nav-cont'>
            <nav className={`nav-menu ${menuOpen ? 'active' : ''} bg-#f8f9fa text-black`}>
              <a href="/categories/all-categories">All Products</a>
              <a href="/categories/calendars-and-diaries">Calendars & Diaries</a>
              <a href="/categories/same-day-products">Same Day Delivery</a>
              <a href="/categories/stationery">Stationery</a>
              <Link to="/corporate-gifts">Corporate Gifts</Link>
              <a href="/categories/photo-gifts">Photo Gifts</a>
              <a href="/categories/packaging-materials">Packaging</a>
              <Link to="/apparel/products">Apparel</Link>

              <a href="/categories/drinkwares">Drinkware</a>
            </nav>
          </div>

        </div>
        {/* </div> */}
      </div>



      {/* <Breadcumbs/>
      <div className='product-cont'>
      <ProductGallery images={imagesList}/>
      <ProductInfo/>
      </div>
      <ProductCarousel/>
      <RecentlyViewed/>
      <Footer/> */}
    </header>


  )

}
export default Header