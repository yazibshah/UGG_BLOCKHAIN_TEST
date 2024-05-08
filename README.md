# Blockchain-Based Two-Factor Authentication System

This project implements a simple blockchain-based two-factor authentication (2FA) system using smart contracts on the Ethereum blockchain and an Express API for interacting with the smart contract functions.

## Overview

The two-factor authentication system enhances user authentication security by integrating blockchain technology with one-time passwords (OTPs). Users register their public keys on the blockchain, and OTPs are generated based on the user's seed. OTPs are time-based and expire after a specified duration. Users can authenticate themselves by providing their public key and OTP.

## Features

- User registration: Users can register their public keys on the blockchain.
- OTP generation: OTPs are generated based on the user's seed and expire after a specified duration.
- User authentication: Users can authenticate themselves using their public key and OTP.
- Security measures: Implemented to prevent replay attacks and ensure OTP validity within a specified time window.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone git@github.com:yazibshah/UGG_BLOCKHAIN_TEST.git
   cd Test_2

2.Install dependencies:
npm install

3.Run the application:
nodemon index.js
