const Search = ({value, onSearch}) => (

  <div>
  
    <label htmlFor="search">Encontrar:&nbsp;</label>
    <input id="search" 
           type="text"
           value={value}
           onChange={onSearch} />
  
  </div>

);

export default Search;