const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
  
    const dtweetsContractFactory = await hre.ethers.getContractFactory("dtweetsPortal");
    const dtweetsContract = await dtweetsContractFactory.deploy();
    await dtweetsContract.deployed();
  
    console.log("dtweetsPortal address: ", dtweetsContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();