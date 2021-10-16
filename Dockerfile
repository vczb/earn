FROM ruby:3.0.0

RUN useradd -ms /bin/bash user

RUN apt-get update -qq && apt-get install -y postgresql-client

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt -y install nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update
RUN apt list --upgradable
RUN apt install -y yarn

ENV APP_HOME /gamou
RUN mkdir $APP_HOME
RUN chown user $APP_HOME
USER user
WORKDIR $APP_HOME

ADD Gemfile Gemfile.lock package.json yarn.lock $APP_HOME

RUN yarn install
RUN bundle install

ENTRYPOINT ["sh", "./entrypoint.sh"]

EXPOSE 3000
EXPOSE 3035
EXPOSE 5432


