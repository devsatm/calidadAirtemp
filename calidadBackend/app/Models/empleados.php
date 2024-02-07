<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class empleados extends Model
{
    use HasFactory;
    protected $table = "empleados";

    protected $fillable = [
      'nombre',
      'apellido',
      'usuario',
      'contrasenia',
      'perfil',
      'estatus'
    ];
    public function registrofinal(){
        return $this->hasMany(Registrofinal::class, 'empleado', 'id');
    }

}
