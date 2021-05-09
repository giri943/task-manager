const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017 /taskmanager-API', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


// const task = new Tasks({
//     name: "Buy Veggies       ",

// })
// task.save().then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// })



