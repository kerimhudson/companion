## Structure

This project was built using Next.js, TailwindCSS, and DND-Kit.

I chose to use TailwindCSS for styling simply because it's what I find the fastest to work with for styling, especially considering the time sensitivity of this project. Next.js is just a really easy boilerplate for working with React, especially with Typescript as a lot of the typing hassles have been configured for you. I used DND-Kit which was a new library for me. I had used react-beautiful-dnd in the passed and often leant on it because of it being produced by Atlassian, however I'm not a fan of it requiring strict mode off on latest versions of React - as it can lead to unexpected behaviour.

## How to run

1. Clone the repo down
2. Install packages using yarn (ideally) `yarn install`
3. Run `yarn dev` to start the local development server

## Functionality

The app can allow you to edit a single colour, lock as many colours as you want when randomising, and move colours around. You can click the share button to generate a shareable URL to share your colour palette with someone you know. You can click the shuffle button to shuffle the colours, or shake on mobile (tested only on iOS in Safari).

The colour palette uses chroma.js under the hood with their bezier functionality to try and create a palette which does work well together.

## Issues

- Configuring the motion detection was pretty difficult because of the requirements around it. I was working primarily off Safari on iOS which requires the user to press a button to provide permission - you can't provide a prompt straight away. So I added a small heading on mobile to try and fix this. The sensitivity likely needs some tweaking too.

- The drag and drop on mobile and desktop only works when the three-dot drag area is selected. This isn't always the cleanest UX but - with the time restrictions - still provides a basis for the functionality.

- The mobile prompt for device motion still shows up on desktop even if it's not a mobile device which causes issues when clicked.

- The sharing API isn't the best right now. I wanted to try and avoid saving it to a database to create a shareable link, so decided to use msgpack to encode it into a url parameter and pass it that way. It does work although there's a slight hacky fix at the moment because of how Next.js handles server-side rendering. It would work much better if this was moved into getStaticProps, and if it synced the URL as changes happened throughout the app.
