import Text from 'components/Text';
import styles from './Products.module.scss';
import Input from 'components/Input';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import Api from 'config/Api';
import Card from 'components/Card';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { ICategory, IProduct } from 'entities/product/types.ts';
import MultiDropdown, { Option } from 'components/MultiDropDown';

const Products = () => {
  const location = useLocation();
  const [searchStr, setSearchStr] = useState('');
  const [filteredData, setFilteredData] = useState<IProduct[] | null>(null);
  const [data, setData] = useState<IProduct[] | null>(null);
  const [filterOptions, setFilterOptions] = useState<Option[]>([]);
  const [filterValues, setFilterValues] = useState<Option[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    Api.getProducts().then((res) => {
      setData(res.data);
      setFilteredData(res.data);
    });
    Api.getCategories().then((res) => {
      setFilterOptions(() => {
        const newState: Option[] = res.data.map((o: ICategory) => ({ key: o.name, value: o.name }));

        const categories = searchParams.get('categories')?.split(',');
        setFilterValues(newState.filter((o) => categories?.includes(o.value)));

        return newState;
      });
    });
  }, []);

  useEffect(() => {
    if (!data) return;

    const categoriesList = filterValues.map(({ value }) => value);
    if (categoriesList.length) {
      setFilteredData(data?.filter((r) => categoriesList.includes(r.category.name)));
    } else {
      setFilteredData([...data]);
    }
  }, [filterValues, data]);

  function searchSumbitHandler() {
    setSearchParams({ search: searchStr });
  }

  function filterChangeHandler(newValue: Option[]) {
    setFilterValues(newValue);
    setSearchParams({ categories: newValue.map((o) => o.value).join(',') });
  }

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
        <Input value={searchStr} onChange={setSearchStr} placeholder="Search product" />
        <Button onClick={searchSumbitHandler}>Find now</Button>
      </div>
      <MultiDropdown
        options={filterOptions}
        value={filterValues}
        onChange={filterChangeHandler}
        getTitle={(values: Option[]) =>
          values.length === 0 ? 'Выберите категории' : values.map(({ value }) => value).join(', ')
        }
        className={styles.filter}
      />
      <div className={styles.products__info}>
        <Text tag="h2" className={styles.total}>
          Total Product
        </Text>
        <Text tag="span" view="p-20" color="accent" weight="bold">
          {filteredData?.length || 0}
        </Text>
      </div>
      <div className={styles.products__list}>
        {filteredData &&
          filteredData.map((e) => (
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
    </div>
  );
};

export default Products;
