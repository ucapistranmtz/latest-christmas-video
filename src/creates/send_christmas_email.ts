import { Bundle, ZObject } from "zapier-platform-core";

interface VideoInput extends Record<string, unknown> {
  title: string;
  url: string;
  description?: string;
  thumbnail?: string;
  publishedAt?: string;
  recipientEmail?: string;
}

const perform = async (z: ZObject, bundle: Bundle<VideoInput>) => {
  const { title, url, description, thumbnail, publishedAt, recipientEmail } =
    bundle.inputData;
  const to = recipientEmail || bundle.authData.email;

  const subject = `🎄 New Christmas video: ${title}`;

  const body = `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">🎅 New Christmas video 🎄</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #333;">${title}</h2>
          
          ${
            thumbnail
              ? `
            <div style="text-align: center; margin: 20px 0;">
              <img src="${thumbnail}" alt="${title}" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            </div>
          `
              : ""
          }
          
          ${
            description
              ? `
            <p style="color: #666; line-height: 1.6;">${description}</p>
          `
              : ""
          }
          
          ${
            publishedAt
              ? `
            <p style="color: #999; font-size: 14px;">
              <strong>Publicado:</strong> ${new Date(
                publishedAt
              ).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          `
              : ""
          }
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${url}" 
               style="background-color: #FF0000; 
                      color: white; 
                      padding: 15px 40px; 
                      text-decoration: none; 
                      border-radius: 25px; 
                      font-weight: bold;
                      display: inline-block;
                      box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
              ▶️ Check the video 
            </a>
          </div>
        </div>
        
        <div style="background-color: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
          <p style="margin: 0; font-size: 12px;">
            This email was sent by Latest Chrismas video Zap 🎄
          </p>
        </div>
      </body>
    </html>
  `;

  const message = [
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `To: ${to}`,
    `Subject: ${subject}`,
    "",
    body,
  ].join("\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  //gmail api
  const response = await z.request({
    url: "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    body: JSON.stringify({
      raw: encodedMessage,
    }),
  });
  return {
    id: response.data.id,
    threadId: response.data.threadId,
    emailSent: true,
    recipient: to,
    subject: subject,
    videoTitle: title,
    videoUrl: url,
  };
};

export default {
  key: "send_christmas_email",
  noun: "Email",
  display: {
    label: "Send Christmas Video Email",
    description: "Sends an email with the latest Christmas video from YouTube",
    hidden: false,
  },
  operation: {
    perform,
    inputFields: [
      {
        key: "title",
        label: "Video Title",
        type: "string",
        required: true,
        helpText: "The title of the YouTube video",
      },
      {
        key: "url",
        label: "Video URL",
        type: "string",
        required: true,
        helpText: "The URL of the YouTube video",
      },
      {
        key: "description",
        label: "Video Description",
        type: "text",
        required: false,
        helpText: "The description of the YouTube video",
      },
      {
        key: "thumbnail",
        label: "Thumbnail URL",
        type: "string",
        required: false,
        helpText: "URL of the video thumbnail image",
      },
      {
        key: "publishedAt",
        label: "Published Date",
        type: "datetime",
        required: false,
        helpText: "When the video was published",
      },
      {
        key: "recipientEmail",
        label: "Recipient Email",
        type: "string",
        required: false,
        helpText: "Email address to send to (defaults to authenticated user)",
      },
    ],
    sample: {
      id: "123abc",
      threadId: "456def",
      emailSent: true,
      recipient: "user@example.com",
      subject: "🎄 New Christmas video: Amazing Christmas Song",
      videoTitle: "Amazing Christmas Song",
      videoUrl: "https://youtube.com/watch?v=example",
    },
  },
};
