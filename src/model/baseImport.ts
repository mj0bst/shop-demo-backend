import ShopItem from "./shopItem";

/**
 * This base import is used for demo purposes in dev environments.
 */
export default async () => {
  await ShopItem.findOrCreate({
    where: { name: "item1" },
    defaults: { name: "item1", description: "This is some item", price: 2.15, stock: 5 },
  });
  await ShopItem.findOrCreate({
    where: { name: "item2" },
    defaults: { name: "item2", description: "This is another item", price: 5.2, stock: 0 },
  });
};
