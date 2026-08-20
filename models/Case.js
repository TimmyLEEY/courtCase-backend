import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
  {
    caseNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    court: {
      type: String,
      required: true,
      trim: true,
    },

    caseCaption: {
      type: String,
      required: true,
      trim: true,
    },

    judge: {
      type: String,
      required: true,
      trim: true,
    },

    filedDate: {
      type: Date,
      required: true,
    },

    caseType: {
      type: String,
      required: true,
      trim: true,
    },

    parcelId: {
      type: String,
      trim: true,
    },

    pleas:{
        type: String,
      trim: true,
    },

    complaint:{
         type: String,
      trim: true,
    },

    OutstandingBalance:{
         type: Number,
        default: 0,
    },

    totalDeposits: {
      amount: {
        type: Number,
        default: 0,
      },
      type: {
        type: String,
        default: "Credit",
      },
    },

    totalCosts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Case = mongoose.model("Case", caseSchema);

export default Case;