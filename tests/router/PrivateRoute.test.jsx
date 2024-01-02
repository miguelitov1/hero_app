import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";

import { PrivateRoute } from '../../src/router/PrivateRoute'
import { AuthContext } from "../../src/auth";


describe('Pruebas en el <PrivateRoute />', () => { 

    Storage.prototype.setItem = jest.fn();

    test('Debe de mostrar el children si esta autenticado', () => { 

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Miguel Visintini',
            }
        }

        render(
            <AuthContext.Provider value={ contextValue } >
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Esto es una ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText( 'Esto es una ruta privada' ) ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', '/search?q=batman' );

     });

 })