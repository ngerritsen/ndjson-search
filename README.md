# NDJSON Search 🕵🏻‍♀️

Search in newline delimited JSON files.

## Install

```
npm install -g ndjson-search
```

## Usage

```
ndjs <filepath> [...options]
```

### Basic usage

```
ndjs ./file.ndsjon --field name --value "John Doe" 
```

### Search with RegEx

```
ndjs ./file.ndsjon --field name --pattern "^John.+Doe$" 
```

### Search on nested fields

```
ndjs ./file.ndsjon --field payload.user.id --value 123
```

### Put result into file

```
ndjs ./file.ndsjon --field payload.user.id --value 123 > result.ndjson
```

### Different output

```
ndjs ./file.ndsjon --field payload.user.id --value 123 --output json
```

### Pretty output

```
ndjs ./file.ndsjon --field payload.user.id --value 123 --indent 2 --colors
```

### API

```
ndjs <input>

Search the ndjson

Positionals:
  input  The input file path                                            [string]

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --indent, -i   Spaces of indentation for the json, if not provided no
                 indentation is applied.                                [number]
  --field, -f    Field/path to match on (no field will return everything)
                                                                        [string]
  --pattern, -p  RegEx pattern to match the field on                    [string]
  --value, -v    Exact value to match the field on                      [string]
  --limit, -l    Maximum amount of items the retrieve                   [number]
  --output, -o   Search result output format
               [string] [choices: "ndjson", "json", "count"] [default: "ndjson"]
  --colors, -c   Syntax highlight the json/ndjson output
                                                      [boolean] [default: false]
```
