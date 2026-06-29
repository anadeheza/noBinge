# noBinge

## Why this?
I have been struggling with EDs for years now, first with anorexia, then bed, and well, i just thought that if i had found an app like this, perhaps, i could've got away from that dark place earlier.

Anyways, i hope i can launch this in the future (of course a more polished version) so that it can help people out in their recovery

## How did i do it?
For backend i used Express with Typescript, for the frontend, React with Typescript. I used these as they are the frameworks that i am more familiar with since i have learnt how to use them at school. :)

## Features
The features are pretty straightforward and simple.

The very first thing you'll see is a Login page, if it's the first time you get to my site, just press sign up as in any other website and create an account

That'll take you to the dashboard, with 4 different icons (that roll on hover!), these are:

### Diary 
1st icon (with the paper)
<br>
Here, you'll see a calendar and a space for writing a note for that day, you can add feelings, thoughts, and the mood of the day by clicking on the flowers (each one has its description bellow it when you click it, they go from horribly to exceptional)

### Meditation
2nd icon (the one with the meditating guy)
<br>
Here, you'll find a circle that shrinks and expands guiding you through a breathing cicle, that's basically it, it is meant to help the user relax and get to stop their intrusive thoughts for a moment, i believe it is really helpful :)

### Music player
3rd icon (with the vinyl)
<br>
This'll open a side bar with a music player, it has only 3 tracks, some longer than others, only instrumental though, they are ment to be calming and warm.

### Meal tracker
4th icon (with the plate)
<br>
A no-calorie meal tracker. Instead of analizing food based on its calories, here, you can describe what you feel when eating a specific food at a specific time, that, i feel is helpful since you get to know yourself better, acknowledge your fear, pleasure, guilt and more by just typing your emotions in a second.

> Icon images are not mine, they were downloaded from pixaby.

## Deployment
I do not have my own server yet (i will be soon though), so i used Render for the backend, Turso db for the database and Vercel for the frontend, quite a mess but it worked for me.

### AI Use
> I used Claude AI for a few things; first, for managing the database since i found some difficulties with the migrations, i ended up going for libSQL using Turso db, i also used it to make the icons roll since i literally had no idea how to do that and i tried searching and didn't quite get it (even so, i did not ask for the code itself but for the logic to implement it, then, i asked about a few syntaxis errors and corrected them with Claude AI)