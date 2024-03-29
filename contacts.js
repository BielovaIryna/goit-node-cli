const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require("path")

 const contactsPath = path.join(__dirname, "./db/contacts.json");
 

async function listContacts() {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id===contactId);
    return contact || null
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id ===contactId);
   if (index === -1){
    return null
   }
   const [contact] = contacts.splice(index, 1);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
   return contact
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  }
  
  async function addContact(name, email, phone) {
    const newContact ={
      id: nanoid(),
      name, email, phone
    }
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact
    // ...твій код. Повертає об'єкт доданого контакту (з id).
  }






module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}