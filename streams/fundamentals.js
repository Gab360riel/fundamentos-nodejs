// process.stdin
//     .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++

        setTimeout(() => {
            if(i > 100){
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

// transforma os dados recebidos (chunk)
// primeiro parametro de um callback é o erro
// segundo paramentro é a conversão
// ao retornar os dados, sempre retornar como um Buffer

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString() * -1)

        callback(null, Buffer.from(String(transformed)))
    }
}

// chunk = dados que serão recebidos
// encoding = como a informação está codificada
// callback = função que a stream de escrita chama ao finalizar o processamento dos dados
// Stream de escrita não retorna dados, apenas processa

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())