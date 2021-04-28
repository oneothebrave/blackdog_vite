const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "This user left nothing."
    }
});

const bd_user = model("user", userSchema);

module.exports = bd_user

