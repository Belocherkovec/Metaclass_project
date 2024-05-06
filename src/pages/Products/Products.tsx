import Text from 'components/Text';
import styles from './Products.module.scss';
import Input from 'components/Input';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import Api from 'config/Api';
import Card from 'components/Card';
import { Link, useSearchParams } from 'react-router-dom';
import { ICategory, IProduct } from 'entities/product/types.ts';
import MultiDropdown, { Option } from 'components/MultiDropDown';
import Pagination from 'components/Pagination';
import { observer } from 'mobx-react-lite';
import productStore from 'store/ProductStore';

const Products = () => {
  const limitPerPage = 9;
  const [searchStr, setSearchStr] = useState('');
  const [data, setData] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<IProduct[]>([]);
  const [filterOptions, setFilterOptions] = useState<Option[]>([]);
  const [filterValues, setFilterValues] = useState<Option[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    productStore.updateProducts();
    console.log(productStore.products[0].title);
  }, []);

  useEffect(() => {
    Api.getProducts().then((res) => {
      setData(res.data);
      setFilteredData(res.data);
    });
    Api.getCategories().then((res) => {
      setFilterOptions(() => {
        const newState: Option[] = res.data.map((o: ICategory) => ({ key: o.name, value: o.name }));

        const categories = searchParams.get('categories')?.split(',');
        setFilterValues(newState.filter((o) => categories?.includes(o.value)));
        setSearchStr(searchParams.get('search') || '');

        return newState;
      });
    });
  }, []);

  useEffect(() => {
    const categoriesList = filterValues.map(({ value }) => value);
    setFilteredData((prevState) => {
      let newState = data;

      if (categoriesList.length) {
        newState = newState.filter((r) => categoriesList.includes(r.category.name));
      }

      if (searchStr) {
        newState = newState.filter(
          (r) => r.title.toLowerCase().includes(searchStr) || r.description.toLowerCase().includes(searchStr),
        );
      }

      return newState;
    });
    setCurrentPage(1);
  }, [data, searchParams]);

  /* Из-за этого куска кода, не работает переключение страниц в пагинации (все время сбрасывается на 1), я искренне не могу понять, почему??? */
  // useEffect(() => {
  //   if (filteredData.length > limitPerPage) {
  //     searchParams.set('page', currentPage.toString());
  //   } else {
  //     searchParams.delete('page');
  //   }
  //   setSearchParams(searchParams);
  // }, [currentPage, filteredData]);

  function searchSumbitHandler() {
    if (searchStr.length) {
      searchParams.set('search', searchStr);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  }

  function filterChangeHandler(newValue: Option[]) {
    setFilterValues(newValue);
    if (newValue.length) {
      searchParams.set('categories', newValue.map((o) => o.value).join(','));
    } else {
      searchParams.delete('categories');
    }
    setSearchParams(searchParams);
  }

  return (
    <section className={styles.products}>
      <Text tag="h1" view="title" align="center">
        Products
      </Text>
      <Text view="p-20" color="secondary" align="center" className={`${styles.secondary_text}`}>
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
          values.length === 0 ? 'Select categories' : values.map(({ value }) => value).join(', ')
        }
        className={styles.filter}
      />
      <div className={styles.products__info}>
        <Text tag="h2" className={styles.total}>
          Total Product
        </Text>
        <Text tag="span" view="p-20" color="accent" weight="bold">
          {filteredData.length || 0}
        </Text>
      </div>
      <div className={styles.products__list}>
        {filteredData.slice(currentPage * limitPerPage - limitPerPage, currentPage * limitPerPage).map((e) => (
          <Link to={`/products/${e.id}`} key={e.id} className={styles.products__card}>
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
      {filteredData.length > limitPerPage && (
        <Pagination
          className={styles.pagination}
          count={Math.ceil(filteredData.length / limitPerPage)}
          currentPage={currentPage}
          onChange={setCurrentPage}
        />
      )}
    </section>
  );
};

export default observer(Products);
