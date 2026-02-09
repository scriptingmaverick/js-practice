const selectUsersFrom = (DB) =>
  DB.prepare("select email,username from users;").all();

export const createUser = (body, storage) => {
  const users = selectUsersFrom(storage);
  const { email, password } = body
  
};
