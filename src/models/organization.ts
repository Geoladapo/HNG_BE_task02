import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface OrganizationAttributes {
  orgId: string;
  name: string;
  description?: string;
}

type OrganizationCreationAttributes = Optional<OrganizationAttributes, 'orgId'>;

class Organization
  extends Model<OrganizationAttributes, OrganizationCreationAttributes>
  implements OrganizationAttributes
{
  public orgId!: string;
  public name!: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Organization.init(
  {
    orgId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'organizations',
    timestamps: false,
  }
);

export default Organization;
