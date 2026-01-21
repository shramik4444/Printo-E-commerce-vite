
import React, { useState } from 'react';
import Header from '../../../components/Header';
import './index.css';
import RecentlyViewed from '../RecentlyViewed';
import { Plus, Minus } from 'lucide-react';
import Footer from '../../../components/Footer';
const CorporateGiftsView = () => {

  const [openIndex, setOpenIndex] = useState(null);



  const faqsLeft = [
    {
      question: "What is label printing?",
      answer:
        "Label printing is the process of producing labels for products, packaging, or branding using various printing techniques."
    },
    {
      question: "Can You Assist Me With A Custom-Shaped Label?",
      answer:
        "Absolutely! We have a sophisticated laser cutter that can virtually cut any shape on virtually any material (with a couple of minor exceptions)."
    },
    {
      question: "What dimensions and shape ought my product labels to have?",
      answer:
        "Label dimensions depend on your product packaging, branding, and application method."
    },
    {
      question: "How long does it take to receive my custom labels?",
      answer:
        "Production and delivery typically take 7–10 business days."
    }
  ];

  const faqsRight = [
    {
      question: "Can labels be printed in different sizes and shapes?",
      answer:
        "Yes, labels can be printed in a wide variety of sizes and shapes."
    },
    {
      question: "How Much Does It Cost For Extra Colors On My Product Labels?",
      answer:
        "Additional colors may slightly increase cost depending on complexity."
    },
    {
      question: "What file formats do you accept for custom label design?",
      answer:
        "We accept AI, PDF, EPS, PSD, and high-resolution PNG files."
    },
    {
      question: "Do you offer samples of custom labels?",
      answer:
        "Yes, we provide samples upon request."
    }
  ];

  function AccordionItem({ question, answer, isOpen, onClick }) {
    return (
      <div className="faq-item">
        <button className="faq-question" onClick={onClick}>
          <span>{question}</span>
          <span className="icon">{isOpen ? "−" : "+"}</span>
        </button>

        <div className={`faq-answer ${isOpen ? "open" : ""}`}>
          <div className="faq-answer-inner">{answer}</div>
        </div>

      </div>
    );
  }




  const promotionalProducts = [
    {
      img: 'https://printo-s3.dietpixels.net/cloudinary/Images/Back_1747859819.jpg?quality=70&format=webp&w=640',
      alt: 'Employee Engagement Kit',
    },
    {
      img: 'https://printo-s3.dietpixels.net/cloudinary/Images/1_1750188148.jpg?quality=70&format=webp&w=640',
      alt: 'Custom Notebooks',
    },
    {
      img: 'https://printo-s3.dietpixels.net/cloudinary/Images/T-shirts_1747654653.jpg?quality=70&format=webp&w=640',
      alt: 'Branded Pens',
    },
    { img: 'https://printo-s3.dietpixels.net/products1-1_1758110671.jpg?quality=70&format=webp&w=640', alt: 'Custom Calendars' },
    { img: 'https://printo-s3.dietpixels.net/site/2025/Corporate%20gifts/Products/Desk-top-items_1743779446.jpg?quality=70&format=webp&w=640', alt: 'Desk Top Items' },
    { img: 'https://printo-s3.dietpixels.net/site/2025/Corporate%20gifts/Products/Pens_1743779446.jpg?quality=70&format=webp&w=640', alt: 'Custom Mugs' },
    { img: 'https://printo-s3.dietpixels.net/site/2025/Corporate%20gifts/Products/Pens_1743779446.jpg?quality=70&format=webp&w=640', alt: 'Tech Gadgets' },
    { img: 'https://printo-s3.dietpixels.net/Caalendar_1760648664.jpg?quality=70&format=webp&w=640', alt: 'Branded Bags' },
    { img: 'https://printo-s3.dietpixels.net/cloudinary/Images/notebook_1747859825.jpg?quality=70&format=webp&w=640', alt: 'Custom Drinkware' },
    { img: 'https://printo-s3.dietpixels.net/cloudinary/Images/Laptop-sleeves_1747859757.jpg?quality=70&format=webp&w=640', alt: 'Apparel & Wearables' },
    { img: 'https://printo-s3.dietpixels.net/site/2025/Corporate%20gifts/mosue-pad_1743881318.jpg?quality=70&format=webp&w=640', alt: 'Custom Tech Accessories' },
    { img: 'https://printo-s3.dietpixels.net/site/2025/Corporate%20gifts/Products/Keychain_1743779446.jpg?quality=70&format=webp&w=640', alt: 'Keychains & More' },

    // Add more products as needed
  ];


  return (
    <div className='full-cont'>
      <div>
        <Header />
        <div className='cont bg-white'>

          <div className='flex flrx-row justify-center m-5 mb-20 gap-5'>

            <img src="https://printo-s3.dietpixels.net/cloudinary/Images/Employee-Engagement-Kit_1747498378.jpg?quality=70&format=webp&w=640"
              className='img'
              onClick={() => { }} />
            <img src="https://printo-s3.dietpixels.net/cloudinary/Images/1_1747498378.jpg?quality=70&format=webp&w=640"
              alt="Printo Logo"
              className='img'
              onClick={() => { }} />
            <img src="https://printo-s3.dietpixels.net/1_1758309885.jpg?quality=70&format=webp&w=640"
              alt="Printo Logo"
              className='img'
              onClick={() => { }} />
          </div>

          <h1>Promotional Products</h1>

          <div className='promotional-cont'>
            {promotionalProducts.map((product, index) => (
              <div key={index} className='product-card'>
                <img src={product.img} alt={product.alt} className='product-image' />
                <p>{product.alt}</p>
              </div>
            ))}
          </div>

          <h1>Custom Packaging and Accessories to elevate every Gift</h1>

          <RecentlyViewed />

          <h1>How It Works ?</h1>
          <img src='https://printo-s3.dietpixels.net/site/2025/Corporate%20gifts/How%20its%20works/Banner_1743857994.jpg?quality=70&format=webp&w=1920' />

          <div className='flex flex-row justify-around items-center gap-10 m-10 mb-20'>
            <img src='https://printo-s3.dietpixels.net/site/2025/Marketing%20page/Corporate_1745405952.jpg?quality=70&format=webp&w=1080' className='image' />
            <div className='flex flex-col text-black gap-5'>
              <h1>Bulk Corporate gifting</h1>
              <p>Looking to order different products with customization? We've got everything you level! </p>
              <ul className='flex flex-col'>
                <li>Our expert team will help you to design & choose the product.</li>
                <li>You will have a key accounts manager to help you find the best fit!</li>
                <li>Easy ordering process & post ordering support.</li>
                <li>We deliver our promises anywhere on time.</li>
              </ul>
              <button type='button' className='btn btn-primary border border-black w-30%'>Contact Us</button>
            </div>
          </div>




          <section className="faq-section text-black bg-white py-10 px-5">
            <h2>Frequently Asked Questions</h2>

            <div className="faq-grid">
              {[faqsLeft, faqsRight].map((column, colIndex) => (
                <div key={colIndex} className="faq-column">
                  {column.map((item, index) => {
                    const id = `${colIndex}-${index}`;
                    return (
                      <AccordionItem
                        key={id}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openIndex === id}
                        onClick={() =>
                          setOpenIndex(openIndex === id ? null : id)
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </section>




          <img
            src='https://printo-s3.dietpixels.net/site/2025/Corporate%20gifts/Icon%20Banner/Icon-banner_1743858329.jpg?quality=70&format=webp&w=1920'
            className='w-75 '
          />

          <Footer />


        </div>
      </div>
      <button onClick={() => window.location.href = '/ProductPage'}>Mug</button>
    </div>
  );
}
export default CorporateGiftsView;      