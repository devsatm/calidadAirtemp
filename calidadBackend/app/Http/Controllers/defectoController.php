<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\Models\defecto;
Use Log;

class defectoController extends Controller
{
    //metodo para traer todos los defectos
    public function getAll(){
        $data = defecto::orderBy('created_at', 'desc')->get();
        return response()->json($data, 200);
    }
    //metodo para traer un defecto
    public function get($id){
        $data = defecto::find($id);
        return response()->json($data, 200);
    }
    //metodo para traer los defectos que pertenezcan a un departamento
    public function getList($id){
        $data = defecto::where('numerodp', $id)->get();
        return response()->json($data, 200);
    }
    //metodo para crear un defecto
    public function create(Request $request){
        $data['codigomq'] = $request['codigomq'];
        $data['numerodp'] = $request['numerodp'];
        $data['numerop'] = $request['numerop'];
        $data['tipodefecto'] = $request['tipodefecto'];
        $defecto = defecto::create($data); // Crear el defecto y obtener el modelo

        $nuevoDefecID = $defecto->id; // Obtener el ID del defecto recién creado

        return response()->json([
            'message' => "Successfully created",
            'id' => $nuevoDefecID, // Devolver el ID del departamento
            'success' => true
        ], 200);
    }
    //metodo para actualizar un defecto
    public function update(Request $request,$id){
        $data['codigomq'] = $request['codigomq'];
        $data['numerodp'] = $request['numerodp'];
        $data['numerop'] = $request['numerop'];
        $data['tipodefecto'] = $request['tipodefecto'];
        defecto::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
    }
    //metodo para eliminar un defecto
    public function delete($id){
        $res = defecto::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }
}
