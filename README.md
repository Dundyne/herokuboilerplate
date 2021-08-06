# HerokuBoilerplate

This is a boilerplate that can be cloned and immediately be deployed on heroku for testing and client collaboration.

Mongo Atlas does not work on private networks behind strict proxies.

Instead install MongoDB locally https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

Database is defined in .env

## NPM Install

1. git clone
2. npm i in root folder
3. Installation will take a while so be patient.

## Run enviorment locally.

1. npm run dev-server in root folder
2. npm run dev-client in root folder

## Auto formatting with Prettier

In VSCode install Prettier and ESlint extensions

To Format Document hit ctrl + shift + p search format then choose Format Document
A Configure button may appear, click this then select prettier.

In VSCode go to File-Preferences-Settings the type in search bare Editor:Format on save and check it.

In VSCode hit ctrl + shift + p then search Format Document With. Hit change default formatter then choose Prettier

Files will now format on save based on prettier config

Happy Coding!

## Create Admin User

Install Postman then send a post request to /api/auth/register
