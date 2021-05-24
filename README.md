# GAMOU

_Gamou is a gamification project that aims to retain customers to stores through a web system._

## Required versions

- Ruby _3.0.0_
- Rails _6.1.3_
- Node _14.0.0_
- Postgres _13.2.1_

## What is inside?

This project uses lot of stuff as:

- [RSpec](https://github.com/rspec/rspec-rails)
- [Devise](https://github.com/heartcombo/devise)
- [Prettier](https://prettier.io/)
- [Simple Form](https://github.com/heartcombo/simple_form)
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)

## Getting Started

Install the project and dependences:

- git clone git@github.com:vczb/gamou.git
- cd gamou
- bundle install
- yarn install
- add or database configurations on config/database.yml
- rails db:create
- rails db:migrate

## Commands

Available commands

| cmd                    | description                      |
| ---------------------- | -------------------------------- |
| rails s                | Run the app on localhost:3000    |
| rails c                | Open app console                 |
| rspec                  | Run all tests                    |
| bin/webpack-dev-server | Runs webpack as development mode |
| bin/webpack            | Build webpack to production      |
| yarn prettier:format   | Format all `rb` and `erb` files  |
| yarn prettier:check    | Check prettier format            |

## Environment

- [Production](https://gamou.herokuapp.com/)
- [Staging](https://stg1-gamou.herokuapp.com/)

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

## Contributing

Thank you for your interest in contributing to the project, see the [guide](./CONTRIBUTING.md) for more information

## Licence

This project is licensed under the [MIT](./LICENSE) License.
