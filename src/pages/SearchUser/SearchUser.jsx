import React from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Navbar/header";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchUser() {
  const query = useQuery();
  const searchQuery = query.get("query");

  return (
    <div>
    <Header/>
      <div>
        <h2>Search Results</h2>
        <p>You searched for: {searchQuery}</p>
        {/* Add logic here to fetch and display search results based on searchQuery */}
      </div>
    </div>
  );
}

export default SearchUser;
