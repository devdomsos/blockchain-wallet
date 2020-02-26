const Migrations = artifacts.require("Migrations");
const DaiTokenMock = artifacts.require("DaiTokenMock");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(DaiTokenMock);
  const tokenMock = await DaiTokenMock.deployed()

  await tokenMock.mint(
    '0x08599F17dA865Af2656533e50712CcEBe4C4E646',
    '1000000000000000000000'
  )
};