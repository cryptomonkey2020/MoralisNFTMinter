/** Connect to Moralis server */
const serverUrl = "https://xq1fdjbftfsk.usemoralis.com:2053/server";
const appId = "mDlc6N15njkBzbvae980yEetmqaXpF3yrBnGTwZM";

Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" })
      console.log(user)
      console.log(user.get('ethAddress'))
   } catch(error) {
     console.log(error)
   }
  }
}

login();
