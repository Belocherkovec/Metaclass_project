import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Input from 'components/Input';
import Pagination from 'components/Pagination';
import Select from 'components/Select';
import Text from 'components/Text';
import productStore from 'store/ProductStore';
import styles from './Products.module.scss';

const Products = () => {
  const limitPerPage = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOptions, setFilterOptions] = useState<Record<string, string>>({});

  const [page, setPage] = useState(1);
  const [searchStr, setSearchStr] = useState('');

  const [selectFilterValue, setSelectFilterValue] = useState<string>('');

  useEffect(() => {
    productStore.updateCategories().then(() => setFilterOptions(productStore.categoryOptions));

    // set search str and active category
    setSearchStr(searchParams.get('search') || '');
    setSelectFilterValue(searchParams.get('category') || '');

    update();

    return () => productStore.reset();
  }, []);

  function update() {
    productStore.updateTotal({ title: searchStr, categoryId: selectFilterValue });
    productStore.filterProducts({ limit: limitPerPage, page: page, title: searchStr, categoryId: selectFilterValue });
  }

  function searchSumbitHandler() {
    if (searchStr.length) {
      searchParams.set('search', searchStr);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
    setPage(1);
    update();
  }

  function filterChangeHandler(newValue: string) {
    setSelectFilterValue(newValue);
    if (newValue) {
      searchParams.set('category', newValue);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
    // setPage(1);
  }

  useEffect(() => {
    update();
  }, [selectFilterValue, page]);

  return (
    <section className={styles.products}>
      <Text tag="h1" view="title" align="center">
        Products
      </Text>
      <Text view="p-20" color="secondary" align="center" className={styles.secondary_text}>
        We display products based on the latest products we have, if you want to see our old products please enter the
        name of the item
      </Text>
      <div className={styles.search}>
        <Input value={searchStr} onChange={setSearchStr} placeholder="Search product" />
        <Button onClick={searchSumbitHandler}>Find now</Button>
      </div>
      <Select
        options={filterOptions}
        value={selectFilterValue}
        className={styles.filter}
        onChange={filterChangeHandler}
      />
      <div className={styles.products__info}>
        <Text tag="h2" className={styles.total}>
          Total Product
        </Text>
        <Text tag="span" view="p-20" color="accent" weight="bold">
          {productStore.products.length || 0}
        </Text>
      </div>
      <div className={styles.products__list}>
        {productStore.products.map((e) => (
          <Link to={`/products/${e.id}`} key={e.id} className={styles.products__card}>
            <Card
              image={e.images[0]}
              captionSlot={e.category.name}
              title={e.title}
              subtitle={e.description}
              contentSlot={`$${e.price}`}
              actionSlot={<Button>Add to card</Button>}
            />
          </Link>
        ))}
      </div>
      {productStore.total > limitPerPage && (
        <Pagination
          className={styles.pagination}
          total={Math.ceil(productStore.total / limitPerPage)}
          onChange={setPage}
        />
      )}
    </section>
  );
};

export default observer(Products);
