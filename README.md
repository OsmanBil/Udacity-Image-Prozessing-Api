# Udacity-Image-Prozessing-Api
Udacity - Image Prozessing Api

# Installation
npm install

# Usage
Its a Udacity learn Project

The endpoint to use is http://localhost:3000/api/images
Then you have to write the filename, width and height

Please use this format: http://localhost:3000/api/images?filename=fjord&width=300&height=300


# Tests
This project includes automated tests to ensure the proper functioning of the endpoints. The tests are designed to verify specific behaviors and response codes.

Test with: 
npm test


Some test cases are expected to return a response with a status code of 200. These tests are aimed at verifying the successful execution and expected behavior of the endpoints. A 200 response indicates that the request was successfully processed and the expected data or result was returned.

Other test cases are expected to return a response with a status code of 400. These tests are designed to check for error handling and validation scenarios. A 400 response typically indicates that the request was malformed, contained invalid data, or violated some validation rules. By testing for these scenarios, we ensure that the endpoints correctly identify and handle such situations, providing appropriate error messages or responses.