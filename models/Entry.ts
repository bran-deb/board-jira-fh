import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces";

//extiende de interfaces
export interface IEntry extends Entry { }


const entrySchema = new Schema({
    description: { type: String, required: true },
    createAt: { type: Number },
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'finished'],
            message: '{VALUE} no es un estado permitido'
        },
        default: 'pending'
    }
})
//la primera vez que se ejecuta no tiene ningun valor y el model se llama ('Entry',) y se agrega el schema
const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema)


export default EntryModel