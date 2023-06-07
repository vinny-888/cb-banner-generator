let provider = null;
if(typeof web3 !== 'undefined'){
    provider = web3.currentProvider;
}

const wrapperTokenContract = "0x6158795c09E6C94080f66Eb9a11aD3d908209284";
const genesisMechTokenContract = "0xb286ac8eff9f44e2c377c6770cad5fc78bff9ed6";

let genesisMechContract = null;

function getWallet() {
    var url = new URL(window.location);
    var wallet = url.searchParams.get("wallet");
    return wallet;
}

function getLP() {
   var url = new URL(window.location);
   var lp = url.searchParams.get("lp");
   return lp;
}

function getCBs() {
   var url = new URL(window.location);
   var cbs = url.searchParams.get("cbs");
   return cbs? cbs.split(',') : null;
}

function getMechs() {
   var url = new URL(window.location);
   var mechs = url.searchParams.get("mechs");
   return mechs? mechs.split(',') : null;
}

function initMechContract(){
    if(typeof web3 !== 'undefined'){
        console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);
        const web3 = new Web3(provider, {timeout: 20000});

        wrapperContract = new web3.eth.Contract(tokenWrapperABI, wrapperTokenContract);
        genesisMechContract = new web3.eth.Contract(mechABI, genesisMechTokenContract);
    }
}

async function getMechTokenBalance(address) {
    try{
        let result = await wrapperContract.methods.getTokens(genesisMechTokenContract, address, 1, 739).call();

        console.log('getMechTokenBalance: ', result);
        return result;
    }catch(e){
        console.log('getMechTokenBalance Error:',e)
        return 0;
    }
}

const tokenWrapperABI = [
    {
       "inputs":[
          {
             "internalType":"contract IERC721",
             "name":"_erc721Contract",
             "type":"address"
          },
          {
             "internalType":"address",
             "name":"_address",
             "type":"address"
          },
          {
             "internalType":"uint256",
             "name":"_startIndex",
             "type":"uint256"
          },
          {
             "internalType":"uint256",
             "name":"_totalSupply",
             "type":"uint256"
          }
       ],
       "name":"getTokens",
       "outputs":[
          {
             "internalType":"uint256[]",
             "name":"",
             "type":"uint256[]"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    }
 ]
 const mechABI = [{"inputs":[{"components":[{"internalType":"string","name":"contractURI","type":"string"},{"internalType":"string","name":"baseURI","type":"string"},{"internalType":"address[]","name":"minters","type":"address[]"},{"internalType":"address","name":"metadataManager","type":"address"},{"internalType":"address","name":"royaltyReceiver","type":"address"},{"internalType":"uint96","name":"royaltyFeeNumerator","type":"uint96"}],"internalType":"struct IERC721Common.ERC721CommonConfig","name":"config","type":"tuple"},{"internalType":"address","name":"tplOrigin_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"InvalidZeroMint","type":"error"},{"inputs":[],"name":"NotAuthorized","type":"error"},{"inputs":[],"name":"NotCurrentRenter","type":"error"},{"inputs":[],"name":"OnlyMinter","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"OperatorNotAllowed","type":"error"},{"inputs":[],"name":"OperatorNotAuthorized","type":"error"},{"inputs":[],"name":"TooManyRequested","type":"error"},{"inputs":[],"name":"TransferDeniedByRentalManager","type":"error"},{"inputs":[],"name":"UnknownMech","type":"error"},{"inputs":[],"name":"WrongParameter","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"mechId","type":"uint256"}],"name":"MechChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint64","name":"expires","type":"uint64"}],"name":"UpdateUser","type":"event"},{"inputs":[],"name":"OPERATOR_FILTER_REGISTRY","outputs":[{"internalType":"contract IOperatorFilterRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"newMinters","type":"address[]"}],"name":"addMinters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"cancelRental","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getMechOrigin","outputs":[{"components":[{"components":[{"internalType":"uint256","name":"partId","type":"uint256"},{"components":[{"internalType":"uint256","name":"generation","type":"uint256"},{"internalType":"uint256","name":"originalId","type":"uint256"},{"internalType":"uint256","name":"bodyPart","type":"uint256"},{"internalType":"uint256","name":"model","type":"uint256"},{"internalType":"uint256[]","name":"stats","type":"uint256[]"}],"internalType":"struct ITPLRevealedParts.TokenData","name":"data","type":"tuple"}],"internalType":"struct ITPLMechOrigin.TPLPartOrigin[]","name":"parts","type":"tuple[]"},{"internalType":"uint256","name":"afterglow","type":"uint256"}],"internalType":"struct ITPLMechOrigin.MechOrigin","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"getMechOriginBatch","outputs":[{"components":[{"components":[{"internalType":"uint256","name":"partId","type":"uint256"},{"components":[{"internalType":"uint256","name":"generation","type":"uint256"},{"internalType":"uint256","name":"originalId","type":"uint256"},{"internalType":"uint256","name":"bodyPart","type":"uint256"},{"internalType":"uint256","name":"model","type":"uint256"},{"internalType":"uint256[]","name":"stats","type":"uint256[]"}],"internalType":"struct ITPLRevealedParts.TokenData","name":"data","type":"tuple"}],"internalType":"struct ITPLMechOrigin.TPLPartOrigin[]","name":"parts","type":"tuple[]"},{"internalType":"uint256","name":"afterglow","type":"uint256"}],"internalType":"struct ITPLMechOrigin.MechOrigin[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getMechPartsIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner_","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOperatorFilterEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"mechOriginData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"metadataManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"mechData","type":"uint256"}],"name":"mintNext","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"mintTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"mechData","type":"uint256"}],"name":"mintToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"minters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"oldMinters","type":"address[]"}],"name":"removeMinters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rentalManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newBaseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newBaseURI","type":"string"},{"internalType":"bool","name":"triggerEIP4906","type":"bool"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newContractURI","type":"string"}],"name":"setContractURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint96","name":"feeNumerator","type":"uint96"}],"name":"setDefaultRoyalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"newIsEnabled","type":"bool"}],"name":"setIsOperatorFilterEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newMetadataManager","type":"address"}],"name":"setMetadataManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newRentalManager","type":"address"}],"name":"setRentalManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newTplMechOrigin","type":"address"}],"name":"setTPLOrigin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint64","name":"expires","type":"uint64"}],"name":"setUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tplOrigin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"mechData","type":"uint256"}],"name":"updateMechData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"userExpires","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"userOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]