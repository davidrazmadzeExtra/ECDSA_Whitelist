const ethers = require("ethers");

const main = async () => {
  // Accounts #1 - - - - #5
  const allowlistedAddresses = [
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
    "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
    "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
  ];

  // Owner - Account #0
  const owner = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
  const privateKey =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

  // ✅ Wallet address of the owner should be printed
  const signer = new ethers.Wallet(privateKey);
  console.log(signer.address);

  // Sign a message and see the result of the signed message
  // const message = "Hello World!";
  // const signature = await signer.signMessage(message);
  // console.log(signature);

  // * * * * * * * * * * * * * * * //

  // Get first allowlisted address
  const message = allowlistedAddresses[0];

  // Compute hash of the address
  const messageHash = ethers.utils.id(message);
  console.log("Message Hash: ", messageHash);

  // Sign the hashed address
  const messageBytes = ethers.utils.arrayify(messageHash);
  const signature = await signer.signMessage(messageBytes);
  console.log("Signature: ", signature);

  
  // Deploy contract

  const nftContractFactory = await hre.ethers.getContractFactory(
    "Greeter"
  );
  const nftContract = await nftContractFactory.deploy("ipfs://your-cide-code");

  await nftContract.deployed();

  console.log("Contract deployed by: ", signer.address);
  recover = await nftContract.recoverSigner(messageHash, signature);
  console.log("Message was signed by: ", recover.toString());
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
