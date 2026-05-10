import mongoose from "mongoose";

export const ConnectDB = async () => {

    try {

        const connection = await mongoose.connect(
            "mongodb+srv://asouk5_db_user:copper@cluster0.94e1ff0.mongodb.net/EmployeeManagementSystem?retryWrites=true&w=majority&appName=Cluster0"
        );

        console.log("MongoDB connected...");

    } catch (error) {

        console.error("Error connecting to MongoDB:", error.message);

        process.exit(1);
    }
}