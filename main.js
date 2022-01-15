/** Connect to Moralis server */
const serverUrl = "https://xq1fdjbftfsk.usemoralis.com:2053/server";
const appId = "mDlc6N15njkBzbvae980yEetmqaXpF3yrBnGTwZM";

Moralis.start({ serverUrl, appId });
let user;


async function login() {
   user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "I want to mint NFT" })
      initApp()
   } catch(error) {
     console.log(error)
   }
  }
  else {
    Moralis.enableWeb3();
    initApp()
  }
}
//starting the app
function initApp(){
  document.querySelector("#app").style.display = "block" ;
  document.querySelector("#submit_button").onclick = submit;
}

async function submit(){

  //Get image data
  const input = document.querySelector("#input_image");
  let data = input.files[0];
  
  //IPFS Image Upload
  const imageFile = new Moralis.File(data.name, data);
  await imageFile.saveIPFS();
  let imageHash = imageFile.hash(); 
  
  //Metadata creation
  let metadata = {
    name: document.querySelector("#input_name").value,
    description: document.querySelector("#input_description").value,
    image: "/ipfs" + imageHash
  }
  
  //IPFS Metadata upload
  const jsonFile = new Moralis.File("metadata.json", {base64: btoa(JSON.stringify(metadata))});
  await jsonFile.saveIPFS();
  let metadataHash = jsonFile.hash();
  console.log(metadataHash);

  //Rarible upload 
  let res = await Moralis.Plugins.rarible.lazyMint({
    chain: 'rinkeby',
    userAddress: user.get("ethAddress"),
    tokenType: 'ERC721',
    tokenUri: '/ipfs/' + metadataHash, 
    royaltiesAmount: 5,
  })
  console.log(res);
  //https://rinkeby.rarible.com/token/TOKEN_ADDRESS:TOKEN_ID

}

login();
