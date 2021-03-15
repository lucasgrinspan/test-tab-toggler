# test-tab-toggler README

This extension lets you switch between your unit tests and source files by pressing a keybinding. By default, it is `Ctrl+Shift+T`.

The file opens automatically in a new tab, and toggling between the two files preserves your cursor location, allowing you to quickly switch attention between the two.

For switching to a unit test file, it looks for the current file name with a `.spec` or `.test` added before the extension. For switching to a source file, it removes the test modifier from the current file name.
