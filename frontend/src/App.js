import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import Item from './Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
//import DropDownMenu from '@material-ui/core/DropDownMenu';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
//import DropDownMenu from 'material-ui/DropDownMenu';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



import { Wrapper, StyledButton } from './App.styles';

const getProducts = async () => {
  let data =  await (await fetch('http://localhost:8000/api/robots')).json();
  data.data.map((d, index)=>{
    d.id = index;
    return d
  })
  return data.data
}
  

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [materials, setMaterials] = useState([])
  const [material, setMaterial] = useState('');
  const { data, isLoading, error } = useQuery(
    'products',
    getProducts
  );
  const [searchResult, setSearchResult] = useState([]);

  useEffect(()=>{
    if (data?.length){
      const uniqueMaterials = data.map(item => item.material)
      .filter((value, index, self) => self.indexOf(value) === index)
      setMaterials(uniqueMaterials)
    }
  },[data])

  useEffect(()=>{
    if (data?.length){
      if (material){
        const result = data.filter((d)=>d.material===material);
        setSearchResult(result)
      }else {
        setSearchResult(data)
      }
    }
  },[material, data])

  const getTotalItems = (items) =>
    items.reduce((ack, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem) => {
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
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
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
    setMaterial(event.target.value);
  }

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={material}
          label="Select Material"
          onChange={handleMaterial}
        >
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
        {searchResult?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
