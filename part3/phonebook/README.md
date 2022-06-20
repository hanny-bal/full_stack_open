# Phonebook Backend
The backend application of the phonebook app from part 3 of fullstackopen. 

**Deployed version:** https://powerful-wave-40337.herokuapp.com/

## How to deploy
For convenience, we want to deploy the app to Heroku from within the subdirectory `backend`. 

To push the app to heroku:
- Go to the repository root `full_stack_open/`.
- Create a heroku app with `heroku create`.
- Push the subtree using `git subtree push --prefix part3/phonebook/backend heroku main`.

To reset the heroku app:
- Go to the repository root `full_stack_open/`.
- Run `git remote rm heroku `.
- Now add the heroku repository with `git remote add heroku https://git.heroku.com/powerful-wave-40337.git`.
- Push the subtree using `git subtree push --prefix part3/phonebook/backend heroku main`.

The logs can be viewed using `heroku logs -t`.