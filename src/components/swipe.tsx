import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import styles from './swipe.module.css'; // Import CSS module

const Swipe = ({ images }: { images: string[] }) => {
  useEffect(() => {
    const mySwiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });

    return () => {
      mySwiper.destroy();
    };
  }, []);

  return (
    <div className={`swiper-container ${styles.swiperContainer}`}>
      <div className={`swiper-wrapper ${styles.swiperWrapper}`}>
        {images.map((imageUrl, index) => (
          <div key={index} className={`swiper-slide ${styles.swiperSlide}`}>
            <img src={imageUrl} alt={`Slide ${index + 1}`} className={styles.slideImage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Swipe;
