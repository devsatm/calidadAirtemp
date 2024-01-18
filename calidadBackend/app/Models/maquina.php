<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class maquina extends Model
{
    use HasFactory;
    protected $table = "maquina";

    protected $fillable = [
      'codigo',
      'nombre',
      'codproceso',
      'departamento'
    ];
}
