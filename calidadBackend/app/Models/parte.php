<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class parte extends Model
{
    use HasFactory;
    protected $table = "parte";

    protected $fillable = [
      'numero',
      'descripcion',
      'tipo',
      'cliente',
      'departamento'
    ];
}
