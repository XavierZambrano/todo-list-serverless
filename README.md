# Todo List Serverless Application

This is a basic example of a serverless application using AWS Lambda, API Gateway, and DynamoDB.


## Deployment Instructions

1. Clone the repository:
   ```
   git clone https://github.com/XavierZambrano/todo-list-serverless
   ```

2. Change directory to the project folder:
   ```
   cd todo-list-serverless
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Deploy the application:
   ```
   sam deploy --guided
   ```
   
   Follow the prompts to configure your deployment. The default values in `samconfig.toml` will be used, but you can modify them if needed.

5. Note the API endpoint URL provided in the output after successful deployment.

## Testing the API

[Postman Collection](https://www.postman.com/aviation-astronaut-50702900/workspace/publicworkspace/collection/20926949-ff70640c-0dd2-4c18-af86-c402b1d737cb?action=share&creator=20926949)

## Cleaning Up

To remove the deployed resources:

1. Delete the stack:
   ```
   sam delete
   ```