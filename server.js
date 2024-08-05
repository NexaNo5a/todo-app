const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
const uri = "mongodb+srv://kyle:Zyn879544856@cluster-todo-app.jddizhq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-todo-app"
mongoose.connect(uri)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});