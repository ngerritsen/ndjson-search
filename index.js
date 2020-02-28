#!/usr/bin/env node

const _ = require('lodash');
const fs = require('fs');
const yargs = require('yargs');
const ndjson = require('ndjson');
const { highlight } = require('cli-highlight');

const OUTPUT_COUNT = 'count';
const OUTPUT_NDJSON = 'ndjson';
const OUTPUT_JSON = 'json';

const { input, field, value, pattern, colors, limit, output, indent } = yargs
  .command('* <input>', 'Search the ndjson', yargs => {
    yargs
      .positional('input', {
        type: 'string',
        description: 'The input file path'
      })
      .option('indent', {
        alias: 'i',
        type: 'number',
        description:
          'Spaces of indentation for json output (if none provided no formatting is applied).'
      })
      .option('field', {
        alias: 'f',
        type: 'string',
        description: 'Field/path to match on (no field will return everything)'
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
      .option('output', {
        alias: 'o',
        type: 'string',
        default: OUTPUT_NDJSON,
        choices: [OUTPUT_NDJSON, OUTPUT_JSON, OUTPUT_COUNT],
        description: 'Search result output format'
      })
      .option('colors', {
        alias: 'c',
        type: 'boolean',
        default: false,
        description: 'Syntax highlight the json/ndjson output'
      });
  })
  .help().argv;

search();

function search() {
  let found = [];

  const stream = fs.createReadStream(input).pipe(ndjson.parse());

  stream.on('data', item => {
    if (!matchField(item, field, value)) {
      return;
    }

    found.push(item);

    if (output === OUTPUT_NDJSON) {
      printJson(item);
    }

    if (found.length >= limit) {
      stream.on('error', () => {});
      stream.end();
    }
  });

  stream.on('end', () => {
    if (output === OUTPUT_COUNT) {
      console.log(found.length);
    }

    if (output === OUTPUT_JSON) {
      printJson(found);
    }
  });
}

function printJson(data) {
  const jsonString = JSON.stringify(data, null, indent);

  if (colors) {
    console.log(highlight(jsonString, { language: 'json' }));
    return;
  }

  console.log(jsonString);
}

function matchField(item, field, value) {
  const fieldValue = String(_.get(item, field));

  if (pattern) {
    return new RegExp(pattern).test(fieldValue);
  }

  return fieldValue === String(value);
}
