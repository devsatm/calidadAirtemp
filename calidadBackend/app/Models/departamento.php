<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class departamento extends Model
{
    use HasFactory;
    protected $table = "departamento";

    protected $fillable = [
      'numero',
      'nombre',
      'encargado',
      'tipo'
    ];
    public function registrofinal(){
        return $this->hasMany(Registrofinal::class, 'numerodp', 'numero');
    }

}
