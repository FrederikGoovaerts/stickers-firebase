# Stickers

This web app serves two purposes:

- It digitizes a process I use at work to stimulate time-logging by rewarding colleagues with stickers for correct time logging
- It's a personal POC for a React web app with firebase as a serverless backend

## Running the project

1. Clone the repo and run `npm install`
1. Set up a [Firebase](https://firebase.google.com/) project with at least a Firestore and Google Authentication enabled.
1. Inject the necessary environment variables shown below. The easiest way of doing this for development is by creating a `.env` file in the root of the project. this file will be picked up by a Webpack plugin. When deploying, you can set the environment in any way you like.
1. Run `npm run start` or `npm run build` for development or a minified build respectively.

## Example `.env` file with required variables

```
FIREBASE_API_KEY=*API key*
FIREBASE_AUTH_DOMAIN=*Auth domain*
FIREBASE_DB_URL=*Database URL*
FIREBASE_PROJECT_ID=*Project ID*
FIREBASE_STORAGE_BUCKET=*Storage bucket*
FIREBASE_MSG_SENDER_ID=*Notification sender ID*
FIREBASE_APP_ID=*App ID*
```

These are all provided by the Firebase console.
