# Package Delivery App Backend

## Overview

This repository contains the backend code for a Package Delivery App. The backend is responsible for managing various functionalities related to different user roles within the application, including Admins, Observers, Riders, and Customers.

MongoDB is used for data storage. You can choose between mongoDB Atlas and mongoDB community edition

### Roles: 
- Admin: This is the admin of the package delivery system. The admin is able to view all available customer and rider
details and also send messages to all customers.

- Observer: This is the user that has some priviledges of the admin and is able to assist the admin in daily tasks
such as monitoring deliveries in progress and investigating a particular delivery.

- Customer: This is the customer of the package delivery system. Some of the abilities of the customer are making of delivery requests, send messages
to a rider and cancel delivery requests

- Rider: This is the delivery person of the package delivery system. This person is able to accept delivery requests,
reject delivery requests and message customers.




## General Schema
This is the general schema for Admins, Riders, Customers and Observers:

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


## Routes or Endpoints

### Admin
- `/admin/adminregister`:Register an admin.


Example:

```javascript
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
```
- `/admin/avcustomers`: View all customers.


Example:
```javascript
async function getCustomersMessages(username) {
    try {
       const messages = await axios.get(`https:domain/admin/avcustomers`)
       customerMessages = messages.data
    }
    catch(error) { 
       console.log(error.message)
    }
} 
```
- `/admin/avriders`: View all riders.


Example:

```javascript
async function getCustomersMessages(username) {
    try {
       const messages = await axios.get(`https:domain/admin/avriders`)
       customerMessages = messages
    }
    catch(error) { 
       console.log(error.message)
    }
} 
```
- `/admin/armuser/:username`: Remove a user.



Example:

```javascript
async function getCustomersMessages(username) {
    try {
       const messages = await axios.get(`https:domain/cust/custvmessages/$ {customerusername}`)
       customerMessages = messages
    }
    catch(error) { 
       console.log(error.message)
    }
} 
```
- `/admin/amsgcust/:username`: Message a customer
   See the messaging example at the ending of the document
- `/admin/amsgrider/:username`: Messaage a rider
   See the messaging example at the ending of the document
- `/admin/amsgobserver/:username`: Message an observer
   See the messaging example at the ending of the document
- `/admin/amsguser`: Message all users.
- `/admin/avmessages/username`: View an admin's messages
- `/admin/avcudeliv/:username`: View the delivery details of a particular user.
- `/admin/avcustdetails/:username`: View the details of a particular customer.
- `/admin/avriderdetails/:username`: View the details of a particular rider

### Observer

- `/obregister`: Register as an observer.
  Same method as the admin registration 
- `/obse/obvriders`: View all riders.
- `/obse/obsvmessages/:username`: View observer's messages
- `/obse/obvcustomers`: View all customers.
- `/obse/obvcudeliv/:username`: View delivery details of a particular rider.

### Rider

- `/rider/rideregister`: Register as a rider.
  Same method as the admin registration 
- `/rider/ridermsgcust/:username`: Message a customer.
- `/rider/ridervmessages/username`: Request for a rider's messages
- `/rider/rideliaccept`: Accept a delivery.
- `/rider/riderlocation`: Record the rider's location.
- `/riderpending/:username`: Get a rider's pending delivery requests

### Customer

- `/cust/custregister/`: Register as a customer.
  Same method as the admin registration or the rider registration
- `/cust/custmsgrider/:username`: Message a rider.
- `/cust/custdelireq`: Request a delivery.
- `/cust/custvmessages/:username`: See a customer's messages
- `/cust/custlocation`: Record the customer's location.



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

###### Sending a message

```javascript

import axios from 'axios'

/* 
  Rider sending a message to  a customer

  Get the customers messages first and update it with the new message

*/

// You can use State here depending on your app
var riderusername = "abitoshaker"
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











