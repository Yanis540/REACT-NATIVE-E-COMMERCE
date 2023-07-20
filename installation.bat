: Backend 
npm i express dotenv cors socket.io jsonwebtoken express-async-handler email-validator bcrypt
npm i --save-dev @types/bcrypt @types/jsonwebtoken @types/nodemailer
npm i -D nodemon
npm i  prisma  ts-node  @types/express @types/node
npm install @prisma/client
npx tsc --init
npx prisma init
npm i stripe 
npm install google-auth-library --save

: Front 

npx create-expo-app frontend
cd frontend
npm install -D @tsconfig/react-native @types/jest @types/react @types/react-test-renderer typescript
npx expo install @types/react@~18.0.27 typescript@^4.9.4
: create in the root folder a tsconfig.json  and put : 
: {
:     "extends" : "@tsconfig/react-native/tsconfig.json"
: }
: start android studio in the same time run a phone 
: and just press a on the terminal after running the npx expo start
npx expo start

npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/stack @react-navigation/drawer @react-navigation/bottom-tabs


npx expo install react-native-gesture-handler react-native-reanimated

npm i nativewind
npx tailwindcss init 
npm install --save-dev tsc-alias
npm i @react-navigation/native-stack
npm install zustand
npm i @tanstack/react-query
npm i lottie-react-native
npm  i react-native-animatable
npm install @react-native-async-storage/async-storage
npm install react-native-root-toast
npm i react-native-paper
npm install react-native-multiple-select --save
npm i react-hook-form @hookform/resolvers
npm install @react-native-material/core
npm install @react-native-picker/picker --save
npm install @likashefqet/react-native-image-zoom
npm install react-native-svg
npm i react-native-toast-notifications
npx expo install expo-linear-gradient
npm i react-native-modal
npm install @stripe/stripe-react-native 
npx expo install @react-native-google-signin/google-signin

: folow this https://www.nativewind.dev/quick-starts/expo
: installing build 
npm install -g eas-cli

eas login 
eas build:configure
eas build 
eas credentials @REM will allow you to get the SHA1 fingerprint
: > go to firebase create new application and add an android application 
: put the name as the name you choose here and select 
: with eas credentials you should get he SHA1 key that will be used in firebase
: put all of them in a single file and then go to the application > download the google-services.json 
: go to > authentication and sign in method and choose google  

@REM ? Android
cd frontend 
: RUN THIS COMMAND : 
keytool -list -v -keystore android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android
: you should get the SHA1 key for your project tthat we will add to firebase 
@REM todo COPY TWO THINGS : PACKAGE NAME + SHA1 KEY 

: than folow these things : https://github.com/react-native-google-signin/google-signin/blob/master/docs/android-guide.md
