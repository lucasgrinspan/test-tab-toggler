import * as vscode from "vscode";
import * as path from "path";

export function isSourceFile(fileName: string): boolean {
    const tokens = fileName.split(".");
    return tokens.length === 2;
}

export function isTestFile(fileName: string): boolean {
    const tokens = fileName.split(".");
    return tokens.length === 3 && (tokens[1] === "spec" || tokens[1] === "test");
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

export function getActiveFileName(): string {
    const file = vscode.window.activeTextEditor;
    if (file) {
        const filePath = file.document.fileName;
        const fileName = path.basename(filePath);
        return fileName;
    }
    return "";
}
