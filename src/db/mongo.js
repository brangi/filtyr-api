import mongoose from 'mongoose';

const initDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/filtyr", {useNewUrlParser: true, useUnifiedTopology: true})
  }catch(err){
    console.log(err)
  }
};

export default initDB;
