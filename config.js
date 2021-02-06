const blockchainNetwork = 'kovan';

const walletInfo = {
    address: '0x',
    privateKey: '0x'
}

const infura = {
    projectId: 'fabbb34a11674473bc6ae8fb709ddd1a',
    projectSecret: '11',
    endpoint: `wss://${blockchainNetwork}.infura.io/ws/v3/fabbb34a11674473bc6ae8fb709ddd1a`
}

module.exports = {
    blockchainNetwork,
    walletInfo,
    infura,
}