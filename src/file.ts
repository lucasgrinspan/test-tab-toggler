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

// First, the function should return any path that is in a subdirectory
// If there are no subdirectory paths, it should return the path with the fewest
// ".."
export function getNearestPath(paths: string[]): string | null {
    let minDoubleDotCount = 100;
    let selectedDocument = null;
    for (let i = 0; i < paths.length; i++) {
        const relativePath = paths[i];
        const tokens = relativePath.split(path.sep);

        // If it is in a subdirectory
        if (tokens[0] !== "..") {
            selectedDocument = relativePath;
            break;
        }

        let doubleDotCount = 0;
        tokens.forEach((token) => {
            if (token === "..") {
                doubleDotCount++;
            }
        });

        if (doubleDotCount < minDoubleDotCount) {
            minDoubleDotCount = doubleDotCount;
            selectedDocument = relativePath;
        }
    }
    return selectedDocument;
}

export function getFile(fileName: string, source: vscode.Uri) {
    return vscode.workspace.findFiles(`**/${fileName}`).then((results) => {
        if (results.length === 0) {
            return null;
        }

        // It should return the file that is "nearest" to the source file
        const targetPath = getNearestPath(
            results.map((file) => path.relative(source.fsPath, file.fsPath))
        );

        if (targetPath) {
            return path.resolve(source.fsPath, targetPath);
        } else {
            return null;
        }
    });
}

export function openFile(fileUri: vscode.Uri) {
    vscode.window.showTextDocument(fileUri, { preview: false });
}

export function getActiveFileUri(): vscode.Uri | null {
    const file = vscode.window.activeTextEditor;
    if (file) {
        return file.document.uri;
    }
    return null;
}

export function getFilenameFromUri(uri: vscode.Uri): string {
    const filePath = uri.fsPath;
    return path.basename(filePath);
}
