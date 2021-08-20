import React, { useState } from 'react';
import { Spinner, Table, Button, Modal, Form, Alert } from 'react-bootstrap';

function ContactsList({activeList, saveContact, removeContact, showAlert}) {

    const [show, setShow] = useState(false);
    const [contact, setContact] = useState({id: 0, firstname: "",lastname: "",email:"",phonenumber: "", status: "Active"});
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleChange (e) {
        if(e.target.name === 'firstname'){
            let contactObj = {...contact, firstname : e.target.value};
            setContact(contactObj);
        }
        if(e.target.name === 'lastname'){
            let contactObj = {...contact, lastname : e.target.value};
            setContact(contactObj);
        }
        if(e.target.name === 'email'){
            let contactObj = {...contact, email : e.target.value};
            setContact(contactObj);
        }
        if(e.target.name === 'phonenumber'){
            let contactObj = {...contact, phonenumber : e.target.value};
            setContact(contactObj);
        }
        console.log("contact", contact);
    }

    function handleSubmit(event){
        event.preventDefault();        
        saveContact(contact);        
        event.target.reset();
        setShow(false);
    }
    function editContact(contact){ 
        setContact(contact);
        setShow(true);
    }
    function deleteContact(contact){        
        removeContact(contact);
    }

  return (
    <div>
        <h4 className="text-left mtb20">Contacts Listing <Button className="float-right" variant="primary" size="sm" onClick={handleShow}> Create New</Button> </h4> 
        <Alert variant="success" show={showAlert}>Record saved successfully!</Alert>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>                    
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                activeList.length > 0 ?
                activeList.map((contact, index) => {
                return (
                <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>{contact.firstname}</td>
                    <td>{contact.lastname}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phonenumber}</td>                   
                    <td>
                        <span role="group" className="btn-group btn-group-sm">
                        <Button variant="primary" onClick={() => editContact(contact)}>Edit</Button>
                        <Button variant="secondary" onClick={() => deleteContact(contact)}>Delete</Button>                        
                        </span>
                    </td>
                </tr>
                )
                })            
                : <Spinner animation="grow" variant="primary" />
            }
            </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(event)=>handleSubmit(event)}>
            <Modal.Header closeButton>
            <Modal.Title>Create Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>                
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" size="sm" placeholder="Enter First Name" name="firstname" value={contact.firstname} onChange={(e) => handleChange(e)} />                   
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" size="sm" placeholder="Enter Last Name" name="lastname" value={contact.lastname} onChange={(e) => handleChange(e)} />                   
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" size="sm" placeholder="Enter Email" name="email" value={contact.email} onChange={(e) => handleChange(e)} />                   
                    </Form.Group>                    
                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" size="sm" placeholder="Enter Phone Number" name="phonenumber" value={contact.phonenumber} onChange={(e) => handleChange(e)} />                   
                    </Form.Group>              
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" size="sm" type="submit">
                Save
            </Button>
            </Modal.Footer>
            </Form>
        </Modal>
    </div>
  );
}

export default ContactsList;
