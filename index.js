//IMPORTED USING ES6 MODULES LIKE IMPORT EXPORT AND ALSO CHANGED "type": "module" IN package.json file
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer'
import helmet from 'helmet'
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postsRoutes from './routes/posts.js';
import { register } from './controllers/auth.js';
import { createPosts } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
import User from './models/User.js';
import Posts from './models/Posts.js';
import { users, posts } from './data/index.js'


//MIDDLEWARES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan("common"));
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))


//STORAGE ENGINE MULTER READED THE DOC FROM GITHUB OF multer official FOR UNDERSTAND HOW IT WORKS
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })


//IMPORT FILE ROUTES
app.post('/auth/register', upload.single("picture"), register)
app.post('/posts', verifyToken, upload.single("picture"), createPosts)


//ROUTES
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/posts', postsRoutes)


//MONGO DB CONNECTION
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    // User.insertMany(users);
    // Posts.insertMany(posts);
    console.log('MONGO DB connected')
}).catch((err) => console.log(`cant connect because of this error  ${err}`))



//PORT CONNECTION
const PORT = process.env.PORT || 6000
app.listen(PORT, () => console.log(`server started on port : ${PORT}`))


