import { HomeFilled, ShoppingCartOutlined, PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Menu, Badge, Drawer, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { incrementQuantity, decrementQuantity, removeFromCart, clearCart } from '../redux/actions/cartActions';
import { doSignOut } from "../../auth";

function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);
  const cartItems = useSelector((state) => state.cart.items);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
          <Button>Confirm Order! 
          </Button>
        </Drawer>
      </div>
    </div>
  );
}
export default AppHeader;
