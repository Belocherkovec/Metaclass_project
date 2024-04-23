import Text from 'components/Text';
import styles from './Products.module.scss';
import Input from 'components/Input';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import Api from 'config/Api';
import Card from 'components/Card';
import { Link } from 'react-router-dom';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

const Products = () => {
  const [data, setData] = useState<IProduct[] | null>(null);
  const [search, setSearch] = useState('');
  const [filterOptions, setFilterOptions] = useState('');

  useEffect(() => {
    Api.getProducts().then((res) => setData(res.data));
  }, []);

  return (
    <div className={styles.products}>
      <Text tag="h1" view="title" align="center">
        Products
      </Text>
      <Text view="p-20" color="secondary" align="center" className={`${styles.secondary_text}`}>
        We display products based on the latest products we have, if you want to see our old products please enter the
        name of the item
      </Text>
      <div className={styles.search}>
        <Input value={search} onChange={setSearch} placeholder="Search product" />
        <Button>Find now</Button>
      </div>
      <Input
        className={styles.filter}
        value={filterOptions}
        onChange={setFilterOptions}
        placeholder="Filter"
        afterSlot
      />
      <div className={styles.products__info}>
        <Text tag="h2" className={styles.total}>
          Total Product
        </Text>
        <Text tag="span" view="p-20" color="accent" weight="bold">
          {data?.length || 0}
        </Text>
      </div>
      <div className={styles.products__list}>
        {data &&
          data.map((e) => (
            <Link to={`/products/${e.id}`} key={e.id}>
              <Card
                image={e.images[0].replace(/^\["|"\]$/g, '')}
                title={e.title}
                subtitle={e.description}
                contentSlot={`$${e.price}`}
                actionSlot={<Button disabled>Add to card</Button>}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Products;
