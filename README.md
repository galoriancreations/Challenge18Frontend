  This is Challenge18 Frontend (running Vue/Nuxt) served on Vercel.

<!-- GIthub Branch Flow  -->

Main -> Production
Staging -> Cloud Storage
Development --> LocalHost
Teams Branches ---> LocalHost
Team Branch Fetcher ---> LocalHost

<!-- Github Role Flow -->

Only Team Leaders Can Merge Branches !!
Every time before you push something you make a pull request  !!
We work only on fetcher barnches never work on development/team Branches !!

<!-- Teams Branch Flow -->

1. Go to the fetcher branch that you want to merge. 
2. Check the mission on your localhost.
3. Make code review on the code and check that we don`t have any bugs. 
4. Try to fail the system on purpose to check the system ability.

After you finish all the system test go back to the "TEAM BRANCH".

git merge --no-ff <fetcher-branch-name>
git log or git log --graph 

If this fetcher branch commit more than one time you will need to rebase all the commits.

git rebase -i <fetcher-branch-name>

All what you see on pick you need to squash to one commit but you need to make it very Carefully and check very well which commit you squash,
Squash will take all the commit and make it one commit under new commit that you will need to set 
THE NEW COMMIT NEED TO INCLUDE THE TEAM NAME AND THE NAME OF THE FETCHER THAT WE DEVELOP !!!

After you squash all the commit to one commit you can push it to the team branch.

<!-- Fetcher Branch Flow -->

We Work Only On Fetcher Branches

<!-- Stage: 1 -->

When you get a new task you will need go to your branch Team
Example:

git switch <team-branch-name>

<!-- Stage: 2 -->

After you on the branch of the Team you need to open a new branch with the name of your team and the name of the new mission.
Example:

git checkout -b Team-1-Navbar

Now you can start working on your new mission…

<!-- Stage: 3 -->

When u finish your mission check very well your bugs before commit and push make some testing to ensure that all the code is write well,
after that you can start commit and pushing.
Example:

git commit -m "# Description of the Mission
* Section of what you change in the code
* Reference how the logic component need to work
* What the main goal of the mission.
* Ticket: https://trello.com/c/ftUWJGO3
"
git push origin <team-branch-name>

All Committed Message Have To Include The Mission Ticket

The Ticket you can get from the cart of the mission in the Trello, Click on your cart mission in your team board and on the right side where is all the options to design the cart you will see on the last option from bottom Share, Click on the Share and copy the Link to this card: Ticket: https://trello.com/c/ftUWJGO3