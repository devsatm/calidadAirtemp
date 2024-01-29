<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\Models\maquina;
Use Log;

class maquinaController extends Controller
{
    //metodo para traer todos las maquinas
    public function getAll(){
        $data = maquina::orderBy('created_at', 'desc')->get();
        return response()->json($data, 200);
    }
    //metodo para traer una maquina
    public function get($id){
        $data = maquina::find($id);
        return response()->json($data, 200);
    }
    //metodo para traer las maquinas que pertenezcan a un departamento
    public function getList($id){
        $data = maquina::where('departamento', $id)->get();
        return response()->json($data, 200);
    }
    //metodo para traer por medio del codigo de maquina
    public function getByCodigo($codigo){
        $data = maquina::where('codigo', $codigo)->first();

        if ($data) {
            return response()->json($data, 200);
        } else {
            return response()->json(['message' => 'Departamento no encontrado'], 404);
        }
    }
    //metodo para crear una maquina
    public function create(Request $request){
        $data['codigo'] = $request['codigo'];
        $data['nombre'] = $request['nombre'];
        $data['codproceso'] = $request['codproceso'];
        $data['departamento'] = $request['departamento'];
        $maquina = maquina::create($data); // Crear la maquina y obtener el modelo

        $nuevoMqID = $maquina->id; // Obtener el ID de la maquina recién creado

        return response()->json([
            'message' => "Successfully created",
            'id' => $nuevoMqID, // Devolver el ID de la maquina
            'success' => true
        ], 200);
    }
    //metodo para actualizar una maquina
    public function update(Request $request,$id){
        $data['codigo'] = $request['codigo'];
        $data['nombre'] = $request['nombre'];
        $data['codproceso'] = $request['codproceso'];
        $data['departamento'] = $request['departamento'];
        maquina::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
    }
    //metodo para eliminar una maquina
    public function delete($id){
        $res = maquina::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }
}
