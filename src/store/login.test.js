import userReducer, { login } from './login'
describe('action creators', () => {
    it('should get login action', () => {
        const action = login({
          username: 'jane.doe',
          color: 'green',
        });
        expect(action.type).toBe('LOGIN');
        expect(action.payload.username).toBe('jane.doe');
        expect(action.payload.color).toBe('green');
    });
    
});
describe('reducer', () => {
    it('should login', () => {
        const action = login({
          username: 'jane.doe',
          color: 'green',
        });

        const newState = userReducer(undefined, action);
        expect(newState.loggedIn).toBe(true);
        expect(newState.username).toBe('jane.doe');
        expect(newState.color).toBe('green');
    });
})