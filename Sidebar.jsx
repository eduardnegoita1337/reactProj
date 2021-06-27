import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ApiHelper from "../helpers/api";
import "../style/sidebar.css";

const Sidebar = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    ApiHelper.ProductCategories.all().then((mappedApiCategories) => {
      setCategories(mappedApiCategories);
    });
  }, [props]);

  return (
    <Nav className="d-md-block bg-light sidebar">
       <Nav.Item>
        <Nav.Link as={Link} to={`/admin`}>
          Admin
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to={`/home`}>
          Home
        </Nav.Link>
      </Nav.Item>
      <div className="sidebar-sticky"></div>
      {categories.map((c) => (
        <Nav.Item>
          <Nav.Link as={Link} to={`/products/${c.categoryId}`}>
            {c.name}
          </Nav.Link>
        </Nav.Item>
      ))}
     
    </Nav>
  );
};

export default Sidebar;
