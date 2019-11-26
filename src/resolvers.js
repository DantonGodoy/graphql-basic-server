import { users } from './db';

const resolvers = {
  Query: {
    // In the user function, we’re going to pass id as an argument, and then return the specific user that matches the passed id.
    user: (parent, { id }, context, info) => {
      return users.find(user => user.id == id);
    },
    // Return the users array that already exists. It’ll always return to us all of our users.
    users: (parent, args, context, info) => {
      return users;
    }
  },
  Mutation: {
    createUser: (parent, { id, name, email, age }, context, info) => {    
        const newUser = { id, name, email, age };    
        users.push(newUser);    
        return newUser;    
},   
    updateUser: (parent, { id, name, email, age }, context, info) => {    
        let newUser = users.find(user => user.id == id);    
        newUser.name = name;    
        newUser.email = email;    
        newUser.age = age;

        return newUser;
    },    
    deleteUser: (parent, { id }, context, info) => {    
        const userIndex = users.findIndex(user => user.id == id);

        if (userIndex === -1) throw new Error("User not found.");

        const deletedUsers = users.splice(userIndex, 1);

        return deletedUsers[0];     
    }    
  }
}

export default resolvers;

/**
 * Resolvers are the way we provide the instructions for turning a GraphQL operation into data.
 */