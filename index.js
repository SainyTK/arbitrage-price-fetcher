const { ChainId, Token, WETH, Fetcher, Route, Trade, TokenAmount, TradeType } = require('@uniswap/sdk')
const { getNetwork } = require('@ethersproject/networks')
const { getDefaultProvider, InfuraProvider } = require('@ethersproject/providers')
const web3 = require('web3');
const search = require('./search');

let chainId = ChainId.MAINNET
let network = getDefaultProvider(getNetwork(chainId))

const TOKENS = {
    'ETH': WETH[chainId],
    'MKR': new Token(chainId, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18),
    'DAI': new Token(chainId, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)
}

const getTokenData = (chainId, address) => Fetcher.fetchTokenData(chainId, address);
const getPair = (TokenA, TokenB) => Fetcher.fetchPairData(TokenA, TokenB);

const getMidPrice = async (TokenA, TokenB) => {
    const pair = await getPair(TokenA, TokenB);
    const route = new Route([pair], TokenA);
    return +route.midPrice.toSignificant(6);
}

const getExecutionPrice = async (TokenA, TokenB, amount) => {
    const pair = await getPair(TokenA, TokenB);
    const route = new Route([pair], TokenA);
    const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], amount), TradeType.EXACT_INPUT)
}

const getAllPairMidPrices = async () => {
    const tokenNames = Object.keys(TOKENS);
    const tokenArr = Object.values(TOKENS);
    const priceMatrix = [];
    for (let i = 0; i < tokenArr.length; i++) {
        if (!priceMatrix[i]) priceMatrix[i] = [];
        for (let j = 0; j < tokenArr.length; j++) {
            priceMatrix[i][j] = i === j ? 1 : await getMidPrice(tokenArr[i], tokenArr[j]);
            console.log(tokenNames[i], tokenNames[j], priceMatrix[i][j]);
        }
    };
    return priceMatrix;
}

const main = async () => {
    const priceMatrix = await getAllPairMidPrices();
    const names = Object.keys(TOKENS);
    console.log(priceMatrix);

    const bestRoute = search(priceMatrix, names);
    console.log('max', bestRoute);
}

main()