import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { PublicRoute } from '../../src/router/PublicRoute'
import { AuthContext } from "../../src/auth";

describe('Pruebas en <PublicRoute />', () => { 

    test('Debe de mostrar el children si no esta autenticado', () => { 

        //como esta montado el componente, si logged es true, entonces
        //no se muestra la ruta, sino que te deriba a la pagina de /marvel
        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={ contextValue } >
                <PublicRoute>
                    <h1>Esto es una ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect( screen.getByText( 'Esto es una ruta publica' ) ).toBeTruthy();

     });

     test('Debe de navegar si esta autenticado (logged: true)', () => {

        const contextValue = {
            logged: true,
            user: {
                name: 'Miguel Visintini',
                id: 'ABC'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue } >
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Esto es una ruta publica</h1>
                            </PublicRoute>
                        } />
                        <Route path='marvel' element={ <h1>Pagina Marvel</h1> }/>
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect( screen.getByText( 'Pagina Marvel' ) ).toBeTruthy();

     }); 

 })