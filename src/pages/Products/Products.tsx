import Text from 'components/Text';
import styles from './Products.module.scss';
import Input from 'components/Input';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import Api from 'config/Api';
import Card from 'components/Card';
import { Link, useSearchParams } from 'react-router-dom';
import { ICategory } from 'entities/category/types';
import MultiDropdown, { Option } from 'components/MultiDropDown';
import Pagination from 'components/Pagination';
import { observer } from 'mobx-react-lite';
import productStore from 'store/ProductStore';
import Select from 'components/Select';

const selectOptions = {
  1: 'Nikolai',
  2: 'Denis',
  3: 'Alina',
  4: 'Valentin',
};

const Products = () => {
  const limitPerPage = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOptions, setFilterOptions] = useState<Option[]>([]);

  const [page, setPage] = useState(1);
  const [searchStr, setSearchStr] = useState('');
  const [filterValues, setFilterValues] = useState<Option[]>([]);

  const [selectValue] = useState<string>(selectOptions['1']);

  useEffect(() => {
    // set search str
    setSearchStr(searchParams.get('search') || '');

    // get categories
    Api.getCategories().then((res) => {
      setFilterOptions(() => {
        const newState: Option[] = res.data.map((o: ICategory) => ({ id: o.id, key: o.name, value: o.name }));

        // set active categories
        const categories = searchParams.get('categories')?.split(',');
        setFilterValues(newState.filter((o) => categories?.includes(o.id.toString())));

        return newState;
      });
    });

    update();

    return () => productStore.reset();
  }, []);

  function update() {
    productStore.updateTotal({ title: searchStr, categoryId: filterValues[0]?.id });
    productStore.filterProducts({ limit: limitPerPage, page: page, title: searchStr, categoryId: filterValues[0]?.id });
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

  function filterChangeHandler(newValue: Option[]) {
    setFilterValues(newValue);
    if (newValue.length) {
      searchParams.set('categories', newValue.map((o) => o.id).join(','));
    } else {
      searchParams.delete('categories');
    }
    setSearchParams(searchParams);
    setPage(1);
  }

  useEffect(() => {
    update();
  }, [filterValues, page]);

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
      <MultiDropdown
        options={filterOptions}
        value={filterValues}
        onChange={filterChangeHandler}
        getTitle={(values: Option[]) =>
          values.length === 0 ? 'Select category' : values.map(({ value }) => value).join(', ')
        }
        className={styles.filter}
      />
      <Select options={selectOptions} value={selectValue} />
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
