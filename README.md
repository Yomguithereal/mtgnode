#Magic the Gathering for Node.js

Version 0.2

##About
MTG Node is a personal experiment with node.js and socket.io. My intention is to create a simple
web application enabling you to play Magic the Gathering with friends through a web browser. My goal
is not to enforce the rules of the game whatsoever but just to provide a digital interface that could be
played as with real life cards.

The application is still pretty ugly and basic but does
the job.

##Warning
You should use a modern web browser (Chrome, Firefox and Safari would do the trick - forget right away
about Internet Explorer you fool). You should also use a quite modern computer since the game makes use
of 3D rotations and since a old computer will not render the game correctly otherwise.
I will develop fallbacks later on.

Also, note that this application is not secured in any way and should not be used to launch a server on the
Internet. I recommend its use through LAN only.

##Installation
To install the node server, clone this repository and install the dependencies likewise.

```
git clone git@github.com:Yomguithereal/mtgnode.git
cd mtgnode
npm install
```

You can then launch the server. It will be available on localhost:3000

```
node app
```

To create your first user, connect to the server on your web browser and type the following url.

```
localhost:3000/user/create?username=YOUR-USERNAME
```

Then, access the login page through and click on the relevant button to log in.

```
localhost:3000
```

If you want other people to connect to your server (on a LAN, typically), just give them your local IP address
and let them type it on their browser with port 3000.

```bash
#Example
192.168.1.13:3000
```

##Pages
Once connected, you have access to four differents locations.

* A main lobby displaying hosted games and serving as a hub for other pages.
* A deck-builder enabling you to search cards and create decks for your user. (Popular deck format parsing coming soon).
* A game debugging zone (basically, you will play against yourself in a mirrored fashion).

##Game Controls
You are always the bottom player on your screen.

To draw a card, click the deck. Then drag the card where you want.

You also have access to some contextual actions with your right click.

##Main Dependencies

	node
	socket.io
	sails
	domino
