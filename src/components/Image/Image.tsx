import { useEffect, useState } from 'react';
import fallBackImage from './assets/fallBackImage.svg';

const Image: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, className, ...props }) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  function onErrorHandler() {
    setImageSrc(fallBackImage);
  }

  return <img src={imageSrc} alt={alt} className={className} onError={onErrorHandler} {...props} />;
};

export default Image;
