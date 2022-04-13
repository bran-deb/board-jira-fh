import type { NextApiRequest, NextApiResponse } from 'next'
// import mongoose from 'mongoose';

import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';


type Data =
    | { message: string }
    | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // //(req.query) contiene el id
    // const { id } = req.query
    // //verifica si el id es uno valido en la db
    // if (!mongoose.isValidObjectId(id)) {
    //     return res.status(400).json({ message: 'El id no es valido ' + id })
    // }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res)
        case 'GET':
            return getEntry(req, res)
        default:
            return res.status(400).json({ message: 'Metodo no existe ' + req.method })
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
    //variables que se actualizan en entrada y si no se manda se mantienen valores por defecto
    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body

    // runValidators verifica que el estado es uno permitido
    try {
        //entrada actualizada y verificada// hace otra consulta a la db por id(findByIdAndUpdate)
        const updatedEntry = await Entry.findByIdAndUpdate(
            id,
            { description, status },
            { runValidators: true, new: true }
        )
        await db.disconnect()
        //le aseguramos que siempre tendra un valor !
        res.status(200).json(updatedEntry!)
        //tambien se actualiza de la sig forma
        // entryToUpdate.description = description
        // entryToUpdate.status = status
        // await entryToUpdate.save()


    } catch (error: any) {
        console.log(error);
        await db.disconnect()
        res.status(400).json({ message: error.message });
    }
}


const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query

    await db.connect()
    const entryById = await Entry.findById(id)
    await db.disconnect()

    if (!entryById) {
        res.status(400).json({ message: 'entry no existe con ID' + id });
    }
    //confirmamos que si o si retorna entryById
    return res.status(200).json(entryById!)
}