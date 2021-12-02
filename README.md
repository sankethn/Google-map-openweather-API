# Internship-API-task
Google maps javascript API, Open weather API, ExchangeRate API, Google's geocode API, currency-code-map (Library).

This is a React App that shows the weather, the current location on the google map and currency exchanges using the user's location.

* It uses Javascript's GeoLocation to get the user's location and passes the coordinates to Google maps javascript API. 
* The Google maps API uses the coordinates and shows the location on the map to the user.
* Then using Google's geocode API, we get user's current location name and the country code using the coordinates.
* The coordinates and the name of the location is the passed on to the Open weather API which then shows the current and 3 days forecast weather report. 
* The country code is used to find the user's location currency using "currency-code-map" library and the obtained currency code is passed on to the ExchangeRate API
* The ExchangeRate gets the currency code and makes an API call to fetch all the converted currency rates.
![Screenshot (158)](https://user-images.githubusercontent.com/69240053/144366067-86bbed3a-0654-4b9b-bcf1-79d6e012d2b1.png)
