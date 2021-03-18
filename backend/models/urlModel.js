import mongoose from 'mongoose'

const urlSchema = mongoose.Schema(
  {
    url: {
      type: String,
    },
    responseTime: {
      type: Number,
    },
    userId: {
        type: String,
      },
    moreThan: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

const Urldata = mongoose.model('Urldata', urlSchema)

export default Urldata
