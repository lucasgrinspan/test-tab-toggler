import * as vscode from "vscode";

export function isSourceFile(fileName: string): boolean {
    const tokens = fileName.split(".");
    return tokens.length === 2;
}

export function isTestFile(fileName: string): boolean {
    const tokens = fileName.split(".");
    return tokens.length === 3 && tokens[1] === "spec";
}

export function getFile(fileName: string) {
    return vscode.workspace.findFiles(`**/${fileName}`).then((results) => {
        if (results.length > 0) {
            return results[0];
        }
        return null;
    });
}

export function openFile(fileUri: vscode.Uri) {
    vscode.window.showTextDocument(fileUri, { preview: false });
}
