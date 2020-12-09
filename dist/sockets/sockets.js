"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuariosActivos = exports.configurarUsuario = exports.mensajes = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
//
exports.conectarCliente = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('usuario desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.mensajes = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('usuario desconectado', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
exports.configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `${payload.nombre} configurado`
        });
    });
};
exports.obtenerUsuariosActivos = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
