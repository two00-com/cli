import chalk from "chalk";
import { api, setOptions, apiOptions, serverMonitor } from "@two00/core";

const command = "server-monitor <id> [options]";

const aliases = ["sm"];

const desc =
  "ping to report your server's health-check status\n\n<id>: the id of the server monitor [string]\n\nOptions:\n--url: the url where to post the server's health-check data [string]\n--route: the route where to post the server's health-check data [string]\n";

const handler = async argv => {
  const thisArgv = argv || {};
  let response;

  const thisServerMonitor = await serverMonitor();

  /* istanbul ignore next */
  const myUrl =
    process.env.NODE_ENV === "production"
      ? apiOptions.config.api.url
      : "https://localhost:2017";

  try {
    const url = thisArgv.url || myUrl;
    const routes = {
      serverMonitor: {
        healthCheck:
          thisArgv.route ||
          apiOptions.config.api.routes.serverMonitor.healthCheck,
      },
    };
    const onError = error => console.error(chalk.bold.red(error));

    setOptions({
      ...apiOptions,
      config: {
        ...apiOptions.config,
        api: {
          ...apiOptions.config.api,
          enableMonitors: thisArgv.verbose || false,
          url,
          routes,
        },
      },
      onError,
    });

    const thisApi = api();

    response = await thisApi.fetch(
      thisApi.serverMonitor.ping(thisArgv.id, thisServerMonitor)
    );
  } catch (err) {
    if (thisArgv.verbose) {
      console.error(chalk.bold.red(err));
    }

    throw new Error(
      "Error: the request was not successful! Consider using the --verbose flag to investigate the problem"
    );
  }

  if (response.status >= 200 && response.status <= 299) {
    if (!thisArgv.verbose) {
      console.info(
        chalk.bold.green(`Success: Status Code: ${response.status}`)
      );
    }

    return true;
  }

  if (!thisArgv.verbose) {
    console.error(
      chalk.bold.red(
        `Error: Status Code: ${response.status}! The request was not successfull! Consider using the --verbose flag to investigate the problem`
      )
    );
  }

  return false;
};

export { command, aliases, desc, handler };
