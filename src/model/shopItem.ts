import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db.config";

class ShopItem extends Model<InferAttributes<ShopItem>, InferCreationAttributes<ShopItem>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare price: number;
  declare stock: number;
}

ShopItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "shopItems",
  }
);

export default ShopItem;
