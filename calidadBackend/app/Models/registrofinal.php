<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class registrofinal extends Model
{
    use HasFactory;
    protected $table = "registrofinal";

    protected $fillable = [
      'empleado',
      'semana',
      'fecha',
      'turno',
      'numerodp',
      'codigomq',
      'numerop',
      'pzainspc',
      'pzarecha',
      'pzaretra',
      'totalrecha'
    ];
    public function empleados(){
        return $this->belongsTo(Empleados::class, 'empleado', 'id');
    }
    public function departamento(){
        return $this->belongsTo(Departamento::class, 'numerodp', 'numero');
    }
    public function maquina(){
        return $this->belongsTo(Maquina::class, 'codigomq', 'codigo');
    }
    public function parte(){
        return $this->belongsTo(Parte::class, 'numerop', 'numero');
    }


}
