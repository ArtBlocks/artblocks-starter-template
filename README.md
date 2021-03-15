# Artblocks Starter Template
***Note**: This tool is maintained by people of the Art Blocks community and is not affiliated with Art Blocks*

## Getting Started

### To run the app:

1. Run `npm install`. This will install all the dependencies needed to run the tool.
2. Run `npm start`. Will start up the server.
3. Open up `localhost:3000` in your web browser of choice.

### To add a new piece:

1. Create a new .js file in public/js
2. Restart the server by hitting CTRL-C and typing `npm start` again.
3. Refresh or navigate to `localhost:3000`.
4. Your piece should show up in the pieces dropdown with the same name as the JavaScript file.
5. Click the piece in the dropdown and you will be navigated to `localhost:3000/<piece name>` which should display your piece.

## FAQ

### How do I connect to the token hash value?
Art Blocks will pass you a `tokenData` object which will have an attribute called `hash`. You can access this value by typing `tokenData.hash` and manipulate it as you see fit.

Check out the `example.js` in the public/js/pieces folder for an applied example with comments. 
