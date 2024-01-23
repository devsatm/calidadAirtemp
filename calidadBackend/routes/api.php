<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\departamentoController;
use App\Http\Controllers\maquinaController;
use App\Http\Controllers\parteController;
use App\Http\Controllers\empleadosController;
use App\Http\Controllers\defectoController;
use App\Http\Controllers\registrodefectoController;
use App\Http\Controllers\registrofinalController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('departamento')->group(function () {
    Route::get('/',[ departamentoController::class, 'getAll']);
    Route::post('/',[ departamentoController::class, 'create']);
    Route::delete('/{id}',[ departamentoController::class, 'delete']);
    Route::get('/{id}',[ departamentoController::class, 'get']);
    Route::put('/{id}',[ departamentoController::class, 'update']);
});
Route::prefix('maquina')->group(function () {
    Route::get('/',[ maquinaController::class, 'getAll']);
    Route::post('/',[ maquinaController::class, 'create']);
    Route::delete('/{id}',[ maquinaController::class, 'delete']);
    Route::get('/{id}',[ maquinaController::class, 'get']);
    Route::put('/{id}',[ maquinaController::class, 'update']);
    Route::get('/list/{id}',[ maquinaController::class, 'getList']);

});
Route::prefix('parte')->group(function () {
    Route::get('/',[ parteController::class, 'getAll']);
    Route::post('/',[ parteController::class, 'create']);
    Route::delete('/{id}',[ parteController::class, 'delete']);
    Route::get('/{id}',[ parteController::class, 'get']);
    Route::put('/{id}',[ parteController::class, 'update']);
    Route::get('/list/{id}',[ parteController::class, 'getList']);
});
Route::prefix('defecto')->group(function () {
    Route::get('/',[ defectoController::class, 'getAll']);
    Route::post('/',[ defectoController::class, 'create']);
    Route::delete('/{id}',[ defectoController::class, 'delete']);
    Route::get('/{id}',[ defectoController::class, 'get']);
    Route::put('/{id}',[ defectoController::class, 'update']);
});
Route::prefix('empleados')->group(function () {
    Route::get('/',[ empleadosController::class, 'getAll']);
    Route::post('/',[ empleadosController::class, 'create']);
    Route::delete('/{id}',[ empleadosController::class, 'delete']);
    Route::get('/{id}',[ empleadosController::class, 'get']);
    Route::put('/{id}',[ empleadosController::class, 'update']);
});
Route::prefix('registrodefecto')->group(function () {
    Route::get('/',[ registrodefectoController::class, 'getAll']);
    Route::post('/',[ registrodefectoController::class, 'create']);
    Route::delete('/{id}',[ registrodefectoController::class, 'delete']);
    Route::get('/{id}',[ registrodefectoController::class, 'get']);
    Route::put('/{id}',[ registrodefectoController::class, 'update']);
});
Route::prefix('registrofinal')->group(function () {
    Route::get('/',[ registrofinalController::class, 'getAll']);
    Route::post('/',[ registrofinalController::class, 'create']);
    Route::delete('/{id}',[ registrofinalController::class, 'delete']);
    Route::get('/{id}',[ registrofinalController::class, 'get']);
    Route::put('/{id}',[ registrofinalController::class, 'update']);
});

