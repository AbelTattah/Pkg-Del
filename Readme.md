# Package Delivery App Backend

## Overview

This repository contains the backend code for a Package Delivery App. The backend is responsible for managing various functionalities related to different user roles within the application, including Admins, Observers, Riders, and Customers.

## Routes or Endpoints

### Admin
- `/admin/adminregister`:Register an admin.
- `/admin/avcustomers`: View all customers.
- `/admin/avriders`: View all riders.
- `/admin/armuser/:username`: Remove a user.
- `/admin/amsgcust/:username`: Message a customer
- `/admin/amsgrider/:username`: Messaage a rider
- `/admin/amsgobserver/:username`: Message an observer
- `/admin/amsguser`: Message all users.
- `/admin/avmessages/username`: View an admin's messages
- `/admin/avcudeliv/:username`: View the delivery details of a particular user.
- `/admin/avcustdetails/:username`: View the details of a particular customer.
- `/admin/avriderdetails/:username`: View the details of a particular rider

### Observer

- `/obregister`: Register as an observer.
- `/obse/obvriders`: View all riders.
- `/obse/obsvmessages/:username`: View observer's messages
- `/obse/obvcustomers`: View all customers.
- `/obse/obvcudeliv/:username`: View delivery details of a particular rider.

### Rider

- `/rider/rideregister`: Register as a rider.
- `/rider/ridermsgcust/:username`: Message a customer.
- `/rider/ridervmessages/username`: Request for a rider's messages
- `/rider/rideliaccept`: Accept a delivery.
- `/rider/riderlocation`: Record the rider's location.
- `/riderpending/:username`: Get a rider's pending delivery requests

### Customer

- `/cust/custregister/`: Register as a customer.
- `/cust/custmsgrider/:username`: Message a rider.
- `/cust/custdelireq`: Request a delivery.
- `/cust/custvmessages/:username`: See a customer's messages
- `/cust/custlocation`: Record the customer's location.

## General Schema

```
{
     FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  UserName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Messages: {
    type: Array
  }
}
```

### General Admin and User(Riders and Customers) Document Format

```
{
       FirstName: "John",

       LastName:"Scott",

       UserName:"scott123"

       Email: "..scot@hotmail.com"

       Messages: []
}
```

## Usage

### Using Axios (Recommended)

#### Usage example

###### Registering a rider
In your App:

```
   javascript

// Registering a Rider

import axios from 'axios'

const signUp = async( firstname, lastname, username, email ) => {
    try {

    // The domain will be given by the PM
     const newrider  =  await axios.post(' https:domain.com/rider/rideregister',
         {
               FirstName: firstname,

               LastName: lastname,

               UserName: username,

               Email: email,

         }
         )
    }
    catch(error) {
        console.log(error.message)
    }
}

// function call

signUp("Ebenezer","Acquah","seniorman","email@outlook.com")


```


###### Sending a message

```
   javascript

import axios from 'axios'

/* 
  Rider sending a message to  a customer

  Get the customers messages first and update it with the new message

*/

// You can use State here depending on your usecase
var rider's username = "abitoshaker"
var customerMessages = []
var newMessage = "Hi"
var conversation = []

//Get customers messages
async function getCustomersMessages(username) {
    try {
       const messages = await axios.get(`https:domain/cust/custvmessages/$ {customerusername}`)
       customerMessages = messages
    }
    catch(error) { 
       console.log(error.message)
    }
} 

function filterByUserName(array, username) {
    return array.filter((obj) => obj.User === username);
}

// Mutate customers messages array
function mutateArray() {
    //Check if the user already has a conversation
    conversation = filterByUsername(customerMessages,username)

    if (conversation.lenth === 0) {
        customerMessages.push({
            UserName: username
            Chats:[
                {
                    m:"Hi"
                    time:"12:00 PM"
                }
            ]
        })
    }

    else {
        customerMessages[0].Chats.push(
            {
                m: newMessage
                time: "12:00 PM"
            }
        )
    }
}

//Send the Message

async function sendMessage() {
    getCustomerMessages()
    mutateArray()
    try {
        const messsage = await axios.put(`https://domain.com/rider/ridermsgcust/${customerusername}`)
    }
    catch(error) {
        console.log(error.message)
    }
}



```

Use the various routes with axios or the fetch API to make various requests depending
on your use case.

Happy Hacking.










