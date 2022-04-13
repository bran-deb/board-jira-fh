import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    //alternativa a verificacion con 2 archivos en el path
    // if (req.page.name === '/api/entries') return NextResponse.next()

    // (req.page.params) contiene el id a diferencia de (req.query)
    const id = req.page.params?.id || ''

    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");//verifica si es un id de mongoose

    //verifica si el id es uno valido en la db
    if (!checkMongoIDRegExp.test(id)) {
        // return res.status(400).json({ message: 'El id no es valido ' + id })
        return new Response(JSON.stringify({ message: 'El id no es valido' + id })), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

    return NextResponse.next()
}