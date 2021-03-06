import Button from '@material-ui/core/Button';
import { formatDate, formatPrice } from '../Utils';
import { Wrapper } from './Item.styles';

const Item = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.name}</h3>
      <p>Created Date: {formatDate(item.createdAt)}</p>
      <p>Stock: {item.stock}</p>
      <p>Material: {item.material}</p>
      <h3>{formatPrice(item.price)}</h3>
    </div>
    <Button disabled={!item.stock} onClick={() => handleAddToCart(item)}>Add to cart</Button>
  </Wrapper>
);

export default Item;
