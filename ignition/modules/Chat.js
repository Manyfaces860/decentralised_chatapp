const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Chat", (m) => {
  const chat = m.contract("Chat", []);

  return { chat };
});