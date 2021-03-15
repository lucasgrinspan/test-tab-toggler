# Test Tab Toggler

This extension lets you switch between your unit tests and source files by pressing a keybinding. By default, it is `Ctrl+Shift+T`.

The file opens automatically in a new tab, and toggling between the two files preserves your cursor location, allowing you to quickly switch attention between the two.

For switching to a unit test file, it looks for the current file name with a `.spec` or `.test` added before the extension. For switching to a source file, it removes the test modifier from the current file name.

## Installation

Clone this project and generate its package.

```console
git clone https://github.com/lucasgrinspan/test-tab-toggler.git
cd test-tab-toggler
npm install
npm run build
```

This will create a `.vsix` file in the root of the project directory. This extension file can be installed with

```console
code --install-extension test-tab-toggler-0.0.1.vsix
```

If you can't generate the `.vsix` file, you can download it from the [Releases Tab](https://github.com/lucasgrinspan/test-tab-toggler/releases).
