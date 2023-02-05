const main = async () => {
  const dtweetContractFactory = await hre.ethers.getContractFactory("Dtweet");
  const dtweetContract = await dtweetContractFactory.deploy();
  await dtweetContract.deployed();
  console.log("Contract add:", dtweetContract.address);

  let dtweetCount;
  dtweetCount = await dtweetContract.getTotalDtweets();
  console.log(dtweetCount.toNumber());

  
  // let dtweetTxn = await dtweetContract.dtweet("A message!");
  // await dtweetTxn.wait(); // Wait for the transaction to be mined

  // const [_, randomPerson] = await hre.ethers.getSigners();
  // dtweetTxn = await dtweetContract.connect(randomPerson).dtweet("Another message!");
  // await dtweetTxn.wait(); // Wait for the transaction to be mined

  // let allDtweets = await dtweetContract.getAllDtweets();
  // console.log(allDtweets);
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

runMain()