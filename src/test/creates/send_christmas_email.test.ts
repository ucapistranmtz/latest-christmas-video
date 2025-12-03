import { describe, it, expect } from "vitest";
import zapier from "zapier-platform-core";
import App from "../../index";

const appTester = zapier.createAppTester(App);

describe("creates.send_christmas_email", () => {
  it("should have correct structure", () => {
    const create = App.creates.send_christmas_email;

    expect(create.key).toBe("send_christmas_email");
    expect(create.noun).toBe("Email");
    expect(create.operation.perform).toBeDefined();
    expect(create.operation.inputFields).toBeDefined();
    expect(create.operation.inputFields.length).toBeGreaterThan(0);

    //it search for the title
    const titleField = create.operation.inputFields.find(
      (f: any) => f.key === "title"
    );
    expect(titleField).toBeDefined();
    expect(titleField?.required).toBe(true);

    //it search for the url
    const urlField = create.operation.inputFields.find(
      (f: any) => f.key === "url"
    );
    expect(urlField).toBeDefined();
    expect(urlField?.required).toBe(true);
  });
});
