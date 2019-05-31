# Yaw flight tracker
## General
Yaw flight tracker is a flight tracker webapp that I am using to monitor air traffic above my house. It will be hosted on patolento.com. The system uses [dump1090-mutiability](https://github.com/mutability/dump1090), nodejs, express, and angularjs, to render realtime flight data from an RTL-SDR reciever and an antenna mounted in my attic.
## JSON Structure 
The JSON data used in the app follows this format (from [dump1090](https://github.com/mutability/dump1090/blob/master/README-json.md)):
- hex: the 24-bit ICAO identifier of the aircraft, as 6 hex digits. The identifier may start with '~', this means that the address is a non-ICAO address (e.g. from TIS-B).
- squawk: the 4-digit squawk (octal representation)
- flight: the flight name / callsign
- lat, lon: the aircraft position in decimal degrees
- nucp: the NUCp (navigational uncertainty category) reported for the position
- seen_pos: how long ago (in seconds before "now") the position was last updated
- altitude: the aircraft altitude in feet, or "ground" if it is reporting it is on the ground
- vert_rate: vertical rate in feet/minute
- track: true track over ground in degrees (0-359)
- speed: reported speed in kt. This is usually speed over ground, but might be IAS - you can't tell the difference here, sorry!
- messages: total number of Mode S messages received from this aircraft
- seen: how long ago (in seconds before "now") a message was last received from this aircraft
- rssi: recent average RSSI (signal power), in dbFS; this will always be negative.

## End Points
yaw api data endpoints: https://patolento.com/yaw/api
- /now - get current list of aircraft over the sky (should be same data at https://patolento.com/aircraft.json)
- /?flightnumber - getFlightNumber(fn: string) - returns all aircraft with the flight number specified
- /now/?flightnumber - getFlightNumberFromNow(fn: string) - returns the flight number if available at current time
- /now/?lat,long - getFromLatLon(lat: number, lon: number) - returns a flight at a specificed lat lon, or the cloest one
- /now/?squak - getSquak(squak: number) - return based on a specific squawk number
- /?squak - getAllSquaks(squack: number) - search the whole database for specific squaks

### Example Request
- Current Aircraft overhead
https://patolento.com/yaw/api/now
- search for a flight number
https://patolento.com/yaw/api/fn/JBU1027

## Running the full stack locally
### API
In a terminal change to yaw-server/express, run 'npm install', then run tsc *.ts, then run 'node app.js &'. 

### Socket
In a terminal change to /socket and run 'npm install' and then run 'node server.js'

### Client
cd to /yaw, run 'npm install', then run 'ng-serve --open'

Its important to do this in that order so that the client has the right data available to it. Give the app about 10 seconds to load, if after 10 seconds it doesn't load, inspect the page in Chrome and make sure the socket is listening for the server and the aircraft2 service is listening on localhost:4001.
