"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mysql2_1 = __importDefault(require("mysql2"));
const pool = mysql2_1.default.createPool({
    host: "159.54.132.73",
    user: "princesa",
    password: "12345",
    database: "diego"
}).promise();
const autenticarUsuario = (usuario, contraseña) => __awaiter(void 0, void 0, void 0, function* () {
    const [row] = yield pool.query(`select *from usuarios where usuario='${usuario}' and password='${contraseña}';`);
    console.log(row);
    return row;
});
const SS = (0, express_1.default)();
SS.use(express_1.default.json());
SS.use((0, cors_1.default)());
SS.post(`/api/iniciarSesion`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.usuario;
    const password = req.body.password;
    console.log(user);
    console.log(password);
    try {
        const body = yield autenticarUsuario(user, password);
        if (body.length === 0) {
            res.status(400).json({ mensaje: "invalido" });
        }
        else {
            res.status(200).json({ mensaje: "valido" });
        }
    }
    catch (a) {
        console.log(`Algo salio mal con la autenticacion ${a}`);
        res.status(400).json({ mensaje: `Algo salio mal con el registro ${a}` });
    }
}));
SS.listen(13456, () => {
    console.log("Server escuchando... $$");
});
