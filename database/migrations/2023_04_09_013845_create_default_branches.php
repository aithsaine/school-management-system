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
        App\Models\Branch::insert([
            [
                "name" => "Debeloppement Digital",
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
                "name" => "Electromécanique",
                "Key" => "EQ",
                "level_id" => "3"
            ],
            [
                "name" => "Electricité de maintenance industrielle",
                "key" => "EMI",
                "level_id" => "1"
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};