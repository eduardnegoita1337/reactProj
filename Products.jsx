import React,{useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ApiHelper from '../helpers/api';
import { Card, CardDeck} from 'react-bootstrap'
import "../style/cards.css";
function Products(){

    const [products,setProducts]=useState([]);
    
    useEffect(()=>{
    
      ApiHelper.Products.getAll().then(res=>{
    
        console.log(res)
        setProducts(res)
      })},[]);
      return(

        <div className="container">
            <div className="row">
             
              <CardDeck>
               {
                 products.map((products)=>(
                   <div className="col-lg-3" >
                   <Card >
                     <Card.Img variant="top" src={products.image} className="image"/>
                     <Card.Body>
        <Card.Text>
            <p className="price">{products.price}</p>
            <p className="basePrice">{products.basePrice}</p>
        </Card.Text>
      </Card.Body>
                     </Card>
                     </div>
      ))
               }
           
               </CardDeck>
  
                  
                </div>
            </div>
        
      )
            }
export default Products


