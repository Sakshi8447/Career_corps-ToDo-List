import mongoose from "mongoose"

const DBConnect = async() => {

    // DB is always on another continent (it will take time) -> try catch, async await
    try {
        const connectionStream = await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DB_NAME}`);
        // console.log(connectionStream.connection);
        console.log(`DB is successfully connected to \n PORT: ${connectionStream.connection.port} \n Host: ${connectionStream.connection.host} \n DB Name: ${connectionStream.connection.name}`);
    } catch (error) {
        console.log(`DB connection error! ${error}`)
        process.exit(1);
    }
    
}
export default DBConnect ;