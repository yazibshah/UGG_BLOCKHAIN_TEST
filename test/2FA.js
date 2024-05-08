// Import necessary libraries and modules
const { expect } = require("chai");

// Describe the test suite for the TwoFactorAuth contract
describe("TwoFactorAuth", function () {
  let TwoFactorAuth;
  let twoFactorAuth;
  let owner;
  let addr1;

  // Before each test case, deploy the contract and assign signers
  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    twoFactorAuth = await ethers.deployContract("TwoFactorAuth");
  });

  // Test case to register a user
  it("should register a user", async function () {
    const username = "user1";
    await expect(twoFactorAuth.registerUser(username, addr1.address, 12345))
      .to.emit(twoFactorAuth, "UserRegistered")
      .withArgs(username, addr1.address);
  });

  // Test case to generate OTP for a registered user
  it("should generate OTP for a registered user", async function () {
    const username = "user1";
    await twoFactorAuth.registerUser(username, addr1.address, 12345);
    const otp = await twoFactorAuth.generateOTP(username);
  });

  // Test case to authenticate a user with correct OTP
  it("should authenticate a user with correct OTP", async function () {
    const username = "user1";
    await twoFactorAuth.registerUser(username, addr1.address, 12345);
    const otp = await twoFactorAuth.generateOTP(username);
    await twoFactorAuth._authenticateUser(username, addr1.address, otp);
    const isAuthenticated = await twoFactorAuth.authenticateUser(username);
    expect(isAuthenticated).to.equal(true);
  });

  // Test case to not authenticate a user with incorrect OTP
  it("should not authenticate a user with incorrect OTP", async function () {
    const username = "user1";
    await twoFactorAuth.registerUser(username, addr1.address, 12345);
    await twoFactorAuth._authenticateUser(username, addr1.address, 54321);
    const isAuthenticated = await twoFactorAuth.authenticateUser(username);
    expect(isAuthenticated).to.equal(false);
  });
});
