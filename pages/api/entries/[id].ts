import type { NextApiRequest, NextApiResponse } from 'next'

import mongoose from 'mongoose';

import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';


type Data =
    | { message: string }
    | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    //(req.query) contiene el id
    const { id } = req.query
    //verifica si el id es uno valido en la db
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El id no es valido' + id })
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res)
        default:
            return res.status(400).json({ message: 'Metodo no existe' })
    }
}


const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query

    await db.connect()
    const entryToUpdate = await Entry.findById(id)

    if (!entryToUpdate) {
        await db.disconnect()
        return res.status(400).json({ message: 'No hay entrada con ese ID:' + id })
    }
    //variables que se actualizan en entrada
    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body

    // runValidators verifica que el estado es uno permitido
    const updatedEntry = await Entry.findByIdAndUpdate(id,
        { description, status },
        { runValidators: true, new: true }
    )
    //le aseguramos que siempre tendra un valor !
    res.status(200).json(updatedEntry!)
}