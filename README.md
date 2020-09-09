This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running Locally

1. Clone the repo to your localhost
2. Run command `npm run npm-install-backend` to install NodeJS NPM dependencies
3. Run command `npm run npm-install-frontend` to install React NPM dependencies
4. Run command `npm run start` to start both the backend and the React webapplication

## Solution design

### Server side

The server side is a very basic service with 1 route, and flexibility of optional query parameters that influence the type of results obtained from the CSV file that comes as part of the repo

### Client Side

The client side is a basic create-react-app template with a custom container and form that constructs the request to the service

## Future considerations

The following standard practices were omitted due to time constraints, but would be implimented if had sufficient time:

1. The CSV data should be read in "real time" instead from a hard coded CSV file in the repo
1. Securing the backend with a JWT or OAuth 2.0 security strategy
2. Securing the front end with basic authentication / authorization
2. Cleaner code / conistency styling (linter, TypeScript, whatever a team agrees upon)
2. Better RESTful principles (versioning, HATEOUS, server-side pagination)
3. Useful logging on both the server side and front end side
4. Portability by leveraging environment variables
5. Unit Testing at a bare minimum
6. Better breakdown of the projects components (more containers, more React components, Service side Route/Service/DAO model)
7. Better error handling / user response messaging
8. Better user experience of being able to enter an address instead of the latitude and longitude in order to "plan ahead" a visit to a Food Truck located in a different location
9. Ability to query Google and get the restaurants information as part of the result options (website, phone number, hours of operations, etc...)
10. Richer search criteria and result visibility / interaction
