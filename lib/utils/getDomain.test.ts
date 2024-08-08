import { getDomain } from "./getDomain";

describe("getDomain", () => {
  test("https://google.com", () => {
    expect(getDomain("https://google.com")).toBe("google.com");
  });
  test("https://www.google.com", () => {
    expect(getDomain("https://www.google.com")).toBe("google.com");
  });
  test("https://react.dev/learn", () => {
    expect(getDomain("https://react.dev/learn")).toBe("react.dev");
  });
  test("https://learn.microsoft.com/it-it/windows/dev-environment/javascript/react-overview", () => {
    expect(
      getDomain(
        "https://learn.microsoft.com/it-it/windows/dev-environment/javascript/react-overview",
      ),
    ).toBe("learn.microsoft.com");
  });
  test("https://www.bbc.co.uk/", () => {
    expect(getDomain("https://www.bbc.co.uk/")).toBe("bbc.co.uk");
  });
});
