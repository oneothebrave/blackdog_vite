const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const defaultAvatar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX+/v4AAAD8/PwEBAT5+fkICAjQ0ND29va3t7cUFBTW1tbi4uLa2trx8fGwsLAREREtLS0lJSWfn59ISEioqKhgYGB+fn5paWmhoaG/v7/IyMiIiIiVlZVAQEBsbGwaGhqQkJDn5+czMzNYWFg5OTlTU1NXL150AAADm0lEQVR4nO3aCXObOhSGYY4Qmw14NzXem/b//8UrsXlJ0tw7KXjEfZ9kPJ0JjfgsIcnR8TwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgkdLtP6rv0VFaR7s4j/PQ01p/fb17Im+ynYkx305H2ofhTxE/kEDkLdXKePUd/W3hQnwTUXyTcjUdXydG3sZks6qIy9ElVHqXSOC3GeVnOPgd9P77l1L3XzNOdz03+Ny+0nXEHqfxH1W6tg+HS1hPaCZhuTcOme6tN5d3CU3EIRPakOkqkWqp2uvbzuOvtvOYcMBRWiVU05VptBo8cvF6Gada537VRJ1Q5oPNNHbh1SZg0M1zh15WYhV5v81yXw9RM9Fcemjj07a1Wjejp54DeplszO8sA6n7z7wc0wGXQ+WliX1b/WYil1MvjZixEkprnuqoh1Y+bTyVrg/te1x4fW0Zd2/VznuxmXpDbkufEvq9JTSPoo7X63W+M/POixP21VA7TZv1SHtDJpw0+6l6UyWbnptr9xgDzjXXTTPTVDOd5IM0PWhCFYvcAs77WfJfSels32w37EQXji6hfeKjbbVrC0wPlgNOAQOxgVQWb6ql+FD2su9+LZvQ7DCyiZFqHY2uC+s+fPVNAAAAAMD/1Pg+ZT4bYaXFEzXGapJHYw+oPBVF8el0ikda4FX5tRCR8+/MjYT/ccxFkTfJq/MemQ1zSPBtymuOGf7FX+bsaeh0f6zPtH05utGH9jTsOjWir7rTlj5k001dwGYTrhzpwyjNkySZBftQR3+8ZfNWhFtbgOhaQq+QqhhFgvyLS8tLIl0Fm/kvx0Fu8LuUt1tIPXPIuSizLNI66mqZ65coM1/L4jSXboQaQZI78hwe2nsORJKFHCbTux+m9sgjP58X9m24PzE3Vx+zAasuvuOH3N21tcrjzrErI6l+fH/lPHTlMKupLGzvXj7i343OuixgdildOfZR2Vu1vt0SBoF/13Hv2cqZWezO7lR5l1+3LHL3+iFbsC4rW8vpyBCt1vHrdnuWrijljwFt7662mdauPIOd8m5IPjyAT+lEFnnq4ucnra+HJpG8SyhtumCRJMur3cg6F9Cu6iraF8VZ5OPJVOZFsYk9WxegtEPP4E1dMa126+I52jFfW2VTZ+liuFr11xfTk9dwEj5IHy5wcHh2Pr93Z3vtvQ8/AmtXti7fMPqAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6NU/+FEc+85AX70AAAAASUVORK5CYII=";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max:255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    avatar: {
        type: String,
        required: false,
        default: defaultAvatar
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("User", userSchema);