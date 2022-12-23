# How to Contribute to Gamou

Gamou is a fully open source project. See the [LICENSE](./LICENSE) file for licensing information.

Before collaborating with the project, please read our [code of conduct](./CODE_OF_CONDUCT.md).

See our [Wiki](https://github.com/vczb/gamou/wiki) for more information about the project.

---

### Getting started

We are very happy with your interest in collaborating on the project, before starting read this guide carefully. Before submitting any pull request see the [issues](https://github.com/vczb/gamou/issues) guide, if your demand is not there create a new one and wait for approval for development.

We use [kanban](https://github.com/vczb/gamou/projects/1) as a workflow, take a look there and see what's going on.

---

## Required versions

- Ruby _3.0.0_
- Rails _7.0.0_
- Postgres _13.2.1_

---

## Contribution Prerequisites

- You are familiar with Git.
- Be curious and enjoy solving problems.

---

### Prepare your setup

Importantly, add an [SSH key](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to your github account.

Make sure your git has user and email settings

```
git config --global user.name "FIRST_NAME LAST_NAME"
git config --global user.email "email@example.com"
```

Then clone the repository

```
git clone -o upstream git@github.com:vczb/gamou.git
```

[Fork](https://docs.github.com/en/github/getting-started-with-github/quickstart/fork-a-repo) the repository

Enter the cloned directory

```
cd gamou
```

Add remote origin

```
git remote add origin git@github.com:<YOUR GITHUB USERNAME>/gamou.git
```

Install the dependences

```
bundle install
```

Create a Postgres user

_execute the commands in psql console_

```
CREATE USER gamou WITH ENCRYPTED PASSWORD 'gamou';
ALTER USER gamou WITH SUPERUSER;
```

Create database and run the migrations

```
rails db:setup
rails db:migrate
```

Run the app

```
rails s
```

Open in your favorite browser

http://localhost:3000/

---

<!--
## Development workflow

See all [available commands](https://github.com/vczb/gamou/wiki/Available-commands)

Follow this [git workflow](https://github.com/vczb/gamou/wiki/Git-workflow)

If you are using VSCode we recommend [this extensions](https://github.com/vczb/gamou/wiki/Recommended-extensions-for-VSCode)

--- -->

## Thank you

If you have any questions, please open an [issue](https://github.com/vczb/gamou/issues)
