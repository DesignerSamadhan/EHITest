export const contactsService = {   
    loadAllContacts,
    updateContact    
};

function loadAllContacts() {
    const requestOptions = {
        method: 'GET',
    };

    return fetch('http://localhost:3333/contacts', requestOptions).then(handleResponse);
}

function updateContact(contact) {

    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(contact)
    };

    return fetch(`http://localhost:3333/contacts/${contact.id}`, requestOptions).then(handleResponse);;
    
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                console.log("Service issue");
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}