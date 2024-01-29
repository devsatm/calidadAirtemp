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
        Schema::create('defecto', function (Blueprint $table) {
            $table->id();
            $table->string('codigomq')->nullable();
            $table->string('numerodp')->nullable();
            $table->string('numerop')->nullable();
            $table->string('tipodefecto')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('defecto');
    }
};
