This API is running on node version:v16.14.0

1.  install all the dependencies for api
    command : npm i
2.      import collection using bellow link
    https://www.getpostman.com/collections/04b4ed4923769f3b6633
3.  this api is hosted on Heroku so we can test this on web
    Base link :
    https://mymoviesbooking.herokuapp.com/
    Routes:

    1.  user sign up =
        https://mymoviesbooking.herokuapp.com/api/users/signup

    i) it is used to sign up with new user
    ii) please encrypt the bellow object using
    "https://mymoviesbooking.herokuapp.com/api/enc/getdata"
    to get request body for this api
    sign up plain text body :
    {
    "name": "johhny jack",
    "email": "johnyjack@mail.com",
    "password": "Aa@12345678",
    "age": "18"
    } 2) Sign in =
    https://mymoviesbooking.herokuapp.com/api/users/signin
    i) it is use to sigin and generate the token
    ii) please encrypt the bellow object using
    "https://mymoviesbooking.herokuapp.com/api/enc/getdata"
    to get request body for this api
    sign in plain text request body:
    {
    "email": "kailash@mail.com",
    "password": "Abc@12345"
    } 2) get movie =
    https://mymoviesbooking.herokuapp.com/api/movies?location=Goregaon
    i) it is used to give movie details via location, movieName,
    genre,isShowRunning,ticketavialable ,
    we can change the preference by chaning the values on postman 3) get movie location =

        https://mymoviesbooking.herokuapp.com/api/movies/getlocation

        will give you list locations where movies are avialble

    4.  book a ticket (PROTECTED ROUTE) :

        https://mymoviesbooking.herokuapp.com/api/movies/bookticket

        i) it is use to book movie ticket
        ii) please encrypt the bellow object using
        "https://mymoviesbooking.herokuapp.com/api/enc/getdata"
        to get request body for this api

            book ticket plain text body:
            {
            	"movieName": "Mission impossible",
            	"location": "Goregaon",
            	"price": 2,
            	"noofticket": 2,
            	"movieDate": "2020-01-01",
            	"movieTime": "12.12pm",
            	"cardDetail" : {
            		"cardNumber" : "111111111111",
            		"cvv" : "123",
            		"expDate":"12-22-2022"
            	}
            }

        iii) please use token which you have received via sign in or sign up it is valid for
        hours
        iv) and paste token in Authorization section under Headers in postman
        followed by Bearer word
        eg: Bearer testesttesttesttoken

how to encrypt data

1. please hit https://mymoviesbooking.herokuapp.com/api/enc/getdata api
2. to encrypt your json data open body section and paste your json if front of
   data key

eg: {
"type": "enc",
"data": {
"name": "johhny jack",
"email": "johnyjack@mail.com",
"password": "Aaa@12345678",
"age": "18"
}
}

3. press send keyafter that you will receive encrypted body
4. you can use this as request body for protected routes

To run the test case

1. you have to run the command npm test from your project
   root directory
