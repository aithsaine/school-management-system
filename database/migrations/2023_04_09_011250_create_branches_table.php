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
        // example developpement digitale , gestion ...
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("key");
            $table->unsignedBigInteger("level_id");
            $table->foreign("level_id")->references("id")->on("levels")->cascadeOnDelete()->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
