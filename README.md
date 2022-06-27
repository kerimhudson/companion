## Structure

This project was built using Next.js, TailwindCSS, and DND-Kit.

I chose to use TailwindCSS for styling simply because it's what I find the fastest to work with for styling, especially considering the time sensitivity of this project. Next.js is just a really easy boilerplate for working with React, especially with Typescript as a lot of the typing hassles have been configured for you. I used DND-Kit which was a new library for me. I had used react-beautiful-dnd in the passed and often leant on it because of it being produced by Atlassian, however I'm not a fan of it requiring strict mode off on latest versions of React - as it can lead to unexpected behaviour.

# Issues

- Configuring the motion detection was pretty difficult because of the requirements around it. I was working primarily off Safari on iOS which requires the user to press a button to provide permission - you can't provide a prompt straight away. So I added a small heading on mobile to try and fix this. The sensitivity likely needs some tweaking too.

- The drag and

- The mobile prompt for device motion still shows up on desktop even if it's not a mobile device which causes issues when clicked.
