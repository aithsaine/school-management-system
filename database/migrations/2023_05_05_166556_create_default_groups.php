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
        // \App\Models\Group::insert([
        //     [
        //         "name" => "101",
        //         "branch_id" => 1
        //     ],
        //     [
        //         "name" => "102",
        //         "branch_id" => 1

        //     ],
        //     [
        //         "name" => "101",
        //         "branch_id" => 2

        //     ],
        //     [
        //         "name" => "202",
        //         "branch_id" => 2

        //     ],
        //     [
        //         "name" => "203",
        //         "branch_id" => 2

        //     ],
        //     [
        //         "name" => "101",
        //         "branch_id" => 3

        //     ],
        //     [
        //         "name" => "202",
        //         "branch_id" => 3

        //     ],
        //     [
        //         "name" => "203",
        //         "branch_id" => 3

        //     ],
        //     [
        //         "name" => "101",
        //         "branch_id" => 4

        //     ],
        //     [
        //         "name" => "202",
        //         "branch_id" => 4

        //     ],
        //     [
        //         "name" => "203",
        //         "branch_id" => 4

        //     ],
        //     [
        //         "name" => "101",
        //         "branch_id" => 5

        //     ],
        //     [
        //         "name" => "202",
        //         "branch_id" => 5

        //     ],
        //     [
        //         "name" => "203",
        //         "branch_id" => 5

        //     ],
        //     [
        //         "name" => "101",
        //         "branch_id" => 6

        //     ],
        //     [
        //         "name" => "202",
        //         "branch_id" => 6

        //     ],
        //     [
        //         "name" => "203",
        //         "branch_id" => 6

        //     ],
        // ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
