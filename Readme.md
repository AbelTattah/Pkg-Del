Hi,
This is the backend of my Package Delivery App

Routes or endpoints:
Admin:
/admin/avcustomers: This route enables the admin to view all users
/admin/avriders: This route enables the admin to view all riders
/admin/armuser: This route enables the admin to remove a user
/admin/amsguser: This route enables the admin to message all users
/admin/avcudeliv: This allow the admin to view the delivery details 
of a particular user.


Observer:
obse/obregister: This route enables the observer to register
obse/obvriders: This route enables the observer to view all riders
obse/obvcustomers: This route allows the observer to view all customers
obse/obvcudeliv: This route allows the observer to view delivery details of
 a particular rider


Rider:
rider/rideregister: This route enables the rider to register
rider/ridermsgcust: This route allows the rider to message a customer
rider/rideliaccept: This route allows the rider to accept a delivery
rider/riderlocation: This route allows the recording of a rider's location


Customer:
cust/custregister: This endpoint allows the customer to register
cust/custmsgrider: This endpoint allows the customer to message a rider
cust/custdelireq: This route allow the customer to request a delivery
cust/custlocation: This route allows recording of the customer's location