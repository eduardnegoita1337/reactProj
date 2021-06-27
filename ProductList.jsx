import React, { useEffect, useState } from 'react'
import ApiHelper from "../helpers/api";
import { Table, Button, Form, Modal } from 'react-bootstrap'

function ProductList(){
  const [product, setProduct] = useState([]);
    const [products, setData] = useState({
        showModal: false,
        productId: 0,
        name: '',
        description: '',
        price: 0,
        basePrice: 0,
        categoryId: 0,
        image:""

    })
    const[image,setImage]=useState();
    const handleClose = () => setData({ showModal: false });
    function handleShow() {

        setData({ showModal: true });
    }
    useEffect(() => {
        ApiHelper.Products.getAll().then((res) => {
            setProduct(res)
        })
    },[])

    
   function fileChange(event){
       setImage(event.target.files[0]
       )
   }
    function submit(e) {
        e.preventDefault();
        const formValues = {
            name:products.name,
            price: products.price,
            basePrice:products.basePrice,
            description:products.description,
            categoryId: products.categoryId,
        }
        console.log(formValues)
        ApiHelper.Products.postProduct(formValues)
            .then((res) => console.log(res))

            const formDataValues = {image}
let formData=new FormData();
formData.append('File',image);
console.log(formDataValues)
    fetch(
        'https://localhost:44300/api/product/1/image',
        {
            method: 'POST',
            body: formData,
        }
    )
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    function handleInputChange(e){
        const newData = { ...products }
        newData[e.target.name] = e.target.value;
        setData(newData)
        console.log(newData);
    }
    function deleteProduct(productId) {
        ApiHelper.Products.deleteProduct(productId).then((res) => console.log(res))
    }

  return (
    <div>
        <h2>Products</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Base Price</th>
                    <th><Button variant="link" onClick={() => handleShow()}>Add New</Button></th>
                </tr>
            </thead>
            <tbody>
                {product.map((p) => (
                    <tr key={p.productId}>

                        <td>{p.productId}</td>
                        <td>{p.name}</td>
                        <td>{p.description}</td>
                        <td>{p.categoryId}</td>
                        <td>{p.price}</td>
                        <td>{p.BasePrice}</td>
                        <td>
                            <Button variant="link" >Update</Button>
                            <Button variant="link" onClick={() => deleteProduct(p.productId)}>Delete</Button>
                        </td>
                    </tr>

                ))}
            </tbody>
        </Table>
        <Modal show={products.showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control onChange={(e)=>handleInputChange(e)} id="name" name="name" value={products.name || ''} type="text" placeholder="Name"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control id="description" onChange={(e)=>handleInputChange(e)} name="description" value={products.description|| ''} type="text" placeholder="Description"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control id="price" name="price" onChange={(e)=>handleInputChange(e)} value={products.price || ''} type="text" placeholder="0"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Base Price:</Form.Label>
                        <Form.Control id="basePrice" name="basePrice" onChange={(e)=>handleInputChange(e)} value={products.basePrice || ''} type="text" placeholder="0"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category </Form.Label>
                        <Form.Control as="select" size="sm" name="categoryId" custom value={products.categoryId}   onChange={(e)=>handleInputChange(e)}>
                        <option >Select a category:</option>
                        <option >Adidas</option>
                        <option >Puma</option>
                        <option>Nike</option>
                        <option>Lacoste</option>
                        <option>New Balance</option>
                        </Form.Control>
                       
                    </Form.Group>
                    <label >Product photo </label>
                    <br/>
                    <input type="file" onChange={fileChange} id="file" name="file"></input>
                 
                </Form>
               
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="success" onClick={submit} >Save</Button>
            </Modal.Footer>
        </Modal>
    </div>
)
}

export default ProductList;
