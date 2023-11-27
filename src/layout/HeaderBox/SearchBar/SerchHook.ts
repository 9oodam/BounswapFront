import { useState, useEffect } from "react";
import { SearchTokenInfo } from "src/Interface/Token.interface";

const SerchHook = (searchItems: SearchTokenInfo[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchTokenInfo[]>([]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
    } else {
      const filteredResults = searchItems.filter((item) =>
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }, [searchTerm, searchItems]);

  return { searchTerm, setSearchTerm, searchResults };
};

export default SerchHook;
