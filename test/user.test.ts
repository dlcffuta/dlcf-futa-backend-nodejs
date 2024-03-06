// Desc: Test for user functions
// import chai from 'chai';

// const expect = chai.expect;
// import { getUserById, createUser, loginUser } from '../src/services/admin.services/index.service';

// describe('User Functions', () => {
//   describe('getUsers', () => {
//     it('should return all users', async () => {
//       const user_id = 'pVaRZYJcJY2K5K9w8qPA';
//       const next = () => {};
//       const users = await getUserById(user_id, next);
//       expect(users).to.be.an('object');
//     });
//   });

//   describe('createUser', () => {
//     it('should create a new user', async () => {
//       const user = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'oluwafiropo@gmail.com',
//         password: 'password',
//       };
//       const next = () => {};
//       const newUser = await createUser(user, next);
//       expect(newUser).to.be.an('object');
//       expect(newUser).to.have.property('firstName');
//       expect(newUser).to.have.property('lastName');
//       expect(newUser).to.have.property('email');
//       expect(newUser).to.have.property('password');
//     });

//     it('should throw an error if user already exists', async () => {
//       const user = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'oluwafiropojeremiah59@gmail.com',
//         password: 'password',
//       };
//       const next = () => {};
//       const newUser = await createUser(user, next);
//       console.log(newUser);
//       expect(newUser).to.throw('User already exists');
//     });
//   });

//   describe('userLogin', () => {
//     it('should login a user', async () => {
//       const user = {
//         email: 'oluwafiropojeremiah59@gmail.com',
//         password: 'password',
//       };
//       const next = () => {};
//       const loginUser = await userServices.loginUser(user, next);
//       expect(loginUser).to.be.an('string');
//     });
//   });
// });
