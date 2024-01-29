<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class defecto extends Model
{
    use HasFactory;
    protected $table = "defecto";

    protected $fillable = [
      'codigomq',
      'numerodp',
      'numerop',
      'tipodefecto'
    ];
}
