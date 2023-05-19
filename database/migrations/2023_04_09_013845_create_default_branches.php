<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        App\Models\Branch::insert([
            [
                "name" => "Développement Digital",
                "key" => "DEV",
                "level_id" => "1"
            ],
            [
                "name" => "Gestion Des Entreprise",
                "key" => "GE",
                "level_id" => "1"
            ],
            [
                "name" => "Ginie Civil",
                "key" => "GS",
                "level_id" => "1"
            ],
            [
                "name" => "Batiment",
                "key" => "BT",
                "level_id" => "2"
            ],
            [
                "name" => "Assistant administratif",
                "Key" => "AA",
                "level_id" => "2"
            ],
            
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
