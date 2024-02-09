# Package Delivery App Backend

## Overview

This repository contains the backend code for a Package Delivery App. The backend is responsible for managing various functionalities related to different user roles within the application, including Admins, Observers, Riders, and Customers.

## Routes or Endpoints

### Admin
- `/admin/adminregister`:Register an admin.
- `/admin/avcustomers`: View all users.
- `/admin/avriders`: View all riders.
- `/admin/armuser`: Remove a user.
- `/admin/amsgcust`: Message a customer
- `/admin/amsgrider`: Messaage a rider
- `/admin/amsgobserver`: Message an observer
- `/admin/amsguser`: Message all users.
- `/admin/avmessages`: View an admin's messages
- `/admin/avcudeliv`: View the delivery details of a particular user.
- `/admin/avcustdetails/:username`: View the details of a particular customer.
- `/admin/avriderdetails/:username`: View the details of a particular rider

### Observer

- `/obregister`: Register as an observer.
- `/obse/obvriders`: View all riders.
- `/obse/obsvmessages`: View observer's messages
- `/obse/obvcustomers`: View all customers.
- `/obse/obvcudeliv`: View delivery details of a particular rider.

### Rider

- `/rider/rideregister`: Register as a rider.
- `/rider/ridermsgcust`: Message a customer.
- `/rider/ridervmessages`: Request for a rider's messages
- `/rider/rideliaccept`: Accept a delivery.
- `/rider/riderlocation`: Record the rider's location.

### Customer

- `/cust/custregister`: Register as a customer.
- `/cust/custmsgrider`: Message a rider.
- `/cust/custdelireq`: Request a delivery.
- `/cust/custvmessages`: See a customer's messages
- `/cust/custlocation`: Record the customer's location.


