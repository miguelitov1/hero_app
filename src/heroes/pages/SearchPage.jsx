import { HeroCard } from "../components/index";

export const SearchPage = () => {
  return (
    <>

      <h1>Search</h1>
      <hr />

      <div className="row">

        <div className="col-3">
          
          <h4>Searching</h4>
          <hr />

          <form>
            <input 
              type="text" 
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
            />

            <button
              className="btn btn-outline-primary mt-1">
              Search
            </button>

          </form>

        </div>

        <div className="col-9">
          
          <h4>Results</h4>
          <hr />

          <div className="alert alert-primary">
            Search a hero
          </div>          
          
          <div className="alert alert-danger">
            There's no hero with <b>ABC</b>
          </div>

          <HeroCard />

        </div>

      </div>


    </>

  )
}
