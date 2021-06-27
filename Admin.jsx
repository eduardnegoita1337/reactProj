import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import CategoriesList from '../components/CategoriesList'
import "bootstrap/js/src/collapse.js";
import ProductList from '../components/ProductList';
function Admin(){
    return(
        <div>
        <CategoriesList />
        <ProductList />
        </div>
    )
    }
export default Admin