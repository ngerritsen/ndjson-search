# NDJSON Search 🕵🏻‍♀️

Search in newline delimited JSON files.

## Install

```
npm install -g ndjson-search
```

## Basic usage

```
ndjs --input ./file.ndsjon --field name --value "John Doe" 
```

## Search with RegEx

```
ndjs --input ./file.ndsjon --field name --pattern "^John.+Doe$" 
```

## Search on nested fields

```
ndjs --input ./file.ndsjon --field payload.user.id --value 123
```

## Options

```
Options:
  --version      Show version number                                   [boolean]
  --input, -i    The input file path                         [string] [required]
  --field, -f    Field/path to match on                      [string] [required]
  --pattern, -p  RegEx pattern to match the field on                    [string]
  --value, -v    Exact value to match the field on                      [string]
  --limit, -l    Maximum amount of items the retrieve                   [number]
  --oneline, -o  Print result on one line             [boolean] [default: false]
  --count, -c    Only print the count                 [boolean] [default: false]
  --help         Show help                                             [boolean]
```
