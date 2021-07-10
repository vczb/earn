# Installing setup prerequisites

Here we will perform an installation guide of some application prerequisites

The guide below is valid for Ubuntu 20.4

---

### First we will install required libs

Let's do it

```
$sudo apt install curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libreadline-dev libncurses5-dev libffi-dev libgdbm-dev libpq-dev
```

### Install Ruby 3.0

If you prefer or use another system you can follow the official [guide](https://www.ruby-lang.org/en/documentation/installation/)

We are going to use [RVM](https://rvm.io/)

```
$gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
$cd /tmp
$sudo apt-get update
$curl -sSL https://get.rvm.io | bash -s stable
$source ~/.rvm/scripts/rvm

$sudo apt-get update
$sudo groupadd rvm
$sudo usermod -a -G rvm $USER
$rvm install 3.0.0
```

### Now we will install Node 14.0

Official [website](https://nodejs.org/en/)

We will use [NVM](https://github.com/nvm-sh/nvm)

```
$curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
$source ~/.profile
$nvm install 14.0.0
```

### Installing Yarn

Visit the official [website](https://yarnpkg.com/)

```
$curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
$sudo apt update
$apt list --upgradable
$sudo apt install --no-install-recommends yarn
```

### PostgreSQL

If you want more informations got to official [website](https://www.postgresql.org/)

```
$sudo apt update
$sudo apt install postgresql postgresql-contrib postgresql-client
```

### Rails 6

We are using [Rails 6.0.0](https://guides.rubyonrails.org/getting_started.html)

Follow this command and install rails globally

```
gem install rails
```

Make sure you have the correct version installed.

```
rails -v
```

### Bundler 

We need install [Bundler 2.2](https://bundler.io/)

Install it globally

```
gem install bundler
```

### Optionally you can use Docker and Composer

Follow these guides:

Installing [docker](https://docs.docker.com/engine/install/ubuntu/)

Installing [composer](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)