module.exports = {
    obtener:function (conexion,funcion) {
        conexion.query('SELECT * FROM PRODUCTOS'/*WHERE ID_USUARIO = ?',[req.user.ID_USUARIO]*/,funcion);
    },
    editar:function (conexion,reqID,funcion) {
        //const {id} = req.params;
        conexion.query('SELECT * FROM PRODUCTOS WHERE ID_PRODUCTO = ?',[reqID],funcion);
    },
    eliminar:function (conexion,reqID,funcion) {
        conexion.query('DELETE FROM PRODUCTOS WHERE ID_PRODUCTO = ?',[reqID],funcion);
    },
    insertar:function (conexion,newProducto,funcion) {
        conexion.query('INSERT INTO PRODUCTOS SET ?',[newProducto],funcion);
    },
    editarProducto:function (conexion,id,newProducto,funcion){
        conexion.query('UPDATE PRODUCTOS SET ? WHERE ID_PRODUCTO = ?',[newProducto,id],funcion);
    }
}