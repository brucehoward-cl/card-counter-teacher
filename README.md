# card-counter-teacher
Project Name:   Card Counter Teacher
Description:    Counting Cards is easy in principle, but difficult in practice. But practice is what it takes! This is a website to learn how to count cards at blackjack
Table of Contents:
    Index   where all the action is!
    Rules   describes blackjack rules as well as how to count cards

Installation:   No packages or external software needed.

PROJECT REQUIREMENTS:
1. Your project is responsive to different devices and/or browser sizes and improves the user experience in some way
    - I have 2 media queries along with the default styling applying to small screens. 

2. Your project includes at minimum 3 custom-written CSS elements (selectors, classes, etc) located in a .css file which are applied to your HTML elements
    - There a plenty of examples of this in style.css. I also used a 'canned' file (normalize.css) to reset all of the stylings so all browsers start from the same place. 
    - I have both CSS id selectors as well as element selectors and class selectors.

3. Your project includes JavaScript in a separate .js file
    - The most complex part of this entire website is the js file (carddealer.js).

4. Your code have comments that document major sections of your code to make it easier to read

5. Your project code is uploaded to your GitHub account, in its own repository, with at least 5 commits
    - as of this moment, there are 20 commits. I like GitHub. It gives me a good feeling that even if my computer crashes I will still have my project.

6. It must include a README file located at the top level directory of your project that includes
    - No special instructions to run this project. 

FEATURE REQUIREMENTS (only 3 are needed):
1. A navigation menu that collapses into a responsive mobile-friendly menu (such as a “hamburger” menu)
2. Create a JavaScript function whose return value is used in your site. The function must be triggered by user action (ex: clicking a button).
3. Use JavaScript to perform math operations and display the result on your site
    - 'function incrementTotal' increments each players total score and populates the appropriate player's label. 
4. Create and populate a JavaScript array, then retrieve and display one or more values from it
5. Use “:nth child” CSS to style a series of elements (for example, change the color of every 2nd item in a list)
    - There are 3 different instances of "nth child" used to draw the playing card on the screen. 
        (div.card span:nth-child(-n+2), div.card span:nth-child(3), div.card span:nth-child(1n+4))


