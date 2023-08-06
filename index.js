const { Command } = require('commander');
const contacts = require("./contacts");


const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const list = await contacts.listContacts();
      console.table(list);
      break;

    case 'get':
      const getContact = await contacts.getContactsById(id);
      console.log(getContact);
      break;

    case 'add':
      const contactAdd = await contacts.addContact({name,email,phone});
      console.log("You sucessfully added this contact: ")
      console.log(contactAdd);
      break;

    case 'remove':
      const removedContact = await contacts.removeContact(id);
      console.log("You sucessfully removed this contact: ")
      console.log("IMPORTANT, if you see a `null`, it means that nothing found for your query! Check your ID and try again!");
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);