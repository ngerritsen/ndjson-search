# NDJSON Search 🕵🏻‍♀️

Search newline delimited JSON files on fields.

## Install

```
npm install -g ndjson-search
```

## Basic usage

```
ndjs --input ./file.ndsjon --field payload.name --value "John Doe" 
```

## Options

```
Options:
  --version      Show version number                                   [boolean]
  --input, -i    the input file path                         [string] [required]
  --field, -f    <aximum amount of items the retrieve        [string] [required]
  --pattern, -p  Regex pattern to match the field on                    [string]
  --value, -v    Exact value to match the field on                      [string]
  --limit, -l    Maximum amount of items the retrieve                   [number]
  --oneline, -o  Print result on one line             [boolean] [default: false]
  --count, -c    Only print the count                 [boolean] [default: false]
  --help         Show help                                             [boolean]
```
