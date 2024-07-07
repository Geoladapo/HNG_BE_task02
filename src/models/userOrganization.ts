import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Organization from './organization';

class UserOrganization extends Model {
  public userId!: string;
  public orgId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserOrganization.init(
  {
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'userId',
      },
      allowNull: false,
    },
    orgId: {
      type: DataTypes.UUID,
      references: {
        model: Organization,
        key: 'orgId',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user_organizations',
    timestamps: false,
  }
);

User.belongsToMany(Organization, {
  through: UserOrganization,
  foreignKey: 'userId',
});
Organization.belongsToMany(User, {
  through: UserOrganization,
  foreignKey: 'orgId',
});

export default UserOrganization;
