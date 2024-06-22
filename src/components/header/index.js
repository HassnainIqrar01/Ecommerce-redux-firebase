import { HomeFilled } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";


function AppHeader() {
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
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
            key: "",
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
    </div>
  );
}
export default AppHeader;
