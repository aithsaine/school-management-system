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
        App\Models\Level::insert([
            [
                "name" => "Technicien Spécialisé",
                "key" => "TS"
            ],
            [
                "name" => "Technicien",
                "key" => "T"
            ],
            [
                "name" => "Qualification ",
                "key" => "Q"
            ],
            [
                "name" => "Spécialisation ",
                "key" => "S"
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('default_levels');
    }
};
