import * as assert from "assert";
import { getActiveFileName, getFile, isTestFile, isSourceFile, openFile } from "../../file";
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';

suite("Test Tab Toggler", () => {
    vscode.window.showInformationMessage("Start all tests.");

    test("isSourceFile", () => {
        const file1 = "app.test.js";
        const file2 = "app.js";
        const file3 = "app";
        const result1 = isSourceFile(file1);
        const result2 = isSourceFile(file2);
        const result3 = isSourceFile(file3);

        assert.strictEqual(result1, false);
        assert.strictEqual(result2, true);
        assert.strictEqual(result3, false);
    });

    test("isTestFile", () => {
        const file1 = "app.test.js";
        const file2 = "app.spec.js";
        const file3 = "app.js";
        const file4 = "app";
        const result1 = isTestFile(file1);
        const result2 = isTestFile(file2);
        const result3 = isTestFile(file3);
        const result4 = isTestFile(file4);

        assert.strictEqual(result1, true);
        assert.strictEqual(result2, true);
        assert.strictEqual(result3, false);
        assert.strictEqual(result4, false);
    });
});
