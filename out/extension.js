"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const fs_1 = require("fs");
const vscode = require("vscode");
let myStatusBarItem;
let constantsFileURI;
function activate({ subscriptions }) {
    if (vscode.workspace.workspaceFolders !== undefined) {
        const config = vscode.workspace.getConfiguration('statusbarinfo');
        const fileToRead = config.get('fileToRead');
        console.log("fileToRead from configuration is:", fileToRead);
        constantsFileURI = vscode.Uri.parse(vscode.workspace.workspaceFolders[0].uri.path + fileToRead);
        const myCommandId = 'statusbarinfo.openFile';
        subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
            vscode.window.showTextDocument(constantsFileURI);
        }));
        myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        myStatusBarItem.command = myCommandId;
        updateStatusBarItem();
        vscode.workspace.onDidChangeConfiguration(() => updateStatusBarItem());
    }
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
function updateStatusBarItem() {
    const config = vscode.workspace.getConfiguration('statusbarinfo');
    fs_1.readFile(constantsFileURI.fsPath, (err, data) => {
        if (err) {
            return console.error("Error in readFile of file", constantsFileURI.fsPath, err);
        }
        let contents = data.toString();
        let valuesToMatch = config.get('valuesToMatch');
        console.log("valuesToMatch:", valuesToMatch);
        if (valuesToMatch === undefined)
            return;
        let values = [];
        for (let valueToMatch of valuesToMatch) {
            let matches = contents.match(valueToMatch.regex);
            console.log("valueToMatch.regex matches:", matches);
            if (matches) {
                let apiUrl = matches[1];
                values.push(valueToMatch.name + ": " + apiUrl);
            }
        }
        myStatusBarItem.text = values.join(' ');
    });
    myStatusBarItem.show();
}
//# sourceMappingURL=extension.js.map