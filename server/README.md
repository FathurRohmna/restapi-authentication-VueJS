# SIMPLE REST API 

using ExpressJS to allow a registered user

1. Authentication API (/api/login, /api/register)

Both of these APIs use the post method. And 
returns a secret value generated via JsonWebToken with userId payload.

response(authentication): data: { 
            user: userType, 
            token: string, 
            refreshToken: string, 
            expiresIn: number
          }

For the register(/api/register), its can check validation whether there is the same email name as another user. In addition, it is also connected to the database. So there wil be checking through the database.

login(/api/login), checking existance the email data then vaidate the password using argon2. If there an error then the return is Exceptions Error.

2. public(/api/public), everyone can access this API.

3. pivate(/api/private), for the policy access iam using JsonWebtokenMiddleware, getting from Header when user send a request to the router then the token stored in localStorage will be sent with a request. If there are no problem when decrypting proccess, it will continue to the next access.

