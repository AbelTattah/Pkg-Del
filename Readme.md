Hi,
This is the backend of my Package Delivery App

Routes or endpoints:
Admin:
/avcustomers: This route enables the admin to view all users
/avriders: This route enables the admin to view all riders
/armuser: This route enables the admin to remove a user
/amsguser: This route enables the admin to message all users
/avcudeliv: This allow the admin to view the delivery details 
of a particular user.


Observer:
/obregister: This route enables the observer to register
/obvriders: This route enables the observer to view all riders
/obvcustomers: This route allows the observer to view all customers
/obvcudeliv: This route allows the observer to view delivery details of
 a particular rider


Rider:
/rideregister: This route enables the rider to register
/ridermsgcust: This route allows the rider to message a customer
/rideliaccept: This route allows the rider to accept a delivery
/riderlocation: This route allows the recording of a rider's location


Customer:
/custregister: This endpoint allows the customer to register
/custmsgrider: This endpoint allows the customer to message a rider
/custdelireq: This route allow the customer to request a delivery
/custlocation: This route allows recording of the customer's location