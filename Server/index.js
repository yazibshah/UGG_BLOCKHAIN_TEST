const express = require('express');
const { ethers } = require('ethers');
const ABI=require('../artifacts/contracts/2FA.sol/TwoFactorAuth.json').abi// Replace with the ABI of your deployed contract


const contractAddress = '0x5BD6A384971bE4569948ed523feF6e145DD46dAE'; // Replace with the address of your deployed contract

const app = express();
const port = 3000;
app.use(express.json());

// Initialize Ethereum provider
const provider = new ethers.JsonRpcProvider('https://bsc-testnet-dataseed.bnbchain.org');

// Connect to the contract
const contract = new ethers.Contract(contractAddress,ABI , provider);

const [User1PrivateKey,User2PrivateKey]=["",""];
const user1=new ethers.Wallet(User1PrivateKey,provider);


// Endpoint to register a user
app.post('/register', async (req, res) => {
    const { username, publicKey, otpSeed } = req.body;

    try {
        
        // Connect the contract with the signer
        const contractWithSigner = contract.connect(user1);
        // Call the registerUser function
        const tx = await contractWithSigner.registerUser(username, publicKey, otpSeed);
        await tx.wait();
        res.json({ message: `User ${username} registered successfully!` });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});


// Endpoint to generate OTP for a user
app.post('/generate-otp', async (req, res) => {
    const { username } = req.body;
    try {
        const otp = await contract.connect(user1).generateOTP(username);
        res.json({ success: true, otp: otp.toString() });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Endpoint to authenticate a user
app.post('/authenticate', async (req, res) => {
    const { username, publicKey, otp } = req.body;
    try {
        const Authenticated = await contract.connect(user1)._authenticateUser(username, publicKey, otp);
        const isAuthenticated= await contract.connect(user1)._authenticateUser(username);
        res.json({ success: true, isAuthenticated });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});
