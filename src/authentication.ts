const authentication = {
  type: "oauth2",
  oauth2Config: {
    authorizeUrl: {
      url: "https://accounts.google.com/o/oauth2/v2/auth",
      params: {
        client_id: "{{process.env.GMAIL_CLIENT_ID}}",
        response_type: "code",
        redirect_uri: "{{bundle.inputData.redirect_uri}}",
        scope:
          "https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/gmail.send",
        access_type: "offline",
        prompt: "consent",
      },
    },
    getAccessToken: {
      url: "https://oauth2.googleapis.com/token",
      method: "POST",
      body: {
        code: "{{bundle.inputData.code}}",
        client_id: "{{process.env.GMAIL_CLIENT_ID}}",
        client_secret: "{{process.env.GMAIL_CLIENT_SECRET}}",
        redirect_uri: "{{bundle.inputData.redirect_uri}}",
        grant_type: "authorization_code",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
    refreshAccessToken: {
      url: "https://oauth2.googleapis.com/token",
      method: "POST",
      body: {
        refresh_token: "{{bundle.authData.refresh_token}}",
        client_id: "{{process.env.GMAIL_CLIENT_ID}}",
        client_secret: "{{process.env.GMAIL_CLIENT_SECRET}}",
        grant_type: "refresh_token",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
    scope:
      "https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/gmail.send",
    autoRefresh: true,
  },
  test: {
    url: "https://www.googleapis.com/youtube/v3/channels",
    method: "GET",
    headers: {
      Authorization: "Bearer {{bundle.authData.access_token}}",
    },
    params: {
      part: "snippet",
      mine: "true",
    },
  },
  connectionLabel: "{{snippet.title}}",
} as const;

export default authentication;
