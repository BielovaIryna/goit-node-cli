const {program} = require("commander")
const {listContacts, getContactById, addContact, removeContact} = require('./contacts')

const invokeAction = async ({action, id, name, email, phone}) =>{
    switch (action){
        case "list" :
            const allContacts = await listContacts();
            return console.table(allContacts);
        case "get":
            const contact = await getContactById(id);
            return console.log(contact);
        case "add":
                const newContact = await addContact(name, email, phone);
                return console.log(newContact);
        case "remove":
             const dellContact = await removeContact(id);
            return console.log(dellContact);
    }
}
program
.option("-a, --action, <type>")
.option("-i, --id, <type>")
.option("-n, --name, <type>")
.option("-e, --email, <type>")
.option("-p, --phone, <type>");
program.parse();
const opions =program.opts();
invokeAction(opions)