import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFirebase } from "@/Firebase/firebaseContext";
import FriendComponent from "@/components/Friend/FriendComponent";
import Header from "@/components/Navbar/header";
import "./SearchUser.css"; // Import the CSS file

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const formatEmail = (email) => {
  return email.replace(/[^a-zA-Z0-9]/g, "_");
};

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

  const fallbackImage = "https://via.placeholder.com/100";
  return (
    <div className="search-user-container">
      <Header />
      <div className="search-results-wrapper">
        <h2 className="main-heading">Search Results</h2>
        {searchQuery ? (
          users.length > 0 ? (
            users.map((User, index) => {
              console.log("User:", User); // Log each user's details
              return (
                <div key={index} className="friend-component">
                  <FriendComponent
                    name={User.name}
                    about={User.profession || "No profession available"} // Display profession or fallback text
                    email={formatEmail(User.email)}
                    image={User.ProfileDetails?.profileImg || fallbackImage}
                  />
                </div>
              );
            })
          ) : (
            <p className="no-results">No Users Found</p>
          )
        ) : (
          <p className="search-query-message">Please enter a search query.</p>
        )}
      </div>
    </div>
  );
}

export default SearchUser;
