# Project Description
This clock app has both a traditional and a [Promodoro]( https://en.wikipedia.org/wiki/Pomodoro_Technique) setting that allows for 25 minute intervals and a task list. There is also a stopwatch tab that will record lap times.

# Used
Angular, Grunt, Sass, jQuery

# Design

## Animation
In terms of User Experience, I know there are times when animation is complete overkill. However, I still wanted to "see what I could do", specifically during the stopwatch timer. This animation was interesting because it needed to be played over and over again. which isn't built in to css. When I first thought about it, I hoped to simply define the animation in keyframes and then set the iteration count to infinite. My problem was starting two animations, one after the other can not be achieved with setting each to infinite. The reason being the delay is only applied to the initial start of the animation. On the second time around the delay no longer exists. Here is how I managed to solve the problem.

<div class="num-list-container">
  <h2 class="list-heading">Steps</h2>
  <ol class="numbered-list">
     <li>Set the second ball animation delay equal to the total duration of the first. In other words, when the first finishes, the second starts.</li>
     <li>Ensure you have two different elements and set their animation-iteration-count to 1.</li>
     <li>Initiate the animation for the left and right ball at the same time</li>
     <li>When both animations are complete, clone and replace both elements.</li>
  </ol>
</div>

Note: when cloning an element that has an animation attached to it via css, the element will animate as soon as it loads in the DOM.

## Colors and Layout
For this I used inspiration from multiple sources. I really liked the dark themes on the Spotify desktop app and the layout and spacing of stock mobile Samsung apps.  The tab layout pulls from the general trend of google material design apps.

<img id="" class="landscape med" src="../../assets/images/clock/first-render.png">
I really liked these visual circles and wanted to animate them

<img id="" class="portrait med" src="../../assets/images/clock/orange-mockup.png">
This was an experimentation with different forms of input. I really don't know why I tried to design my own keyboard when the browser takes care of it on mobile devices.

You will notice that the final design below is pretty far from what I initially began with. What you won’t see is that I created a mockup for every screen in the app. Making decisions early on in illustrator generally saves me from going back and forth in my code.

<img id="" class="portrait" src="../../assets/images/clock/final-mockup.png">

# Challenges

## Timing
This was a great introduction into timing functions and intervals. Dealing with time in JavaScript doesn’t always work as you might expect. Often the execution of code on different devices produces a slight difference in calculations that must be accounted for.

## State management
I also ran into the issue of managing state across separate components. It felt weird. It felt impractical. I was having to code factories and services that were poorly organized.

> How do I separate the vital information from my app into a central location that could be accessed by different components?

The discomfort I felt building this application forced me into improving my overall state management in subsequent projects.

# View
