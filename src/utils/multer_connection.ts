const multer = require('multer');
const paths = require('path');
const crypt = require('crypto');

//configuração do multer
module.exports = {

    dest: paths.resolve(__dirname, "..", "..", "tmp", "uploads"),
   //indica onde será salvo o arquivo
    storage: multer.diskStorage({
        destination: (req: Request, file: any, cb: any) => {
            cb(null, paths.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        //indica o nome do arquivo, como ele será salvo
        filename: (req: Request, file: any, cb: Function) => {
            crypt.randomBytes(16, (err: any, hash: any) => {
                if (err) cb(err);
                //adiciona o hash ao nome do arquivo para evitar que seja salvo com o mesmo nome
                 file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            })
        },
        url:(req: Request, file: any, cb: any)=>{
            //url para acessar o arquivo
            file.url = `http://localhost:3333/tmp/uploads/${file.key}`;
            cb(null, file.url);
        }

    }),
    //define o limite de tamanho do arquivo
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    //define os tipos de arquivos permitidos
    fileFilter: (req: Request, file: any, cb: any) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    }
};
