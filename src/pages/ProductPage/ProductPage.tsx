import { useParams, Link } from 'react-router-dom';
import { IProduct } from 'pages/Products';
import { useState, useEffect } from 'react';
import Api from 'config/Api';

import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import Text from 'components/Text';
import Button from 'components/Button';
import Card from 'components/Card';

import styles from './productPage.module.scss';

const ProductPage = () => {
  const { id } = useParams() as { id: string };
  const [data, setData] = useState<IProduct[] | null>(null);
  const [currentProductData, setCurrentProductData] = useState<IProduct | null>(null);

  useEffect(() => {
    Api.getProducts().then((res) => {
      setData(res.data);
      setCurrentProductData(res.data.filter((e: IProduct) => e.id === +id)[0]);
    });
  }, []);

  return (
    <div className={styles.product}>
      <Link to="/previous-route" className={styles.link}>
        <ArrowRightIcon />
        <Text view="p-20">Назад</Text>
      </Link>
      {currentProductData && (
        <div className={styles.info}>
          <img
            className={styles.image}
            src={currentProductData.images[0].replace(/^\["|"\]$/g, '')}
            alt="product card"
          />
          <div className={styles.description}>
            <Text tag="h1" view="title" className={styles.info__title}>
              {currentProductData.title}
            </Text>
            <Text tag="p" view="p-20" color="secondary">
              {currentProductData.description}
            </Text>
            <Text tag="h1" view="title" className={styles.info__title}>
              {`$${currentProductData.price}`}
            </Text>
            <Button>Buy Now</Button>
          </div>
        </div>
      )}
      <Text tag="h2" className={styles.related}>
        Related Items
      </Text>
      <div className={styles['related-list']}>
        {data &&
          data
            .filter((_, index) => index < 3)
            .map((e) => (
              <Link to={`/products/${e.id}`} key={e.id}>
                <Card
                  image={e.images[0].replace(/^\["|"\]$/g, '')}
                  title={e.title}
                  subtitle={e.description}
                  contentSlot={`$${e.price}`}
                  actionSlot={<Button>Add to card</Button>}
                />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default ProductPage;
