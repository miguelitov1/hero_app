
import { HeroCard } from './';
import { getHeroesByPublisher } from '../helpers'
import { useMemo } from 'react';

// eslint-disable-next-line react/prop-types
export const HeroesList = ( { publisher } ) => {

    const heroes = useMemo( () => getHeroesByPublisher( publisher ), [ publisher ] );

    return (
        
        <div className='row row-cols-1 row-cols-md-3 g-3'>

            { 
                heroes.map( hero => (
                    <HeroCard 
                        key={ hero.id }
                        { ...hero } //le paso todas las propiedades del objeto 'hero'
                    /> 
                )) 
            }
            
        </div>
    )
}
