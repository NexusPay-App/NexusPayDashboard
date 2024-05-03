const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    blockNumber: String,
    timeStamp: String,
    hash: String,
    nonce: String,
    blockHash: String,
    from: String,
    contractAddress: String,
    to: String,
    value: String,
    tokenName: String,
    tokenSymbol: String,
    tokenDecimal: String,
    transactionIndex: String,
    gas: String,
    gasPrice: String,
    gasUsed: String,
    cumulativeGasUsed: String,
    input: String,
    confirmations: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
