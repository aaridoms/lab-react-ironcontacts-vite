import "./App.css";
import { useState } from "react";
import contacts from "./contacts.json";

function App() {
  const [contactos, setContacts] = useState(contacts.slice(0, 5));

  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid white"
  }

  const handleAddContact = () => {
    const randomIndex = Math.floor(Math.random() * contacts.length);

    if(contactos.includes(contacts[randomIndex])) {
      return handleAddContact();
    } 

    setContacts([contacts[randomIndex], ...contactos]);
  }

  const handleSortByPopularity = () => {
    const contactsClone = JSON.parse(JSON.stringify(contactos));

    contactsClone.sort((a, b) => {
      return b.popularity - a.popularity;
    })

    setContacts(contactsClone);
  }

  const handleSortByName = () => {
    const contactsClone = JSON.parse(JSON.stringify(contactos));

    contactsClone.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    })

    setContacts(contactsClone);
  }

  const handleDelete = (id) => {
    // console.log(id)
    const contactsClone = JSON.parse(JSON.stringify(contactos));
    contactsClone.splice(id, 1);
    setContacts(contactsClone);
  }

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={ handleAddContact }>Add Random Contact</button>
      <button onClick={ handleSortByPopularity }>Sort by popularity</button>
      <button onClick={ handleSortByName }>Sort by name</button>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((eachContact, i) => {
            return (
              <tr key={eachContact.id} style={tableStyles}>
                <td><img src={eachContact.pictureUrl} alt={eachContact.name} width={100} /></td>
                <td>{eachContact.name}</td>
                <td>{Math.floor(eachContact.popularity)}</td>
                <td>{eachContact.wonOscar ? "🏆" : ""}</td>
                <td>{eachContact.wonEmmy ? "🌟" : ""}</td>
                <td><button onClick={ () => handleDelete(i) }>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
