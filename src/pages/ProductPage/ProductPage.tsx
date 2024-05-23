import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import Button from 'components/Button';
import Card from 'components/Card';
import Image from 'components/Image';
import Loader from 'components/Loader';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import Api from 'config/Api';
import { routerUrls } from 'config/Routes';
import { IProduct } from 'entities/product/types.ts';

import styles from './productPage.module.scss';

function getRelated(data: IProduct[], relatedCount: number) {
  const createRandomNumber = (n: number): number => Math.floor(Math.random() * n);

  return new Array(relatedCount).fill('').map(() => data[createRandomNumber(data.length)]);
}

const ProductPage = () => {
  const { id } = useParams() as { id: string };
  const [data, setData] = useState<IProduct | null>(null);
  const [relatedData, setRelatedData] = useState<IProduct[] | null>(null);

  useEffect(() => {
    Api.getProducts([id]).then((res) => {
      setData(res.data);
    });
    Api.getProducts().then((res) => {
      setRelatedData(getRelated(res.data, 3));
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  return (
    <div className={styles.product}>
      <Link to="/previous-route" className={styles.link}>
        <ArrowRightIcon />
        <Text view="p-20">Назад</Text>
      </Link>
      {!data && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      {data && (
        <div className={styles.info}>
          <Image className={styles.image} src={data.images[0].replace(/^\["|"\]$/g, '')} alt="product card" />
          <div className={styles.description}>
            <Text tag="h1" view="title">
              {data.title}
            </Text>
            <Text tag="p" view="p-20" color="secondary">
              {data.description}
            </Text>
            <Text tag="h1" view="title">
              {`$${data.price}`}
            </Text>
            <Button>Buy Now</Button>
          </div>
        </div>
      )}
      <Text tag="h2" className={styles.related}>
        Related Items
      </Text>
      <div className={styles['related-list']}>
        {relatedData &&
          relatedData.map((e) => (
            <Link to={routerUrls.product.create(e.id)} key={e.id} className={styles['related-list__card']}>
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
