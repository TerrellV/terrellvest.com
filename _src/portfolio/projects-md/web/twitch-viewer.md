Track the status of various twitch channels and see basic info about their stream. Add a channel to the app to see its current status.

## Build

Angular (Custom Directives, Factories, Services, Routing), Grunt, Sass, Github Pages

## Design

Overall layout and page design was created in Illustrator.

This app is heavily influenced by Google's Material Design Light Framework. With that said, an overwhelming majority of the application was written without the use of the framework specific code. I especially liked the way Google displayed information via "cards" so I used a similar design for the channels.

This app is accessible on devices of various screen sizes. Open it on a mobile device to see the difference.


## Challenges

### Asynchronous JavaScript
Making network requests via JavaScript can throw someone off if they aren't used to it. This was my first foray into more complex Asynchronous JavaScript. I become much more comfortable with handling multiple promises.

### Repeating Components
Angular's built in directives weren't sufficient enough to create the functionality I required. Fortunately I was able to write custom directives that handled the logic for each "card" in the app.
