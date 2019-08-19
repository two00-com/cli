#!/usr/bin/env node

import yargs from "yargs";
import updateNotifier from "update-notifier";
import pkg from "../package.json";

yargs
  .commandDir("cmds")
  .demandCommand()
  .showHelpOnFail(false)
  .help().argv;

updateNotifier({ pkg }).notify();
