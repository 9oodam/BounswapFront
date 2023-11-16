import { useState, useEffect } from "react";

const SerchHook = (searchItems: string[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
    } else {
      const filteredResults = searchItems.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }, [searchTerm]);

  return { searchTerm, setSearchTerm, searchResults };
};

export default SerchHook;
