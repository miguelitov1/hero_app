import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from "react-router-dom";

import { AuthContext } from '../../../src/auth';
import { NavBar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();

//de esta forma hacemos un mock de una libreria completa!!
jest.mock( 'react-router-dom', () => ({

    ...jest.requireActual( 'react-router-dom' ),//desestructuramos para mandarle todo lo demas de la libreria que no modificamos
    useNavigate: () => mockedUseNavigate

}) )

describe('Pruebas en <NavBar />', () => { 

    const contextValue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'Miguel Visintini'
        },
        logout: jest.fn(),
    }

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrar el nombre del usuario logeado', () => { 

        render(
            <AuthContext.Provider value={ contextValue } >
                <MemoryRouter>
                    <NavBar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText( 'Miguel Visintini' )).toBeTruthy();

     });

     test('Debe de llamar al logout y navigate cuando se hace clic en el boton de logout', () => { 

        render(
            <AuthContext.Provider value={ contextValue } >
                <MemoryRouter>
                    <NavBar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole( 'button' );
        fireEvent.click( logoutBtn );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith( "/login", {"replace": true} );

      })

 })