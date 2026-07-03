import {
  useState,
  useEffect
} from "react";

function App() {

  const [users, setUsers] =
  useState([]);

  useEffect(() => {

    async function getUsers() {

      const response =
      await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      const data =
      await response.json();

      setUsers(data);

    }

    getUsers();

  }, []);

  return (

    <ul>

      {
        users.map(user => (

          <li key={user.id}>
            {user.name}
            <br />
            {user.email}
            
          </li>

        ))
      }

    </ul>

  );

}

export default App;