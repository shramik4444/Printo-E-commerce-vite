
import React, { useRef } from 'react';
import { Box, IconButton, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// const products = [
//   { title: 'Jumbo Mug - White', price: '₹584.10 each for 10 pieces', img: 'https://printo-s3.dietpixels.net/site/20221206_172959843163_133a55_Jumbo_White_Tumbler_1.jpg?quality=70&format=webp&w=640' },
//   { title: 'Rockstar Spill Free - White', price: '₹1,522.50 for 1 piece', img: 'https://printo-s3.dietpixels.net/site/20220713_065334817536_9509dc_Rockstar_Spill_Free_White_Bottle_1.jpg?quality=70&format=webp&w=640' },
//   { title: 'Glaze Spill Free Sipper - Black', price: '₹1,998.92 for 1 piece', img: 'https://printo-s3.dietpixels.net/1_1759150036.jpg?quality=70&format=webp&w=640' },
//   { title: 'Glaze Spill Free Sipper - White', price: '₹3,620.24 for 1 piece', img: 'https://printo-s3.dietpixels.net/site/20220714_130259868641_035b4a_Glaze_Spill_Free_White_Bottle_1.jpg?quality=70&format=webp&w=640' },
//   { title: 'Rockstar Spill Free - White', price: '₹1,522.50 for 1 piece', img: 'https://printo-s3.dietpixels.net/site/20220713_065334817536_9509dc_Rockstar_Spill_Free_White_Bottle_1.jpg?quality=70&format=webp&w=640' },
//   { title: 'Curvy Sipper - Black', price: '₹1,439.55 for 1 piece', img: 'https://printo-s3.dietpixels.net/site/20220713_080934540556_1eda21_Curvy_Black_Hot_and_Cold_Sipper_1.jpg?quality=70&format=webp&w=640' },
//   { title: 'Rockstar Spill Free - White', price: '₹1,522.50 for 1 piece', img: 'https://printo-s3.dietpixels.net/site/20220713_065334817536_9509dc_Rockstar_Spill_Free_White_Bottle_1.jpg?quality=70&format=webp&w=640' },
// ];

const RecentlyViewed = ({ scarousel = [] }) => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', mt: 4 }}>
      <Typography variant="h6" gutterBottom>Recently Viewed Products</Typography>
      <IconButton
        onClick={() => scroll('left')}
        sx={{ position: 'absolute', left: 0, top: '40%', zIndex: 10 }}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        onClick={() => scroll('right')}
        sx={{ position: 'absolute', right: 0, top: '40%', zIndex: 10 }}
      >
        <ArrowForwardIos />
      </IconButton>

      <Box
        ref={carouselRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { display: 'none' },
          gap: 2,
          p: 1,
        }}
      >
        {scarousel.map((product, index) => (
          <Card key={index} sx={{ minWidth: 200, flex: '0 0 auto' }}>
            <CardMedia
              component="img"
              height="100"
              image={product.image}
              alt={product.name}
              className='h-44 w-32'
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {product.name}
              </Typography>
              <Typography variant="body2">{product.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RecentlyViewed;












