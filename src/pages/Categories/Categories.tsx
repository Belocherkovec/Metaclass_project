import Text from 'components/Text';
import styles from './categories.module.scss';
import { useEffect, useState } from 'react';
import Api from 'config/Api';
import Card from 'components/Card';
import { ICategory } from 'entities/category/types.ts';

const Categories = () => {
  const [data, setData] = useState<ICategory[]>([]);

  useEffect(() => {
    Api.getCategories().then((res) => setData(res.data));
  }, []);

  return (
    <section className={styles.categories}>
      <Text tag="h1" view="title" align="center">
        Categories
      </Text>
      <div className={styles.categories__content}>
        {data.map((c) => (
          // <Link to={`/products/${e.id}`} key={e.id} className={styles.products__card}>
          <Card image={c.image} title={c.name} className={styles.categories__card} key={c.name} />
          // </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
