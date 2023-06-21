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
        Schema::create('absences', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("affectation_id");
            $table->unsignedBigInteger("student_id");
            $table->date("date");
            $table->text("motif")->nullable();
            $table->foreign("affectation_id")->references("id")->on("affectations");
            $table->foreign("student_id")->references("id")->on("students");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absences');
    }
};
