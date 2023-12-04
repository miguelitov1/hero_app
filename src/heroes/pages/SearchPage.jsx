import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';

import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components/index";
import { getHeroByName } from "../helpers";

export const SearchPage = () => {

  const navigate = useNavigate(); //para obtener la navegación
  const location = useLocation(); //para obtener información de la ubicacion donde nos encontramos

  const { q = '' } = queryString.parse( location.search ); //instalar modulo "query-string"
  const heroes = getHeroByName( q );

  const showSearch = ( q.length === 0 );
  const showError = ( q.length > 0 ) && ( heroes.length === 0 );

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = ( event ) => {
    event.preventDefault();
    // if ( searchText.trim().length <= 1 ) return;

    navigate(`?q=${ searchText }`)

  }

  return (
    <>

      <h1>Search</h1>
      <hr />

      <div className="row">

        <div className="col-3">
          
          <h4>Searching</h4>
          <hr />

          <form onSubmit={ onSearchSubmit }>
            <input 
              type="text" 
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={ searchText }
              onChange={ onInputChange }
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

          {/* { ESTA ES UNA FORMA DE HACERLO
            ( q === '' )
              ? <div className="alert alert-primary">Search a hero</div>
              : ( heroes.length === 0 ) 
                && <div className="alert alert-danger">There's no hero with <b>{ q }</b></div>
          } */}

          <div 
            className="alert alert-primary animate__animated animate__fadeIn" 
            style={{ display: showSearch ? '' : 'none' }}
          >
            Search a hero
          </div>

          <div 
            className="alert alert-danger animate__animated animate__fadeIn" 
            style={{ display: showError ? '' : 'none' }}
          >
            There's no hero with <b>{ q }</b>
          </div>

          {
            heroes.map( hero => (
              
              <HeroCard key={ hero.id } { ...hero }/>

            ))
          }


        </div>

      </div>


    </>

  )
}
