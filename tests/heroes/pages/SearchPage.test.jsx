import { fireEvent, getByLabelText, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"



const mockedUseNavigate = jest.fn();

//de esta forma hacemos un mock de una libreria completa!!
jest.mock( 'react-router-dom', () => ({

    ...jest.requireActual( 'react-router-dom' ),//desestructuramos para mandarle todo lo demas de la libreria que no modificamos
    useNavigate: () => mockedUseNavigate

}) )

describe('Pruebas en <SearchPage />', () => { 

    beforeEach(() => jest.clearAllMocks() );

    test('Debe de mostrarse correctamente con valores por defecto', () => { 

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect( container ).toMatchSnapshot();

     });

     test('Debe de mostrarse a Batman y el imput con el valor del queryString', () => { 

        render(
            <MemoryRouter initialEntries={[ '/search?q=batman' ]}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole( 'textbox' );
        expect( input.value ).toBe( 'batman' );

        const img = screen.getByRole( 'img' );
        expect( img.src ).toContain( 'assets/heroes/dc-batman.jpg' );

        const errorDiv = screen.getByLabelText( 'error_div' );
        expect( errorDiv.style.display ).toBe( 'none' );


     });

     test('Debe de mostrar un error si no se encuentra el hero ("batman123")', () => { 

        render(
            <MemoryRouter initialEntries={[ '/search?q=batman123' ]}>
                <SearchPage />
            </MemoryRouter>
        )

        const errorDiv = screen.getByLabelText( 'error_div' );
        expect( errorDiv.style.display).toContain( '' );

     });

     test('Debe de llamar al navigate a la pantalla nueva', () => { 

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole( 'textbox' );
        fireEvent.change( input, { target: {name: 'searchText', value: 'superman' } } );

        const form = screen.getByLabelText( 'form' );
        fireEvent.submit( form );

        expect( mockedUseNavigate ).toHaveBeenCalledWith( '?q=superman' );


     })

 })