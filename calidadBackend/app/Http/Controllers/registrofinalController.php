<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\Models\registrofinal;
Use Log;

class registrofinalController extends Controller
{
    //metodo para traer todos los registros de calidad
    public function getAll(){
        $data = registrofinal::orderBy('created_at', 'desc')->get();
        return response()->json($data, 200);
    }
    //metodo para traer un registro de calidad
    public function get($id){
        $data = registrofinal::find($id);
        return response()->json($data, 200);
    }
    //metodo para traer todos los registros del empleado
    public function getList($empleado){
        $data = registrofinal::where('empleado', $empleado)->orderBy('id', 'desc')->get();

        if ($data->count() > 0) {
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
        $nuevoRegistroRecha = $registrof->pzarecha;
        $nuevoRegistroRetra = $registrof->pzaretra;

        return response()->json([
            'message' => "Successfully created",
            'id' => $nuevoRegistroID, // Devolver el ID de la parte
            'pzarecha' => $nuevoRegistroRecha,
            'pzaretra' => $nuevoRegistroRetra,
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
     // Método para obtener el nombre de la máquina asociada al código codigomq
     /*public function getNombreMaquina($codigomq){
        $registro = registrofinal::where('codigomq', $codigomq)->first();

        if ($registro) {
            // Acceder al modelo de Maquina a través de la relación
            $maquina = $registro->maquina;

            if ($maquina) {
                // Devolver el nombre de la máquina
                return response()->json(['nombre_maquina' => $maquina->nombre], 200);
            } else {
                return response()->json(['message' => 'Máquina no encontrada'], 404);
            }
        } else {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }
    }*/
    public function getDetallesRegistroPorId($id){
        // Obtener el registrofinal por su ID
        $registro = registrofinal::find($id);

        if ($registro) {
            // Acceder al modelo de Maquina y Departamento a través de las relaciones
            $maquina = $registro->maquina;
            $departamento = $registro->departamento;
            $parte = $registro->parte;
            $empleados = $registro->empleados;
            if ($maquina && $departamento && $parte && $empleados) {
                // Devolver el nombre de la máquina y el nombre del departamento
                return response()->json(['nombre_departamento' => $departamento->nombre,
                                        'nombre_maquina' => $maquina->nombre,
                                        'subensamble' => $parte->descripcion,
                                        'nombre'=> $empleados->nombre,
                                        'apellido'=> $empleados->apellido], 200);
            } else {
                return response()->json(['message' => 'Máquina o departamento no encontrado'], 404);
            }
        } else {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }
    }
    public function getByDateRange($start_date, $end_date){
        $data = registrofinal::whereBetween('fecha', [$start_date, $end_date])
            ->orderBy('id', 'desc')
            ->get();

        if ($data->count() > 0) {
            return response()->json($data, 200);
        } else {
            return response()->json(['message' => 'No se encontraron registros en el rango de fechas dado','data' => []], 404);
        }
    }

}
