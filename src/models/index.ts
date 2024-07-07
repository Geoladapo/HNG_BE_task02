import User from './user';
import Organization from './organization';
import UserOrganization from './userOrganization';

const initModels = () => {
  User.sync();
  Organization.sync();
  UserOrganization.sync();
};

export { User, Organization, UserOrganization, initModels };
