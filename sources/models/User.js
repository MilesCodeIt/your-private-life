import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  /**
   * Chaque key est l'ID d'un niveau.
   * Chaque valeur de keys est boolean (true si le niveau est validé).
   */
  levels: {
    type: Map,
    of: Boolean
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);