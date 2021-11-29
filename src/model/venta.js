module.exports = {
    obtener:function (conexion,funcion) {
    //    conexion.query('SELECT * FROM PRODUCTOS'/*WHERE ID_USUARIO = ?',[req.user.ID_USUARIO]*/,funcion);
          conexion.query('SELECT * FROM VENTAS',funcion);
    },
    editar:function (conexion,reqID,funcion) {
        //const {id} = req.params;
    //    conexion.query('SELECT * FROM PRODUCTOS WHERE ID_PRODUCTO = ?',[reqID],funcion);
          //const {id} = req.params;
          conexion.query('SELECT * FROM VENTAS WHERE ID_VENTA = ?',[reqID],funcion);
    },
    eliminar:function (conexion,reqID,funcion) {
    //    conexion.query('DELETE FROM PRODUCTOS WHERE ID_PRODUCTO = ?',[reqID],funcion);
          conexion.query('DELETE FROM VENTAS WHERE ID_VENTA = ?',[reqID],funcion);
    },
    insertar:function (conexion,newVenta,funcion) {
    //    conexion.query('INSERT INTO PRODUCTOS SET ?',[newProducto],funcion);
          conexion.query('INSERT INTO VENTAS SET ?',[newVenta],funcion);
    },
    editarVenta:function (conexion,id,newVenta,funcion){
    //    conexion.query('UPDATE PRODUCTOS SET ? WHERE ID_PRODUCTO = ?',[newProducto,id],funcion);
          conexion.query('UPDATE VENTAS SET ? WHERE ID_VENTA = ?',[newVenta,id],funcion);
    }
}