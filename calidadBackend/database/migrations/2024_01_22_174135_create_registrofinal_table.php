<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registrofinal', function (Blueprint $table) {
            $table->id();
            $table->string('empleado')->nullable();
            $table->string('semana')->nullable();
            $table->date('fecha')->nullable();
            $table->string('turno')->nullable();
            $table->string('numerodp')->nullable();
            $table->string('codigomq')->nullable();
            $table->string('numerop')->nullable();
            $table->integer('pzainspc')->nullable();
            $table->integer('pzarecha')->nullable();
            $table->integer('pzaretra')->nullable();
            $table->integer('totalrecha')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrofinal');
    }
};
