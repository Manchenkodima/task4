const app = require('./index');
const mongoose = require('mongoose')
const connectDb = require('./config/db')
connectDb()

const PORT = process.env.PORT || 3000;

// app.listen(PORT, async () => {
//     console.log(`Сервер запущен http://localhost:${PORT}`);
// });



mongoose.connection.once('open', () => {
    console.log('Соединение mongoose DB')
    app.listen(process.env.PORT, () => console.log(`Сервер запущен http://localhost:${PORT}`))
})