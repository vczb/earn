## Recommended extensions for VSCode

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

_config your settings.json_

```
{
  "editor.formatOnSave": true,
  "[ruby]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[erb]": {
    "editor.defaultFormatter": "aliariff.vscode-erb-beautify"
  }
}
```

#### If you want, you can also configure VSCode as the default git editor

```
git config --global core.editor 'code --wait'
```
