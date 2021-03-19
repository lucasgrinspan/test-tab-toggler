import * as vscode from "vscode";
import {
    getActiveFileUri,
    getFile,
    getFilenameFromUri,
    isSourceFile,
    isTestFile,
    openFile,
} from "./file";

const { commands, window } = vscode;

export function display(message: string) {
    window.setStatusBarMessage(message, 5000);
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = commands.registerCommand("test-tab-toggler.openUnitTest", async () => {
        const fileUri = getActiveFileUri();

        if (!fileUri) {
            return;
        }
        const fileName = getFilenameFromUri(fileUri);

        let targetFile = "";
        if (isSourceFile(fileName)) {
            const [identifier, extension] = fileName.split(".");
            targetFile = `${identifier}.*.${extension}`;
        } else if (isTestFile(fileName)) {
            const [identifier, testName, extension] = fileName.split(".");
            targetFile = `${identifier}.${extension}`;
        } else {
            display("This file name could not be parsed");
            return;
        }

        try {
            const targetFilePath = await getFile(targetFile, fileUri);
            if (targetFilePath) {
                const document = vscode.Uri.file(targetFilePath);
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
