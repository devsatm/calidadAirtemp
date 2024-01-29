<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\Models\parte;
Use Log;

class parteController extends Controller
{
    //metodo para traer todas las partes
    public function getAll(){
        $data = parte::get();
        return response()->json($data, 200);
    }
    //metodo para traer una parte
    public function get($id){
        $data = parte::find($id);
        return response()->json($data, 200);
    }
    //metodo para traer las partes que pertenezcan a un departamento
    public function getList($id){
        $data = parte::where('departamento', $id)->get();
        return response()->json($data, 200);
    }
    //metodo para traer por medio del numero de parte
    public function getByNumero($numero){
        $data = parte::where('numero', $numero)->first();

        if ($data) {
            return response()->json($data, 200);
        } else {
            return response()->json(['message' => 'Departamento no encontrado'], 404);
        }
    }
    //metodo para crear una parte
    public function create(Request $request){
        $data['numero'] = $request['numero'];
        $data['descripcion'] = $request['descripcion'];
        $data['tipo'] = $request['tipo'];
        $data['cliente'] = $request['cliente'];
        $data['departamento'] = $request['departamento'];
        $parte = parte::create($data); // Crear la parte y obtener el modelo

        $nuevoParteID = $parte->id; // Obtener el ID de la parte recién creado

        return response()->json([
            'message' => "Successfully created",
            'id' => $nuevoParteID, // Devolver el ID de la parte
            'success' => true
        ], 200);
    }
    //metodo para actualizar una parte
    public function update(Request $request,$id){
        $data['numero'] = $request['numero'];
        $data['descripcion'] = $request['descripcion'];
        $data['tipo'] = $request['tipo'];
        $data['cliente'] = $request['cliente'];
        $data['departamento'] = $request['departamento'];
        parte::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
    }
    //metodo para eliminar una parte
    public function delete($id){
        $res = parte::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }
}
