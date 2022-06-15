import ShopItem from "./shopItem";
//const isDev = process.env.NODE_ENV === 'development'

async function dbInit() {
  await ShopItem.sync({ alter: true });
}

export default dbInit;
