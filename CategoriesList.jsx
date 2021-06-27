import React, { useState, useEffect } from 'react';
import ApiHelper from '../helpers/api';
import { Table, Button, Modal, Form } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
function CategoriesList(){
    const [categories, setData] = useState([]);

    const [show, setShow] = useState({
        showModal: false,
        name: '',
        categoriesId: null,
        description:""
    });
    const [data, setCategories] = useState({

        name: "",
        description:""
    });


    useEffect(() => {
        ApiHelper.ProductCategories.all().then((res) => {
            setData(res)
        })

    },[])
    const handleClose = () => setShow({ showModal: false });
    function handleShow() {

        setShow({ showModal: true });
    }
    function handleChange(event) {
        const newData = { ...show }
        newData[event.target.name] = event.target.value;
        setShow(newData)
        console.log(newData)
    }
 
    function deleteCategory(categoryId) {
        ApiHelper.ProductCategories.deleteCategory(categoryId)
            .then((res) => console.log(res))

    }
    function UpdateCategory(categoryId, e) {
        
      
        alert(categoryId)
    }
    function handleChangeForm(event) {
        const newData = { ...data }
        newData[event.target.name] = event.target.value;
        setCategories(newData)

    }
    function submit(e) {
      
        e.preventDefault();

        const response = { name: data.name,description:data.description }
        console.log(response)
        ApiHelper.ProductCategories.postMethod(response).then((response) => console.log(response))
    }
    return (
        <div>
            <h2>Categories</h2>
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th><Button variant="link" onClick={() => handleShow()}>Add New</Button></th>
            </tr>
        </thead>
        <tbody>
        {categories.map((c) => (
            <tr key={c.categoryId}>
                            <td>
                                {c.categoryId}
                            </td>
                            <td>
                                {c.name}
                            </td>
                            <td>
                                <Button variant="link" onClick={() => UpdateCategory(c.categoryId)}>Update</Button>
                                <Button variant="link" onClick={() => deleteCategory(c.categoryId)}>Delete</Button>
                            </td>
                        </tr>

))}
        </tbody>
    </Table>
    <Modal show={show.showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group >
                          <Form.Label>Name:</Form.Label>
                          <Form.Control onChange={(event) => handleChangeForm(event)} id="name" name="name" value={data.name } type="text" placeholder="Name"></Form.Control>
                        </Form.Group>
                  
                   <Form.Group>
                    <Form.Label>Desciption</Form.Label>
                    <Form.Control type="text" onChange={(event) => handleChangeForm(event)}  id="description" name="description" value={data.description}  placeholder="Description"></Form.Control>
                   </Form.Group>

                   </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="secondary" onClick={submit} >Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}
export default CategoriesList