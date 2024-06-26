import { HomeFilled, ShoppingCartOutlined, PlusOutlined, MinusOutlined, DeleteOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Menu, Badge, Drawer, Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { incrementQuantity, decrementQuantity, removeFromCart, clearCart } from '../redux/actions/cartActions';
import { addOrder } from "../redux/actions/orderActions";
import { doSignOut } from "../../auth";
import { ref, set } from 'firebase/database';
import { database } from '../../firebase.config';
import { sanitizeEmailForPath } from '../../utils';

function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);
  const cartItems = useSelector((state) => state.cart.items);
  const sanitizedEmail = sanitizeEmailForPath(userEmail);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderDrawerOpen, setOrderDrawerOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [confirmedOrders, setConfirmedOrders] = useState([]);

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };

const handleClick = () => {
navigate(`/hit`)
}
const toAddProduct = () => {
  navigate(`/add-product`)
  }
  const toDelProduct = () => {
    navigate(`/del-product`)
  }
const toggleDrawer = () => {
  setDrawerOpen(!drawerOpen);
};
const toggleOrderDrawer = () => {
  setOrderDrawerOpen(!orderDrawerOpen);
};
const calculateTotal = () => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};
  const handleLogout = async () => {
    try {
      await doSignOut();
      dispatch(clearCart()); 
      navigate('/'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleConfirmOrder = () => {
    const order = {
      items: cartItems,
      total: calculateTotal(),
      paymentMethod: paymentMethod
    };
    dispatch(addOrder(order, userEmail));
    const orderRef = ref(database, `orders/${sanitizedEmail}`);
    set(orderRef, order);

    setConfirmedOrders([...confirmedOrders, order]);
    dispatch(clearCart());
    toggleDrawer(); 
  };

  return (
    <div className="appHeader">
      <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "category",
          },
          {
            label: "Electronics",
            key: "electronics",
            children: [
              {
                label: "Laptops",
                key: "laptops",
              },
              {
                label: "Smart phones",
                key: "smartphones",
              },
              {
                label: "Mobile Accessories",
                key: "mobile-accessories",
              },
              {
                label: "Tablets",
                key: "tablets",
              },
            ],
          },
          {
            label: "Home Decor",
            key: "home-decor",
            children: [
              {
                label: "Decoration",
                key: "home-decoration",
              },
              {
                label: "Kitchen",
                key: "kitchen-accessories",
              },
              {
                label: "Furniture",
                key: "furniture",
              },
            ],
          },
          {
            label: "Fragrances",
            key: "fragrances",
          },
        ]}
      />
      
      <Button
        type="primary"
        style={{backgroundColor: 'green', borderColor: 'green'}}
        onClick={handleClick}
      >
        Search your Product!
      </Button>
     
      <Button
        type="primary"
        style={{backgroundColor: 'green', borderColor: 'green'}}
        onClick={toAddProduct}
      >
        Add Product
      </Button>

      <Button
        type="primary"
        style={{backgroundColor: 'green', borderColor: 'green'}}
        onClick={toDelProduct}
      >
        Delete Product
      </Button>
     
      <div className="cartIcon">
      <div className="buttons">
      <Button
        type="primary"
        style={{backgroundColor: 'red', borderColor: 'black'}}
        onClick={handleLogout}
      >
        Logout
      </Button>
      </div>
      <div onClick={toggleDrawer}>
        <Badge count={cartItems.length} size="small">
          <ShoppingCartOutlined className="cartIconSize"/>
        </Badge>
      </div>
      <Drawer
          title="Cart..."
          placement="right"
          onClose={toggleDrawer}
          open={drawerOpen}
        >
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cartItem">
                <img src={item.thumbnail} alt={item.title} />
                <div className="cartItemDetails">
                  {item.title} - ${item.price}
                </div>
                <div className="cartItemActions">
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => dispatch(decrementQuantity(item.id, userEmail))}
                    disabled={item.quantity <= 1}
                  />
                  <span>{item.quantity}</span>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => dispatch(incrementQuantity(item.id, userEmail))}
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => dispatch(removeFromCart(item.id, userEmail))}
                    type="danger"
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="cartTotal">
            Total: ${calculateTotal().toFixed(2)}
          </div>
          <div className="paymentMethod">
            <Select
              value={paymentMethod}
              onChange={setPaymentMethod}
              placeholder="Select Payment Method"
            >
              <Select.Option value="Cash on Delivery">Cash on Delivery</Select.Option>
              <Select.Option value="Online Payment">Online Payment</Select.Option>
            </Select>
          </div>
 <Button className="confirmOrder" onClick={handleConfirmOrder}>
  Confirm your Orders!
 </Button>
        </Drawer>
      
      <div className='orders' onClick={toggleOrderDrawer}>
        <Badge size="small">
          <OrderedListOutlined className="cartIconSize"/>
        </Badge>
        <Drawer
          title="Orders..."
          placement="right"
          onClose={toggleOrderDrawer}
          open={orderDrawerOpen}
        >

<ul>
              {confirmedOrders.map((order, index) => (
                <li key={index} className="orderItem">
                  <div className="orderDetails">
                    <div className="total">Total: ${order.total.toFixed(2)}</div>
                    <div className="subheading">Payment Method: {order.paymentMethod}</div>
                    <div className="bold">Items:</div>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.title} - ${item.price} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
        </Drawer>
      </div>
      </div>
    </div>
  );
}
export default AppHeader;
