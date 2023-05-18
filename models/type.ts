"use strict";
import { Model, UUIDV4 } from "sequelize";

interface TypeAttributes {
  id: number;
  typeName: string;
  typeDescription: string;
  typeLevel: number;
}
export default (sequelize: any, DataTypes: any) => {
  class Type extends Model<TypeAttributes> implements TypeAttributes {
    id!: number;
    typeName!: string;
    typeDescription!: string;
    typeLevel!: number;
    static associate(models: any) {
      Type.belongsToMany(models.Users, {
        through: "Roles",
      });
    }
  }
  Type.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      typeName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      typeDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typeLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Type",
      timestamps:false
    }
  );
  return Type;
};
