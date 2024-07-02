import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFirebase } from "@/Firebase/firebaseContext";
import FriendComponent from "@/components/Friend/FriendComponent";
import Header from "@/components/Navbar/header";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchUser() {
  const query = useQuery();
  const searchQuery = query.get("query") || ""; // Ensure searchQuery is never undefined
  const [users, setUsers] = useState([]);
  const { getUsersByQuery } = useFirebase(); // Use the updated function

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchQuery.trim()) {
        try {
          const userList = await getUsersByQuery(searchQuery);
          setUsers(userList);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      } else {
        setUsers([]);
      }
    };

    fetchUsers();
  }, [searchQuery, getUsersByQuery]);

  return (
    <div>
      <Header />
      <div>
        <h2>Search Results</h2>
        {searchQuery ? (
          users.length > 0 ? (
            users.map((user, index) => (
              <FriendComponent
                key={index}
                name={user.name}
                about={user.profession || "No profession available"} // Display profession or fallback text
                image={user.image} // Ensure image field is available
              />
            ))
          ) : (
            <p>No users found.</p>
          )
        ) : (
          <p>Please enter a search query.</p>
        )}
      </div>
    </div>
  );
}

export default SearchUser;
