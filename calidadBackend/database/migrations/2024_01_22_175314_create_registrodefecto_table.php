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
        Schema::create('registrodefecto', function (Blueprint $table) {
            $table->id();
            $table->string('idregistrofinal')->nullable();
            $table->string('defecto')->nullable();
            $table->string('tipo')->nullable();
            $table->string('cantidad');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrodefecto');
    }
};
