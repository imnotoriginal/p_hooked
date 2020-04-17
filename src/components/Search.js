import React, {useState} from "react";

const Search = ({search}) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = ({target}) => setSearchValue(target.value);

    const resetInputField = () => setSearchValue("");

    const callSearchFunction = (e) => {
        e.preventDefault();
        search(searchValue);
        resetInputField();
    }

    return (
        <form className="search">
            <input
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="text"
                className="search__input"
                required/>
            <input
                onClick={callSearchFunction}
                type="submit"
                value="SEARCH"
                className="search__submit"/>
        </form>
    );
}

export default Search;