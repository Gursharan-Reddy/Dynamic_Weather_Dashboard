Dynamic Weather Dashboard
A clean, responsive, and user-friendly web application that provides real-time weather information for any city in the world. This project uses the OpenWeatherMap API to fetch and display current weather data.

Features
Search by City: Users can enter the name of any city to get its current weather conditions.

Geolocation: Automatically fetches the weather for the user's current location on page load (if permission is granted).

Dynamic Data Display: Shows key weather metrics in a clear and visually appealing card:

Temperature (°C)

"Feels Like" Temperature

Weather Condition (e.g., "Clear sky", "light rain")

Humidity (%)

Wind Speed (m/s)

Atmospheric Pressure (hPa)

Responsive Design: The interface is optimized for a seamless experience on both desktop and mobile devices.

Loading & Error States: Provides clear feedback to the user while fetching data or if an error occurs.

Technologies Used
HTML5: For the structure and content of the application.

CSS3 & Tailwind CSS: For modern, responsive styling and layout.
--   JavaScript (ES6+): For the application logic, API interaction, and DOM manipulation.

API Used
This project relies on the OpenWeatherMap API for all weather-related data.

Setup and Installation
To run this project on your local machine, follow these simple steps:

Clone the repository (or download the files):

git clone (git remote add origin https://github.com/Gursharan-Reddy/Dynamic_Weather_Dashboard.git)

Get a Free API Key:

Sign up for a free account at OpenWeatherMap.

Navigate to the "API keys" tab in your dashboard and copy your default key.

Note: It may take a few minutes for a new API key to become active.

Add the API Key to the Project:

Open the script.js file.

Find the line: const apiKey = "YOUR_API_KEY";

Replace "YOUR_API_KEY" with the actual key you copied.

Open the Application:

Simply open the index.html file in your web browser. No web server is required.

This README was created to provide a clear overview of the project. Feel free to contribute or suggest improvements!
