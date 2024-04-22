const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: [
        // 'http://localhost:5173',
        'https://car-doctor-client-99145.web.app',
        'https://car-doctor-client-99145.firebaseapp.com'
    ],
    credentials: true
}));
// app.use(cors())
app.use(express.json());
app.use(cookieParser());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qf8hqc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

/* User defined middlewares
const logger = async (req, res, next) => {
   console.log('called:', req.host, req.originalUrl);
   next();
}

const verifyToken = async (req, res, next) => {
   const token = req.cookies.token;
   console.log('Value of token in middleware:', token);
   if (!token) {
       return res.status(401).send({ message: 'unauthorized' });
   }
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
       if (err) {
           console.log(err);
           return res.status(401).send({ message: 'unauthorized' });
       }
       console.log('value in the token', decoded);
       req.user = decoded;
       next();
   })
   
} */

// Custom Middlewares
const logger = (req, res, next) => {
    console.log('Logging info:', req.method, req.url);
    next();
}

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Token in the custom middleware', token);
    if (!token) {
        return res.status(401).send({ message: 'unauthorized access' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "unauthorized access" });
        }
        req.user = decoded;
        next();
    })
}

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const database = client.db("carDoctorDB");
        const serviceCollection = database.collection("services");
        const bookingCollection = database.collection("bookings");

        /* auth or jwt related api
        app.post('/jwt', logger, async (req, res) => {
            const user = req.body;
            console.log(user);

            Generate Access Token
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

             Set Token in HTTP Only Cookie
            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                })
                .send({ success: true });
        }) */

        // JWT related API
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            console.log('User for token', user);

            // Generate Access Token
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

            // Set Access Token in HTTP Only Cookie
            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                })
                .send({ success: true });
        })

        // Clear Cookie after Logging Out
        app.post('/logout', async (req, res) => {
            const user = req.body;
            console.log('Logging Out', user);

            res
                .clearCookie('token', { maxAge: 0 })
                .send({ success: true });
        })

        // Get all services data
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // Get specific service data
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = {
                projection: { price: 1, service_id: 1, title: 1, img: 1 },
            };
            const result = await serviceCollection.findOne(query, options);
            res.send(result);
        })

        // Get some booking data based on criteria (email)
        app.get('/bookings', logger, verifyToken, async (req, res) => {
            console.log(req.query.email);
            // console.log('Access Token', req.cookies.token);
            console.log('Owner of the token:', req.user);
            if (req.user.email !== req.query.email) {
                return res.status(403).send({ message: "forbidden access" });
            }
            /* console.log('user in the valid token:', req.user);
            if (req.user.email !== req.query.email) {
                return res.send(403).send({ message: 'forbidden access' });
            } */
            let query = {};
            if (req.query?.email) {
                query = { email: req.query.email };
            }
            const cursor = bookingCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })


        // Post (send) booking data 
        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking);
            res.send(result);
        })

        // Update (Patch) a specific booking data
        app.patch('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const booking = req.body;
            const filter = { _id: id };
            const updatedBooking = {
                $set: {
                    status: booking.status
                }
            }
            const result = await bookingCollection.updateOne(filter, updatedBooking);
            res.send(result);
        })

        // Delete specific booking data
        app.delete('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: id };
            const result = await bookingCollection.deleteOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Car Doctor server is running');
})

app.listen(port, () => {
    console.log(`Car Doctor server is running on PORT: ${port}`);
})