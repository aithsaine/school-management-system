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
        \App\Models\Group::insert([
            [
                "name" => "101"
            ],
            [
                "name" => "102"
            ],
            [
                "name" => "103"
            ],
            [
                "name" => "201"
            ],
            [
                "name" => "202"
            ],
            [
                "name" => "203"
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('default_groups');
    }
};
