require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const AnnuncementRoute = require('./routes/AnnuncementRoute');
const BuildingRoute = require('./routes/BuildingRoute');
const EventRoute = require('./routes/EventRoute');
const LocationRoute = require('./routes/LocationRoute');
const PathRoute = require('./routes/PathRoute');
const POIRoute = require('./routes/POIRoute');

app.use('/api/v1/announcements', AnnuncementRoute);
app.use('/api/v1/buildings', BuildingRoute);
app.use('/api/v1/events', EventRoute);
app.use('/api/v1/locations', LocationRoute);
app.use('/api/v1/paths', PathRoute);
app.use('/api/v1/pois', POIRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT} 🚀`)
});