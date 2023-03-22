# Art Blocks Starter Template
[![GitPOAPs](https://public-api.gitpoap.io/v1/repo/ArtBlocks/artblocks-starter-template/badge)](https://www.gitpoap.io/gh/ArtBlocks/artblocks-starter-template)

***Note**: This tool is maintained by people of the Art Blocks community and is not affiliated with Art Blocks*

## Quick Start:

This runs on Node with some dependencies. Download or clone the repo, navigate into the directory, and run npm install:

```bash
$ npm install
```

Start the server

```bash
$ npm start
```

View the tool at: http://localhost:3000

## Creating A New Piece:

1. Create a new .js file in `public/js/pieces/`
2. Refresh or navigate to `localhost:3000`.
3. Your piece should show up in the pieces dropdown with the same name as the JavaScript file.
4. Click the piece in the dropdown and you will be navigated to `localhost:3000/<piece name>` which should display your piece.
5. At this point you can start modifying the JavaScript file you created to make your piece.

## FAQ

### How do I connect to the token hash value?
Art Blocks will pass you a `tokenData` object which will have an attribute called `hash`. You can access this value by typing `tokenData.hash` and manipulate it as you see fit.

Check out the `example.js` in the public/js/pieces folder for an applied example with comments. 
