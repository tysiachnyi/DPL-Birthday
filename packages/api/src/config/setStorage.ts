import storage from "node-persist";

const setStorage = async () => {
  await storage.init();
};

export default setStorage;
