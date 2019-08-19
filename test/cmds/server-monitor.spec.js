import { command, aliases, desc, handler } from "../../src/cmds/server-monitor";

const apiFetchMock = jest.fn();
const pingMock = jest.fn();
jest.mock("@two00/core");
const { api } = require("@two00/core");
api.mockReturnValue({ fetch: apiFetchMock, serverMonitor: { ping: pingMock } });

beforeEach(() => {
  apiFetchMock.mockClear();
  pingMock.mockClear();
});

test("cmds | server-monitor | check command name, aliases, and desc", () => {
  const value = {
    command,
    aliases,
    desc,
  };
  const expected = {
    command: "server-monitor <id> [options]",
    aliases: ["sm"],
    desc:
      "ping to report your server's health-check status\n\n<id>: the id of the server monitor [string]\n\nOptions:\n--url: the url where to post the server's health-check data [string]\n--route: the route where to post the server's health-check data [string]\n",
  };

  expect(value).toEqual(expected);
});

test("cmds | server-monitor | handler | status returned === 201", async () => {
  apiFetchMock.mockReturnValue({ status: 201 });

  const value = await handler();

  expect(value).toBe(true);
  expect(apiFetchMock).toBeCalledTimes(1);
  expect(pingMock).toBeCalledTimes(1);
});

test("cmds | server-monitor | handler | status returned === 201 && --verbose", async () => {
  apiFetchMock.mockReturnValue({ status: 201 });

  const value = await handler({ verbose: true });

  expect(value).toBe(true);
  expect(apiFetchMock).toBeCalledTimes(1);
  expect(pingMock).toBeCalledTimes(1);
});

test("cmds | server-monitor | handler | status returned === 404", async () => {
  apiFetchMock.mockReturnValue({ status: 404 });

  const value = await handler();

  expect(value).toBe(false);
  expect(apiFetchMock).toBeCalledTimes(1);
  expect(pingMock).toBeCalledTimes(1);
});

test("cmds | server-monitor | handler | status returned === 404 && --verbose", async () => {
  apiFetchMock.mockReturnValue({ status: 404 });

  const value = await handler({ verbose: true });

  expect(value).toBe(false);
  expect(apiFetchMock).toBeCalledTimes(1);
  expect(pingMock).toBeCalledTimes(1);
});

test("cmds | server-monitor | handler | throw an Error --verbose", async () => {
  apiFetchMock.mockImplementation(() => {
    throw new Error();
  });

  const value = async () => await handler({ verbose: true });

  expect(value()).rejects.toThrow();
});

test("cmds | server-monitor | handler | throw an Error --verbose=false", async () => {
  apiFetchMock.mockImplementation(() => {
    throw new Error();
  });

  const value = async () => await handler({ verbose: false });

  expect(value()).rejects.toThrow();
});
