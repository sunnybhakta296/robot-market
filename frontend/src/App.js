import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import Item from './Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from "@material-ui/lab/Alert";



import { Wrapper, StyledButton } from './App.styles';
import { validateCartItems } from './Utils';

const getProducts = async () => {
  let data = await (await fetch('http://localhost:8000/api/robots')).json();
  data.data.map((d, index) => {
    d.id = index;
    return d
  })
  return data.data
}


const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [materials, setMaterials] = useState([])
  const [filter, setFilter] = useState('all');
  const [showAlert, setShowAlert] = useState(false);
  const { data, isLoading, error } = useQuery(
    'products',
    getProducts
  );
  const [filteredRobots, setFilteredRobots] = useState([]);

  useEffect(() => {
    if (data?.length) {
      const uniqueMaterials = [];
      data.forEach(
        (d) => !uniqueMaterials.includes(d.material) && uniqueMaterials.push(d.material)
      );
      setMaterials(uniqueMaterials)
    }
  }, [data])

  useEffect(() => {
    if (data?.length) {
      if (filter && filter != 'all') {
        const result = data.filter((d) => d.material === filter);
        setFilteredRobots(result)
      } else {
        setFilteredRobots(data)
      }
    }
  }, [filter, data])

  const getTotalItems = (items) =>
    items.reduce((ack, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem) => {
    if (clickedItem.stock > 0) {
      if (validateCartItems(clickedItem, cartItems)) {
        clickedItem.stock--;
        setCartItems(prev => {
          const isItemInCart = prev.find(item => item.id === clickedItem.id);

          if (isItemInCart) {
            return prev.map(item =>
              item.id === clickedItem.id
                ? { ...item, amount: item.amount + 1 }
                : item
            );
          }
          return [...prev, { ...clickedItem, amount: 1 }];
        });

      } else {
        //show alert
        setShowAlert(true)
      }
    }
  };

  const handleRemoveFromCart = (clickedItem) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === clickedItem.id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [])
    );
  };

  const handleMaterial = (event) => {
    console.log(event.target.value, 'material..')
    setFilter(event.target.value);
  }

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      {showAlert && (<Alert onClose={() => { setShowAlert(false) }} severity="warning">

        Only 5 unique item is allowed but you can add unlimited item for these unique 5 items
      </Alert>)}
      <Select
        labelId="material-filter-label"
        id="material-filter"
        value={filter}
        label="Select Material"
        onChange={handleMaterial}
      >
        <MenuItem key='all' value="all">All</MenuItem>
        {materials?.map((material) => (<MenuItem key={material} value={material}>{material}</MenuItem>))}

      </Select>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {filteredRobots?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
