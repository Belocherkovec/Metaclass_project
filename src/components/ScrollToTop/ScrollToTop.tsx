import { useState, useEffect } from 'react';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import styles from './scrollToTop.module.scss';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Прокрутка страницы до верха
  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  // Прокрутка страницы до верха
  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 15;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button className={styles.scroll} onClick={scrollToTop}>
          <ArrowDownIcon className={styles.scroll__icon} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
