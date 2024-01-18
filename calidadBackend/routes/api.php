<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\departamentoController;
use App\Http\Controllers\maquinaController;
use App\Http\Controllers\parteController;

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
});
Route::prefix('parte')->group(function () {
    Route::get('/',[ parteController::class, 'getAll']);
    Route::post('/',[ parteController::class, 'create']);
    Route::delete('/{id}',[ parteController::class, 'delete']);
    Route::get('/{id}',[ parteController::class, 'get']);
    Route::put('/{id}',[ parteController::class, 'update']);
});
