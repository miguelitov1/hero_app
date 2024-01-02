import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from "../../../src/auth/types/types";


describe('Pruebas en authReducer', () => { 

    const initialState = {
    logged: true,
    user: {
        name: 'Miguel Visintini',
        id: 'ABC',
    }
    };

    test('Debe de retornar el estado por defecto', () => { 

        const state = authReducer( initialState , {} );
        expect( state ).toBe( initialState );

     });

     test('Debe de (login) llamar el login, autenticar y establecer el usuario', () => { 

        const action = { 
            type: types.login, 
            payload: {
                id: 'ABC',
                name: 'Miguel Visintini'
            }
        };

        const state = authReducer( { logged: false } , action );
        expect( state ).toEqual({
                logged: true,
                user: action.payload,
            });

     });

     test('Debe de (logout) borrar el name del usuario y logged en false', () => { 

        const action = {
            type: types.logout,
        }

        const state = authReducer( initialState , action );
        expect( state ).toEqual( { logged: false } );

     })

 });