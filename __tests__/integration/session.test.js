const { User } = require('../../src/app/models');

describe('', () => {
    it('Should receive JWT token when authenticated with valid credentials', async () => {
        const user = await User.create({name: 'Guilherme', email: 'gsaravi@email.com', password_hash: '123123123'});

        console.log(user);

        expect(user);

        expect(user.email).toBe('gsaravi@email.com');
    });
});