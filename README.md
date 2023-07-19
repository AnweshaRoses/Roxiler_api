# Roxiler_api

This project implements a RESTful API for calculating sales statistics based on product transactions. It provides endpoints to retrieve various statistics such as total sale amount, total sold items, total not sold items, bar chart data, and pie chart data for a selected month, regardless of the year. The API is built using Node.js, Express.js, and MongoDB with Mongoose.

## Getting Started

### Prerequisites

- Node.js (v12 or above)
- MongoDB

### Installation

1. Clone the repository:
- git clone https://github.com/AnweshaRoses/Roxiler_api.git
2. Install the dependencies:
- cd roxiler_api
- npm install
3. Set up the environment variables:

- Create a `.env` file in the project root directory.
- Define the following environment variables in the `.env` file:
  - `MONGO_URL`: The connection URL for your MongoDB database.

### Usage

1. Start the server:
   `npm start`

2. The API server will be running at `http://localhost:5000`.

### API Endpoints

- **GET /api/getall** - Initializes the database with seed data from a third-party API.

- **GET /api/statistics/:month** - Retrieves the total sale amount for the selected month.

- **GET /api/statistics/totalSold/:month** - Retrieves the total number of sold items for the selected month.

- **GET /api/statistics/totalNotSold/:month** - Retrieves the total number of not sold items for the selected month.

- **GET /api/statistics/barChart/:month** - Retrieves the bar chart data for the selected month, showing the price range and the number of items in each range.

- **GET /api/statistics/pieChart/:month** - Retrieves the pie chart data for the selected month, showing unique categories and the number of items in each category.

- **GET /api/statistics/combined/:month** - Retrieves combined statistics data for the selected month, including total sale amount, total sold items, total not sold items, bar chart data, and pie chart data.

### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.





 
