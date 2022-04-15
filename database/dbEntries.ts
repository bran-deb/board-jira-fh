import { isValidObjectId } from 'mongoose';
import { db } from './';
import { Entry, IEntry } from '../models';


export const getEntryById = async (id: string): Promise<IEntry | null> => {

    if (!isValidObjectId(id)) return null;
    //lean() retorna menos data de la db
    await db.connect()
    const entry = await Entry.findById(id).lean()
    await db.disconnect()

    return entry
}