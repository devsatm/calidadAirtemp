<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\Models\empleados;
Use Log;

class empleadosController extends Controller
{
    //metodo para traer todos los empleados
    public function getAll(){
        $data = empleados::get();
        return response()->json($data, 200);
    }
    //metodo para traer un empleado
    public function get($id){
        $data = empleados::find($id);
        return response()->json($data, 200);
    }
    //metodo para crear un empleado
    public function create(Request $request){
        $data['nombre'] = $request['nombre'];
        $data['apellido'] = $request['apellido'];
        $data['usuario'] = $request['usuario'];
        $data['contrasenia'] = $request['contrasenia'];
        $data['perfil'] = $request['perfil'];
        $data['estatus'] = $request['estatus'];
        $empleado = empleados::create($data); // Crear la maquina y obtener el modelo

        $nuevoEmpID = $empleado->id; // Obtener el ID de la maquina recién creado

        return response()->json([
            'message' => "Successfully created",
            'id' => $nuevoEmpID, // Devolver el ID de la maquina
            'success' => true
        ], 200);
    }
    //metodo para actualizar un empleado
    public function update(Request $request,$id){
        $data['nombre'] = $request['nombre'];
        $data['apellido'] = $request['apellido'];
        $data['usuario'] = $request['usuario'];
        $data['contrasenia'] = $request['contrasenia'];
        $data['perfil'] = $request['perfil'];
        $data['estatus'] = $request['estatus'];
        empleados::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
    }
    //metodo para eliminar un empleado
    public function delete($id){
        $res = empleados::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }
    /*public function verificarCredenciales(Request $request)
    {
        $usuario = $request->input('usuario');
        $contrasenia = $request->input('contrasenia');

        $empleado = empleados::where('usuario', $usuario)
                           ->where('contrasenia', $contrasenia)
                           ->first();

        if ($empleado) {
            // Las credenciales son válidas
            return response()->json(['message' => 'Credenciales válidas'], 200);
        } else {
            // Credenciales inválidas
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }
    }*/
    public function verificarCredenciales(Request $request)
{
    $usuario = $request->input('usuario');
    $contrasenia = $request->input('contrasenia');

    $empleado = empleados::where('usuario', $usuario)
                       ->where('contrasenia', $contrasenia)
                       ->first();

    if ($empleado) {
        // Las credenciales son válidas
        return response()->json(['message' => 'Credenciales válidas', 'empleado' => $empleado], 200);
    } else {
        // Credenciales inválidas
        return response()->json(['message' => 'Credenciales inválidas'], 401);
    }
}


}
