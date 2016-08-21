This clock has both a traditional and a [Promodoro]( https://en.wikipedia.org/wiki/Pomodoro_Technique) setting that allows for 25 minute intervals and a task list. There is also a stopwatch tab that will record lap times.

## Build
Angular, Grunt, Sass, jQuery

## Design

In terms of User Experience, I know there are times when animation is complete overkill. However, I still wanted to "see what I could do". The stopwatch animation was interesting because it needed to be played over and over again with a delay; something you can't do natively with css.

### Animation Solution

<div class="num-list-container">
  <ol class="numbered-list">
     <li>Set the second ball animation delay equal to the total duration of the first. In other words, when the first finishes, the second starts.</li>
     <li>Ensure you have two different elements and set their animation-iteration-count to 1.</li>
     <li>Initiate the animation for the left and right ball at the same time</li>
     <li>When both animations are complete, clone and replace both elements.</li>
  </ol>
</div>

The key is that when cloning an element with an animation attached to it, the element will animate as soon as it loads into the DOM. Success!
