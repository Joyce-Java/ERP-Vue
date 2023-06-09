FROM node:14.18.2-buster
ADD ./src /app
WORKDIR /app
ENV DEBCONF_NOWARNINGS yes
RUN apt-get update -y && \
  apt-get upgrade -y && \
  apt-get install -y \
  build-essential -y \
  curl \
  nmap \
  git \
  nano \
  && rm -rf /var/lib/apt/lists/*
RUN npm install -g @vue/cli@4.5.15