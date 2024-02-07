<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class registrodefecto extends Model
{
    use HasFactory;
    protected $table = "registrodefecto";

    protected $fillable = [
      'idregistrofinal',
      'defecto',
      'tipo',
      'cantidad'
    ];
    public function defecto()
    {
        return $this->belongsTo(Defecto::class, 'codigomq', 'codigomq')
                    ->where('numerodp', $this->numerodp)
                    ->where('numerop', $this->numerop);
    }
}
