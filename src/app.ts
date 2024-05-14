import express, { Request, Response } from "express";
import cors from "cors";
import mysql from "mysql2";
const pool = mysql.createPool({
    host: "159.54.132.73",
    user: "princesa",
    password: "12345",
    database: "diego"
}).promise();

const autenticarUsuario = async(usuario: string, contraseña: string) => {
    const [row] = await pool.query(`select *from usuarios where usuario='${usuario}' and password='${contraseña}';`)
    console.log(row);
    
    return row;
}

const SS = express();
SS.use(express.json());
SS.use(cors());

SS.post(`/api/iniciarSesion`,
 async (req: Request, res: Response) => {
    const user = req.body.usuario;
    const password = req.body.password;
    console.log(user);
    console.log(password);
    
    
    try {
        const body = await autenticarUsuario(user, password) as Array<{}>;
        if(body.length === 0){
        res.status(400).json({ mensaje: "invalido" })
        }else{
            res.status(200).json({ mensaje: "valido" })
        }
    } catch (a) {
        console.log(`Algo salio mal con la autenticacion ${a}`);
        res.status(400).json({mensaje:`Algo salio mal con el registro ${a}`})

    }

})

SS.listen(13456, () => {
    console.log("Server escuchando... $$");

});