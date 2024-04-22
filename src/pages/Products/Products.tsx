import Text from 'components/Text';
import styles from './Products.module.scss';
import Input from 'components/Input';
import { useState } from 'react';
import Button from 'components/Button';

const Products = () => {
  const [search, setSearch] = useState('');
  return (
    <div className={styles.products}>
      <div className="content">
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
      </div>
    </div>
  );
};

export default Products;
