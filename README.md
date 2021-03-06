# Maps API

## Description
This is a repository to practice building RestFul API endpoints which can be used by a frontend UI.
The aim is to use this repository as a source of learning and experimentation both in how to structure & write
endpoints but also how to build effect Unit Tests using Mocha & Chai.

## Getting Started

1. Clone repository
2. npm run clean
3. npm run test
4. npm run dev
5. Make Endpoint calls using browser or Postman

## Current endpoints

### Roads

1. Get Road

    HTTP Verb: **GET**

    URL: localhost:3000/roads/{roadID}

2. Get Roads within Bounding Box

    HTTP Verb: **POST**

    URL: localhost:3000/roads/{bbox}

3. Get Roads within Bounding Box based on OPEN status

    open - true > Road is open

    open - false > Road is closed

    HTTP Verb: **POST**

    URL: localhost:3000/roads/{bbox}/{open}

4. Update a roads OPEN status

    open - true > Road is open

    open - false > Road is closed

    HTTP Verb: **PUT**

    URL: localhost:3000/roads/{roadID}?open={boolean}&notes={string}

### PropertyListings
