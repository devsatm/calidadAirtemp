<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\Models\departamento;
Use Log;

class departamentoController extends Controller
{
    //metodo para traer todos los departamentos
    public function getAll(){
        $data = departamento::orderBy('created_at', 'desc')->get();
        return response()->json($data, 200);
    }
    //metodo para traer un departamento
    public function get($id){
        $data = departamento::find($id);
        return response()->json($data, 200);
    }
    //metodo para traer por medio del numero de departamento
    public function getByNumero($numero){
        $data = departamento::where('numero', $numero)->first();

        if ($data) {
            return response()->json($data, 200);
        } else {
            return response()->json(['message' => 'Departamento no encontrado'], 404);
        }
    }

    //metodo para crear un departamento
    public function create(Request $request){
        $data['numero'] = $request['numero'];
        $data['nombre'] = $request['nombre'];
        $data['encargado'] = $request['encargado'];
        $data['tipo'] = $request['tipo'];
        $departamento = departamento::create($data); // Crear el departamento y obtener el modelo

        $nuevoDeptoID = $departamento->id; // Obtener el ID del departamento recién creado

        return response()->json([
            'message' => "Successfully created",
            'id' => $nuevoDeptoID, // Devolver el ID del departamento
            'success' => true
        ], 200);
    }
    //metodo para actualizar un departamento
    public function update(Request $request,$id){
        $data['numero'] = $request['numero'];
        $data['nombre'] = $request['nombre'];
        $data['encargado'] = $request['encargado'];
        $data['tipo'] = $request['tipo'];
        departamento::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
    }
    //metodo para eliminar un departamento
    public function delete($id){
        $res = departamento::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }
}
