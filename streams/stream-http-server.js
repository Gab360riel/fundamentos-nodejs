import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString() * -1)

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}

// req => Readable Stream
// res => Writable Stream

const server = http.createServer(async (req, res) => {
    // codigo para quando for necessário receber os dados por completo para depois trabalhar com eles
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }
    
    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)


    // codigo para quando não há problema enviar e receber os dados parcialmente
    // return req
    //     .pipe(new InverseNumberStream())
    //     .pipe(res)
})

server.listen(3333)