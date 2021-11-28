module.exports = {
    obtener:function (conexion,funcion) {
    //    conexion.query('SELECT * FROM PRODUCTOS'/*WHERE ID_USUARIO = ?',[req.user.ID_USUARIO]*/,funcion);
          conexion.query('SELECT * FROM COMANDAS',funcion);
    },
    editar:function (conexion,reqID,funcion) {
        //const {id} = req.params;
    //    conexion.query('SELECT * FROM PRODUCTOS WHERE ID_PRODUCTO = ?',[reqID],funcion);
          //const {id} = req.params;
          conexion.query('SELECT * FROM COMANDAS WHERE ID_COMANDA = ?',[reqID],funcion);
    },
    eliminar:function (conexion,reqID,funcion) {
    //    conexion.query('DELETE FROM PRODUCTOS WHERE ID_PRODUCTO = ?',[reqID],funcion);
          conexion.query('DELETE FROM COMANDAS WHERE ID_COMANDA = ?',[reqID],funcion);
    },
    insertar:function (conexion,newComanda,funcion) {
    //    conexion.query('INSERT INTO PRODUCTOS SET ?',[newProducto],funcion);
          conexion.query('INSERT INTO COMANDAS SET ?',[newComanda],funcion);
    },
    editarComanda:function (conexion,id,newComanda,funcion){
    //    conexion.query('UPDATE PRODUCTOS SET ? WHERE ID_PRODUCTO = ?',[newProducto,id],funcion);
          conexion.query('UPDATE COMANDAS SET ? WHERE ID_COMANDA = ?',[newComanda,id],funcion);
    }
}