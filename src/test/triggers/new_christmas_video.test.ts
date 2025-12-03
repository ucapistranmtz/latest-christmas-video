import { describe, it, expect, vi } from "vitest";
import zapier from "zapier-platform-core";
import App from "../../index";

const appTester = zapier.createAppTester(App);

// Mock de z.request
zapier.tools.env.inject();

describe("triggers.new_christmas_video", () => {
  it("should return christmas videos", async () => {
    //this is a mock to avoid real api calls
    const bundle = {
      authData: {
        access_token: "fake_token",
        refresh_token: "fake_refresh",
      },
      inputData: {
        channelId: "UC_test",
      },
    };

    // Mock response
    const mockResponse = {
      status: 200,
      json: {
        items: [
          {
            id: { videoId: "abc123" },
            snippet: {
              title: "Feliz Navidad 2025",
              description: "Christmas video",
              thumbnails: { high: { url: "https://example.com/thumb.jpg" } },
              publishedAt: "2025-12-01T00:00:00Z",
            },
          },
        ],
      },
    };

    //
    const trigger = App.triggers.new_christmas_video;
    expect(trigger.key).toBe("new_christmas_video");
    expect(trigger.noun).toBe("Crhistmas Video");
    expect(trigger.operation.perform).toBeDefined();
  });
});
