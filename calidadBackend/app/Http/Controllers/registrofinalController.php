<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\Models\registrofinal;
Use Log;

class registrofinalController extends Controller
{
    //metodo para traer todos los registros de calidad
    public function getAll(){
        $data = registrofinal::get();
        return response()->json($data, 200);
    }
    //metodo para traer un registro de calidad
    public function get($id){
        $data = registrofinal::find($id);
        return response()->json($data, 200);
    }
    public function getList($empleado){
        $data = registrofinal::where('empleado', $empleado)->get();
        if ($data) {
            return response()->json($data, 200);
        } else {
            return response()->json(['message' => 'Empleado no encontrado'], 404);
        }
    }
    //metodo para crear un registro
    public function create(Request $request){
        $data['empleado'] = $request['empleado'];
        $data['semana'] = $request['semana'];
        $data['fecha'] = $request['fecha'];
        $data['turno'] = $request['turno'];
        $data['numerodp'] = $request['numerodp'];
        $data['codigomq'] = $request['codigomq'];
        $data['numerop'] = $request['numerop'];
        $data['pzainspc'] = $request['pzainspc'];
        $data['pzarecha'] = $request['pzarecha'];
        $data['pzaretra'] = $request['pzaretra'];
        $data['totalrecha'] = $request['totalrecha'];
        $registrof = registrofinal::create($data); // Crear el registroo y obtener el modelo

        $nuevoRegistroID = $registrof->id; // Obtener el ID del registro recién creado

        return response()->json([
            'message' => "Successfully created",
            'id' => $nuevoRegistroID, // Devolver el ID de la parte
            'success' => true
        ], 200);
    }
    //metodo para actualizar un registro
    public function update(Request $request,$id){
        $data['empleado'] = $request['empleado'];
        $data['semana'] = $request['semana'];
        $data['fecha'] = $request['fecha'];
        $data['turno'] = $request['turno'];
        $data['numerodp'] = $request['numerodp'];
        $data['codigomq'] = $request['codigomq'];
        $data['pzainspc'] = $request['pzainspc'];
        $data['pzarecha'] = $request['pzarecha'];
        $data['pzaretra'] = $request['pzaretra'];
        $data['totalrecha'] = $request['totalrecha'];
        $data['idregistrodefecto'] = $request['idregistrodefecto'];
        registrofinal::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
    }
    //metodo para eliminar un registro
    public function delete($id){
        $res = registrofinal::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }
}
