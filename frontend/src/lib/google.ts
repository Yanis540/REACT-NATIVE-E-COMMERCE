import { GoogleSignin,GoogleSigninButton,statusCodes, } from '@react-native-google-signin/google-signin';
console.log(process.env.GOOGLE_CLIENT_ID)
export const config = () =>GoogleSignin.configure({
  offlineAccess: true, 
  scopes:["email","profile"], 
  webClientId:process.env.GOOGLE_CLIENT_ID , 
});

const google = {
  config, 
}

export default google ; 