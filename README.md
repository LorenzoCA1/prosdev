
[![Build Status](https://travis-ci.com/LorenzoCA1/prosdev.svg?branch=Development)](https://travis-ci.com/LorenzoCA1/prosdev)

## About The Project
The project by Team HOLDAP is a rework of a Dental Clinic Appointment System. The team plans to make it a web application for appointment scheduling. The initial goal of the project was to automate and simplify the tracking of the appointments in the clinic by providing a user interface for quick navigation, wherein the secretary can add, edit and delete appointments and view the appointments for all the dentists to see. The goal of our team is to continue the work of the previous team and make improvements. Proposed improvements include online capabilities of making appointments for the secretary and online capabilities of making appointment requests for the patients. test

### Built With

* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
* [Mongodb](https://www.mongodb.com/cloud/atlas)
* [Node](https://nodejs.org/en/)

## Getting Started


### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation
 
1. Clone the repo
```sh
git clone https://github.com/feebeef/prosdev.git
```
2. Install NPM packages
```sh
npm install
```
## Usage
You must go to project repo in command line and run:
```sh
node server.js 
```
Enter link in browser:
> If secretary account
```sh
http://localhost:3000/secretaryLogin
```
>> Log in with these secretary credentials
```sh
Username : regpagetest
Password : regpagetest
```
> If patient account
```sh
http://localhost:3000/patientLogin
```
>> Log in with these patient credentials
```sh
Username : testpatient
Password : password
```
> If admin account
```sh
http://localhost:3000/adminLogin
```
>> Log in with these admin credentials
```sh
Username : admin
Password : regpagetest
```
## Unit Testing

1. Install Python Dependencies
```sh
pip install selenium 
```
2. Run Automated Test Suite
```sh
python testsuite.py
```
## Roadmap

Sprint 1
* Secretary Log-in and Log-out
* Adding, Editing, Deleting Records(Appointments, Doctors and Processes)
* Viewing of Appointments

Sprint 2
* Patient Log-In and Log-out
* Patient requests for Appointment
* Patient View User Appointment Details
* Secretary - Accept/Decline Patient Appointment Request

Sprint 3
* Admin Log-in and Log-out
* Admin can Create Secretary and Patient Accounts
* Admin View All Appointments, Doctors, Patients, Processes and Secretaries
* Patient View Available Dates, Doctors and Processes
* Patient See Appointment History

## Contact

* Avancena, Lorenzo
* Chen, Phoebe
* Dela Cruz, Gino
* De Leon, Thea
* Puno, Enoch
* Sierass, Nathaniel
* Tagle, Kyle
