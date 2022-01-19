import { Fragment, Component } from "react";
import { nanoid } from "nanoid";
import Filter from "./components/Filter/Filter";

import Form from "./components/Form/Form";
import Contacts from "./components/Contacts/Contacts";
import { SectionStyled } from "./components/Contacts/SectionContacts.styled";

import { useState, useEffect } from "react";
// JSON.parse(localStorage.getItem('contacts'))
// class AppOld extends Component {
//   state = {
//     contacts: [],

//     filter: "",
//   };
//   componentDidMount() {
//     const parsedContacts = JSON.parse(localStorage.getItem("contacts"));
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     const { contacts } = this.state;

//     if (contacts.length !== prevState.contacts.length) {
//       localStorage.setItem("contacts", JSON.stringify(contacts));
//     }
//   }

//   onInput = (e) => {
//     const form = e.currentTarget.name;
//     this.setState({ [form]: e.currentTarget.value });
//   };

//   onClick = (e) => {
//     e.preventDefault();
//     // console.log(e.currentTarget);
//     const { name, number } = this.state;
//     const id = nanoid();

//     if (e.target.checkValidity()) {
//       if (
//         this.state.contacts.find(
//           (contact) =>
//             contact.name.toLowerCase().includes(name) &&
//             contact.name.toLowerCase().length === name.length
//         )
//       ) {
//         alert(`${name} is already in contacts`);
//         return;
//       }
//       this.setState({
//         contacts: [...this.state.contacts, { name, id, number }],
//       });
//     }
//   };

//   searchContacts = (e) => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   filterContacts = () => {
//     const contactNormalized = this.state.filter.toLowerCase();
//     const contacts = this.state.contacts;
//     const filteredContacts = contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(contactNormalized)
//     );
//     // console.log(filteredContacts);
//     return filteredContacts;
//   };

//   deleteContact = (id) => {
//     let contacts = this.state.contacts.filter((contact) => contact.id !== id);
//     this.setState({ contacts: [...contacts] });
//   };

//   render() {
//     const contacts = this.filterContacts();
//     return (
//       <Fragment>
//         <Form onInput={this.onInput} onClick={this.onClick}></Form>
//         <SectionStyled>
//           <Filter
//             value={this.state.filter}
//             search={this.searchContacts}
//           ></Filter>
//           <Contacts
//             contacts={contacts}
//             deleteContact={this.deleteContact}
//           ></Contacts>
//         </SectionStyled>
//       </Fragment>
//     );
//   }
// }

function App() {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(localStorage.getItem("contacts") ?? [])
  );
  const [filter, setFilter] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  const onInput = (e) => {
    const form = e.currentTarget.name;
    switch (form) {
      case "name":
        setName(e.currentTarget.value);
        break;
      case "number":
        setNumber(e.currentTarget.value);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const onClick = (e) => {
    e.preventDefault();
    // console.log(e.currentTarget);
    const id = nanoid();

    if (e.target.checkValidity()) {
      if (
        contacts.find(
          (contact) =>
            contact.name.toLowerCase().includes(name.toLowerCase()) &&
            contact.name.toLowerCase().length === name.length
        )
      ) {
        alert(`${name} is already in contacts`);
        return;
      }
      setContacts([...contacts, { name, id, number }]);
    }
  };

  const searchContacts = (e) => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    const contactNormalized = filter.toLowerCase();
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(contactNormalized)
    );
    // console.log(filteredContacts);
    return filteredContacts;
  };

  const deleteContact = (id) => {
    let newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts([...newContacts]);
  };

  const filteredContacts = filterContacts()
  return (
    <Fragment>
      <Form onInput={onInput} onClick={onClick}></Form>
          <SectionStyled>
            <Filter
              value={filter}
              search={searchContacts}
            ></Filter>
            <Contacts
              contacts={filteredContacts}
              deleteContact={deleteContact}
            ></Contacts>
          </SectionStyled>
    </Fragment>
  );
}

export default App;
