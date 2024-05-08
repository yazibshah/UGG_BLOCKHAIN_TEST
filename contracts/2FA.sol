// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract TwoFactorAuth {
    struct User {
        address publicKey;
        uint256 otpSeed;
        uint256 lastUpdated;    
        bool status;

    }

    mapping(string => User) private users;
    
    uint256 private constant OTP_DURATION = 100; // OTP validity duration in seconds
    

    event UserRegistered(string username, address publicKey);
    event OTPGenerated(address publicKey, uint256 otp);
    event UserAuthenticated(address publicKey, bool success);

    function registerUser(string memory _username, address _publicKey, uint256 _otpSeed) external returns(string memory){
        require(users[_username].publicKey == address(0), "User already registered");
        users[_username] = User(_publicKey, _otpSeed, block.timestamp,false);
        emit UserRegistered(_username, _publicKey);
        return "User Registered";
    }

    function generateOTP(string memory _username) external view returns (uint256) {
        require(users[_username].publicKey != address(0), "User not registered");
        uint256 elapsedTime = block.timestamp - users[_username].lastUpdated;
        require(elapsedTime <= OTP_DURATION, "Wait for previous OTP to expire");
        return uint256(keccak256(abi.encodePacked(users[_username].otpSeed, OTP_DURATION)));
    }


    function authenticateUser(string memory _username) external view returns (bool){
        require(users[_username].publicKey!=address(0), "You are not the user");
        return users[_username].status;
    }

    function _authenticateUser(string memory _username, address _publicKey, uint256 _otp) external {
        require(users[_username].publicKey == _publicKey, "Invalid public key");
        uint256 elapsedTime = block.timestamp - users[_username].lastUpdated;
        require(elapsedTime < OTP_DURATION, "OTP expired");
        uint256 currentOTP = uint256(keccak256(abi.encodePacked(users[_username].otpSeed, OTP_DURATION)));
        if (currentOTP == _otp) {
        emit UserAuthenticated(_publicKey, true);
        users[_username].status=true;
        
    } else {
        emit UserAuthenticated(_publicKey, false);
        users[_username].status=false;
        
    }
        
    }
}
