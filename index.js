#!/usr/bin/env node

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const yargs = require('yargs');
const ndjson = require('ndjson');
const { highlight } = require('cli-highlight');

const { input, field, value, pattern, count, oneline, limit } = yargs
  .option('input', {
    alias: 'i',
    type: 'string',
    demandOption: true,
    description: 'The input file path'
  })
  .option('field', {
    alias: 'f',
    type: 'string',
    demandOption: true,
    description: 'Field/path to match on'
  })
  .option('pattern', {
    alias: 'p',
    type: 'string',
    description: 'RegEx pattern to match the field on'
  })
  .option('value', {
    alias: 'v',
    type: 'string',
    description: 'Exact value to match the field on'
  })
  .option('limit', {
    alias: 'l',
    type: 'number',
    description: 'Maximum amount of items the retrieve'
  })
  .option('oneline', {
    alias: 'o',
    type: 'boolean',
    default: false,
    description: 'Print result on one line'
  })
  .option('count', {
    alias: 'c',
    type: 'boolean',
    default: false,
    description: 'Only print the count'
  })
  .help().argv;

search();

function search() {
  logSearchPlan();

  let found = [];

  const stream = fs.createReadStream(input).pipe(ndjson.parse());

  stream.on('data', item => {
    if (!matchField(item, field, value)) {
      return;
    }

    found.push(item);

    if (!count) {
      logHit(item);
    }

    if (found.length >= limit) {
      stream.on('error', () => {});
      stream.end();
    }
  });

  stream.on('end', () => {
    logResult(found.length);
  });
}

function logHit(item) {
  const indentation = oneline ? undefined : 2;
  console.log(
    highlight(JSON.stringify(item, null, indentation), { language: 'json' })
  );
}

function logSearchPlan() {
  console.log(
    `🔎 ${count ? 'Counting' : 'Searching for'}` +
      chalk.magenta.bold(` $.${field}`) +
      (pattern
        ? ` matches ${chalk.yellow.bold(`/${pattern}/`)}`
        : ` is ${chalk.yellow.bold(value)}`) +
      ` in ${chalk.bold(path.basename(input))}` +
      (limit ? ` (limit ${chalk.red.bold(limit)})` : '') +
      '...'
  );
}

function logResult(resultCount) {
  console.log(
    `✅ ${chalk.bold(resultCount)} ${
      resultCount === 1 ? 'item' : 'items'
    } found` +
      (limit === resultCount ? ` (limit ${chalk.red.bold(limit)})` : '') +
      '.'
  );
}

function matchField(item, field, value) {
  const fieldValue = String(_.get(item, field));

  if (pattern) {
    return new RegExp(pattern).test(fieldValue);
  }

  return fieldValue === String(value);
}
