import zapier, { defineApp } from 'zapier-platform-core';

import packageJson from '../package.json' with { type: 'json' };


import authentication from "./authentication.js";

import getNewCristmasVideo from "./triggers/new_christmas_video.js";
import createSendChristmasEmail from "./creates/send_christmas_email.js";

export default {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: packageJson.version,
  platformVersion: zapier.version,

  authentication, // <--- esto indica a Zapier que use tu custom auth

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [getNewCristmasVideo.key]: getNewCristmasVideo,
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  //create is the same as actions
  creates: {
    [createSendChristmasEmail.key]: createSendChristmasEmail,
  },

  resources: {},
  flags: {
    cleanInputData: false, //to remove the D028 warning
  },
};
