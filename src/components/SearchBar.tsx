import { NavLink } from "react-router-dom";

interface Props {
  owner: string;
  setOwner: Function;
  name: string;
  setName: Function;
  search: Boolean;
  setSearch: Function;
  repoFound: Boolean;
}

const SearchBar: React.FC<Props> = ({
  owner,
  setOwner,
  name,
  setName,
  search,
  setSearch,
  repoFound,
}) => {
  return (
    <div>
      <label>
        Owner
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </label>
      <br />
      <label>
        Repository
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <button
        onClick={() => {
          setSearch(true);
        }}
      >
        {!search ? "Search" : !repoFound ? "Loading" : "Found"}
      </button>
      {repoFound ? (
        <div>
          <p>Found Repository</p>
          <NavLink to="/issues/0">Show</NavLink>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
