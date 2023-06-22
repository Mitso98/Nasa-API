Nasa images and videos API:
    API  GET https://images-api.nasa.gov/search?q=sun
    # Required:
        provide user authuntication system using JWT
        Favorites application allow user to add remove favorites
        store requests for further use
    # Tools:
        MERN stack with Redis optional
    # Output:
        Authuntication system (/api/auth):
            Models:
                User model:
                    name (required string)
                    email (required string unique)
                    password (required string)
                    isVerfied (default=false boolean)
                    created_at (default=Date.now() Date)
                    favorites [Request _id]
                Request: a schema that would match Nasa API response.

            Controllers:
                # register endpoint to obtain user inputs
                    implement validations with express-validator
                    email must be unique
                    passwords must match
                    password must be strong
                # verify email: 
                    you must verfiy your email by checking your inbox for a url wit token that has been sent to you.
                    once you clicked this tokin it's controller will mark you as verfied
                # Rate limiter for sending email verfication:
                    using Redis to track which IP is sending requests so we can pass data like remaning requests and blocking time. 
                # login:
                    you must be verfied to login
                    once logged in the endpoint sends 200 status and user object in json, and http only cookie wih JWT token
                # logout: 
                    clears the token from browser
                # favorites with pagination:
                    geta all favorites 
                    cach response with Redis with user id as a key
                    remove favorite with id
                    clear fav from redis
                    add favorite with id
                    add fav to redis
                # Nasa with pagination:
                    fetch API with a query
                    cache respone with a key of query:page_size:page
                    save response in mongo if dose not exist for future use
            Middlewares:
                Authuntication middleware:
                    check if reuest does have a token 
                    verfiy JWT token and assighn req.user = user object if no error 
                Error middleware
                    to avoid code replication
