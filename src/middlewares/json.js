export async function json(req, res) {
    const buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch (err) {
        req.body = null
        console.log(err)
    }

    res.setHeader('Content-Type', 'application/json')
}