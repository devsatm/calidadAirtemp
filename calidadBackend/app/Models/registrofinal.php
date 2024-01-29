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
}
