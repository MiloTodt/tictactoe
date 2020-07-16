# Tic Tac Toe

Tic Tac Toe game with scoreboard. 
React front end, Ruby On Rails REST API backend.
The frontend component is located in the client folder.

Try it live at: https://obscure-springs-73090.herokuapp.com/
![alt text](https://i.imgur.com/ymupNbC.png "Website")

## Requirements

* Frontend: NodeJS
```
sudo apt install nodejs -y
```

* Backend: Ruby 2.5.3, Rails 5.2.1

```
\curl -sSL https://get.rvm.io | bash -s stable --ruby
rvm install 2.5.3
rvm use ruby-2.5.3
```

## Running
* Open two terminal windows, in the first run:
```
git clone https://github.com/MiloTodt/tictac.git
cd tictac
gem install rails
bundle install
rake db:setup
rails server -p 3001
```
![alt text](https://i.imgur.com/gSktGvX.png "Back")

* In the second terminal, navigate to /tictac/client
```
cd client
npm start
```
![alt text](https://i.imgur.com/Y3v6UwB.png "Front")

* This page should open in your browser
![alt text](https://i.imgur.com/ymupNbC.png "Website")
