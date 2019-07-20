# Solving Conway's Game of Life

My process for solving the Game of Life mimicked Polya's problem solving technique. First I had to understand the problem, then I worked on a plan, I wrote the code for that plan, and looked back after it was done to optimize it and fix bugs. Going through that process step by step...

# Understanding the Problem

I had never heard of this coding challenge before and didn't understand what was being asked of me so I spent some time on Wikipedia first to understand what the rules for the simulation were. I find the way they're written on Wikipedia is a little awkward so I ultimately boiled the rules down to two things:

1. If a cell has two living neighbors and is alive itself, it stays alive. I
2. If a cell has three living neighbors, it will be alive next round

Understanding that gave me what I needed to know. However, I took a little more time to see working demos of other peoples' projects so I'd have an idea of what mine should look like when working correctly.

# Devise a Plan

Understanding the rules of the simulation made the first-pass solution fairly obvious: contain a boolean in a 2D/Matrix array for each cell. Each "generation", iterate over that matrix and calculate the above two rules for every cell. I knew the optimization would need work but I wanted to start with a working solution first.

I decided to make this app in React, since I am the most comfortable with it and I wanted to learn how to better optimize component rendering in addition to using an interval within a React app (something I've never done before). I initially planned to use Redux for easier state management across the cells but ultimately decided it was too much boilerplate for the scope of the app. I instead decided to use a reducer hook to mimic a redux store but without all the overhead.

# Carry out the plan

The above plan only took me about a day to implement. By the end of day 1, I could run the simulation but only at smaller grid sizes (less than 50x50) and it had no UI pieces. However, I had my reducer shop all setup with all the data I'd need to build everything out. That gave me the foundation I would need to jump start the other features I intended to create.

# Look back

This is really where the meat of the project was for me. I quickly came up with an optimization idea but it took me a full day to implement: At each generation step, only check cells if they or their neighbors had changed. My first plan to implement this was poor:

- For each cell, look to its upper left corner and for that cell, see if it or any of its neighbors has changed. If so, add it to a list.

This approach was clumsy and difficult to implement and I finally came up with a much simpler solution:

- If a cell changes, add it and its neighbors to a list.

I updated the algorithm with these optimizations and found I could run up to a 100x100 grid pretty smoothly. Interestingly, because of this optimization, you can see the animation chug for a brief moment when it starts then immediately boost performance. That's because with a random seed, almost every cell changes in the first couple generations but then areas start to stabilize and thus the optimization prevents them from being re-calculated!

Lastly, I spent a day adding UI elements and trying to polish the appearance of the app. I added inputs to control the size of the grid and speed of the simulation, pause and play, and the ability to refresh the seed (all things that were simple to do with the work I put into the useReducer hook!)
