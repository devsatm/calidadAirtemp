<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\Models\registrodefecto;
Use Log;

class registrodefectoController extends Controller
{
    //metodo para traer todos los defectos
    public function getAll(){
        $data = registrodefecto::get();
        return response()->json($data, 200);
    }
    //metodo para traer un defecto
    public function get($id){
        $data = registrodefecto::find($id);
        return response()->json($data, 200);
    }
    public function getList($idregistrofinal){
        $data = registrodefecto::where('idregistrofinal', $idregistrofinal)->get();
        return response()->json($data, 200);
    }
    public function getRechazado($tipo){
        $data = registrodefecto::where('tipo', $tipo)->get();
        return response()->json($data, 200);
    }
    //metodo para crear un registro
    public function create(Request $request){
        $data['idregistrofinal'] = $request['idregistrofinal'];
        $data['defecto'] = $request['defecto'];
        $data['tipo'] = $request['tipo'];
        $data['cantidad'] = $request['cantidad'];
        $registrod = registrodefecto::create($data); // Crear el registroo y obtener el modelo

        $nuevoRegistrodID = $registrod->id; // Obtener el ID del registro recién creado

        return response()->json([
            'message' => "Successfully created",
            'id' => $nuevoRegistrodID, // Devolver el ID de la parte
            'success' => true
        ], 200);
    }
    //metodo para actualizar un registro
    public function update(Request $request,$id){
        $data['cantidad'] = $request['cantidad'];
        registrodefecto::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
    }
    //metodo para eliminar un registro
    public function delete($id){
        $res = registrodefecto::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }
}
