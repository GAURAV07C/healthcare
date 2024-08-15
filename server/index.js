const express = require('express');
const app = express();
const db = require("./config/database");
const Cors = require("cors")


const userRoutes = require("./routes/user");
const profileRoute = require('./routes/profile');



db.connect();

const PORT = process.env.PORT || 4000;

app.use(express.json())


app.use(
    Cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)



app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/profile',profileRoute);



app.get("/", (req, res) => {
	return res.json({
        success:true,
        message:"Your server is running"
    })
});



app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});
