const fs = require('fs').promises
const path = require('path')

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const result = JSON.parse(data);

        console.table(result);

    } catch (error) {
        console.log(error);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const result = JSON.parse(data);
        const contact = result.find(({ id }) => id === Number(contactId))

        console.log(`Get contact by ID ${contactId}`);
        console.table(contact);

    } catch (error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const result = JSON.parse(data);
        const newContact = result.filter(contact => contact.id !== Number(contactId));
        if (newContact.length === result.length) {
            console.log(`Contact with ID "${contactId}" don't removed! ID "${contactId}" not found!`);
            return;
        }

        console.log('Contact deleted successfully! New list of contacts: ');
        console.table(newContact);

    } catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath);
        const result = JSON.parse(data);
        result.push({
            id: result.length + 1,
            name,
            email,
            phone,
        });

        console.log('Contacts added successfully! New lists of contacts: ');

        fs.writeFile(contactsPath, JSON.stringify(result))

        console.table(result);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};