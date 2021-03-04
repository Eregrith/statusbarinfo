# statusbarinfo README

This extension will create a Statusbar Item to display some info from the contents of a given file.

## Extension Settings

Two settings are mandatory for the extension to work properly:
 - File path to parse
 - List of values to get from the file with their name and regex to match

### Format of the settings

The value of fileToRead is simply a string containing the relative path of the file in the workspace.
The value of valuesToMatch is an array of objects with properties :
  - name: the name to be displayed in the satus bar
  - regex: the regular expression to be used to match the value to be displayed in the status bar. match[1] will be use so don't capture any other group than what you need displayed. Also don't forget to escape your escape sequences because this is json and not a proper regex-typed value.

Example of settings:

```json
    "statusbarinfo.fileToRead": "/src/app/constants/constants.ts",
    "statusbarinfo.valuesToMatch": [
        {
            "name": "API URL",
            "regex": "public static get apiUrl\\(\\): string {\\r?\\n\\s*return \"(.*)\";\\r?\\n\\s*}"
        },
        {
            "name": "Version",
            "regex": "public static get appVersion\\(\\): string {\\r?\\n\\s*return \"(.*)\";\\r?\\n\\s*}"
        }
    ]
```