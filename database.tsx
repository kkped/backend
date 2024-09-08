const mongoose = require ('mongoose');

const URI = process.env.MONGODB_URI;
mongoose.connect( URI, {
    useNewUrlParser: true,
    useCreateIndex: true
});

const connetion = mongoose.connetion;

connetion.once('open', ()=> {
    console.log('Conectadp');
});