import * as vscode from "vscode";
import * as path from "path";
import { getFile, isSourceFile, isTestFile, openFile } from "./file";

const { commands, window, workspace } = vscode;

export function display(message: string) {
    window.setStatusBarMessage(message, 5000);
}

export function getActiveFileName(): string {
    const file = window.activeTextEditor;
    if (file) {
        const filePath = file.document.fileName;
        const fileName = path.basename(filePath);
        return fileName;
    }
    return "";
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = commands.registerCommand("test-tab-toggler.openUnitTest", async () => {
        const fileName = getActiveFileName();

        if (!fileName) {
            return;
        }

        let targetFile = "";
        if (isSourceFile(fileName)) {
            const [identifier, extension] = fileName.split(".");
            targetFile = `${identifier}.spec.${extension}`;
        } else if (isTestFile(fileName)) {
            const [identifier, testName, extension] = fileName.split(".");
            targetFile = `${identifier}.${extension}`;
        } else {
            display("This file name could not be parsed");
            return;
        }

        try {
            const document = await getFile(targetFile);
            if (document) {
                openFile(document);
            } else {
                display(`There is no file named ${targetFile}`);
            }
        } catch (e) {
            display(`There was an error opening ${targetFile}`);
            console.error(e);
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
