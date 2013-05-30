Magic The Gathering for Node.js
===============================
Alpha 0.1

About
-----
MTG Node, is a little experiment of mine with node.js and
socket.io. My aim is to create a little web application
on which you can play Magic the Gathering with a friend
in realtime. My intention is not to enforce the rules of
the game whatsoever but just to provide a digital interface
giving the oppportunity to play as in real life.

The application is still pretty ugly and basic but does
its job.

Disclaimer
----------
This application is purely experimental and is not
official. Every scans are displayed from magiccards.info.
Therefore, do not overuse the application as it might harm
the site if too many requests were to be executed.

The application is not yet secured in any way so you should
use it on a LAN only.

Commands
-------------
Two users for the moment :
Yomgui (mdp : test)
Nibor (mdp : test)
If you want to add more use sqlite3 interface on
database/mtgnode.db

Possibility to create decks (/deck-builder).
Choose a set and then : 1 click to add or remove cards.

Game interface :
* drag your cards to move them.
* cards in your hand have a blue border.
* double click to reveal or conceal them.
* right click to tap them.
* use the life counter to update your hp.

The controls are still pretty basic and you should try and
avoid playing cards using tokens or dealing with the library
for the time being.

Dependencies
------------
	Node.js
	Socket.io
	Express
	Jade
	Sqlite3
	Cheerio
	Request


Start
-----
Like any express application, cd to application folder and
then 'node app'. Be sure to have installed dependencies with
npm before, globally or not, because the current build does
not include them.

Then access it through a web browser (port 3000 by default).

