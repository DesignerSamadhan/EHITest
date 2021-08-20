import React, { useEffect, useState } from 'react';
import ContactsList from './ContactsList';
import { contactsService } from './ContactsService';
import { Container } from 'react-bootstrap';

function Contacts() {

  const [contactList, setContactList] = useState([]);
  const [contactListAll, setContactListAll] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(()=>{
    loadContacts();    
  }, []);

function loadContacts()
{
    contactsService.loadAllContacts()
        .then(
        contacts => {
            const activeContacts = contacts.filter(contact => contact.status === "Active");
            console.log("activeContacts",activeContacts);
            setContactList(activeContacts);
            setContactListAll(contacts);
        },
        error => {

        }
    );
}

const saveContact = (contact) => {
  console.log("Save", contact);
  let max = contact.id;
  if(contact.id === 0){    
    contactListAll.forEach(cont => {
      if (cont.id > max) {
        max = cont.id;
      }
    });    
  }

  let newContact = {...contact, id:max};

  contactsService.updateContact(newContact)
    .then(
    res => {        
        //console.log("res",res); 
        setShow(true);
    },
    error => {

    }
  );
}
const deleteContact = (contact) => {
  let updateContact = {...contact, status:"Inactive"}
  contactsService.updateContact(updateContact)
    .then(
    res => {        
        //console.log("res",res); 
    },
    error => {

    }
  );
}

  return (
    <div>
        <Container>          
            <ContactsList  activeList={contactList} saveContact={saveContact} removeContact={deleteContact} showAlert={show} />
        </Container>
    </div>
  );
}

export default Contacts;
