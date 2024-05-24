import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect(String(process.env.DATABASE_URL), {
      dbName: String(process.env.DATABASE_NAME),
    });
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('mongo db connected successfully');
    });
    connection.on('error', (err) => {
      console.log('mongo db connection error' + err);
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong');
    console.log(error);
  }
}
