# How to Contribute to Gamou

Gamou is a fully open source project. See the [LICENSE](./LICENSE) file for licensing information.

Before collaborating with the project, please read our [code of conduct](./CODE_OF_CONDUCT.md).

See our [Wiki](https://github.com/vczb/gamou/wiki) for more information about the project.

---

### Getting Started

We are thrilled about your interest in contributing to Gamou. Please read this guide thoroughly before starting. Check the [issues](https://github.com/vczb/gamou/issues) section before submitting any pull request. If your issue isn't listed, create a new one and wait for approval before proceeding.

We utilize a [kanban](https://github.com/vczb/gamou/projects/1) workflow. Take a look to see what's currently in progress.

---

## Required Versions

- Ruby _3.0.0_
- Rails _7.0.8_
- Postgres _13.2.1_
- NodeJS _18.12.0_

---

## Contribution Prerequisites

- Familiarity with Git.
- A curious mind and a knack for problem-solving.

---

### Preparing Your Setup

First, add an [SSH key](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to your GitHub account.

Ensure your Git configuration is set up with your name and email:

```

git config --global user.name "FIRST_NAME LAST_NAME"
git config --global user.email "email@example.com"

```

Clone the repository:

```

git clone -o upstream git@github.com:vczb/gamou.git

```

[Fork](https://docs.github.com/en/github/getting-started-with-github/quickstart/fork-a-repo) the repository and navigate into the cloned directory:

```

cd gamou

```

Add your fork as a remote origin:

```

git remote add origin git@github.com:<YOUR GITHUB USERNAME>/gamou.git

```

Install Ruby dependencies:

```

bundle install

```

Install JavaScript dependencies using Yarn:

```

yarn install

```

Create a Postgres user (execute in the psql console):

```

CREATE USER gamou WITH ENCRYPTED PASSWORD 'gamou';
ALTER USER gamou WITH SUPERUSER;

```

Set up the database:

```

rails db:setup
rails db:migrate

```

### Configuring Local Domain

Before running the app, add custom domain mappings to your `/etc/hosts` file for local development:

```

echo '127.0.0.1 gamou' | sudo tee -a /etc/hosts
echo '127.0.0.1 app.gamou' | sudo tee -a /etc/hosts

```

### Running the Application

To start the development environment for the React app along with the Rails backend, use:

```
./bin/dev
```

This will serve the React application and the Rails API. You can access the React app in your browser at `http://app.gamou:3000`.

Note: Running `./bin/dev` starts both the Rails server and the esbuild process for the React app. If you wish to run only the API and the base Rails project without the React frontend, you can simply run:

```
rails s
```

and access the Rails-based projects and API at `http://gamou:3000`.

---

## Development Workflow

Refer to the [available commands](https://github.com/vczb/gamou/wiki/Available-commands) and follow our [git workflow](https://github.com/vczb/gamou/wiki/Git-workflow).

For VSCode users, we recommend these [extensions](https://github.com/vczb/gamou/wiki/Recommended-extensions-for-VSCode).

---

## Thank You

If you have any questions, feel free to open an [issue](https://github.com/vczb/gamou/issues).
