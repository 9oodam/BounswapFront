import { useState, useEffect } from "react";
import { SearchTokenInfo } from "src/Interface/Token.interface";

const SerchHook = (searchItems: SearchTokenInfo[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchTokenInfo[]>([]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
    } else {
      const filteredResults = searchItems.filter(
        (item) =>
          typeof item.tokenSymbol === "string" &&
          item.tokenSymbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }, [searchTerm, searchItems]);

  return { searchTerm, setSearchTerm, searchResults };
};

export default SerchHook;
