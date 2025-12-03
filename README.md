# latest-christmas-video

A zapier integration that get the latest Christmas video from Youtube and send it via Gmail.

You will need to setup the following environment variables:

- GMAIL_CLIENT_ID
- GMAIL_CLIENT_SECRET

you can get them from Google Clould Console. just creeate a new project and enable gmail api and youtube data api v3.
you can get the instructions from here: https://developers.google.com/workspace/guides/create-project

once you got the new project go to credentials and create OAuth 2.0 Client IDs for a web application.
download the credentials and set the env variables accordingly.

In order to use build this zapier integration you will need to have a zapier account and zapier-platform cli installed. use npm install -g zapier-platform-cli

then you can run the following commands:

- clone this repo
- zapier login
- register a new app with zapier-platform register "latest-christmas-video"
- upload the secrets to zapier env with:
  - zapier-platform env:set 1.0.0 GMAIL_CLIENT_ID="your_client_id"
  - zapier-platform env:set 1.0.0 GMAIL_CLIENT_SECRET="your_client_secret"
- cd latest-christmas-video
- run the test with zapier-platform test
- validate the zap with zapier-platform validate
- push the zapier integration with zapier-platform push
- in the zapier editor create a new zap with this integration and test it.

> **_NOTE:_** I got some trouble with the authentication and i used some help from ai to fix it. at the end it was a headers issue.
>
> ```Typescript
>    headers: {
>      Authorization: "Bearer {{bundle.authData.access_token}}",
>    },
> ```
