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
        Schema::create('affectations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("teacher_id");
            $table->unsignedBigInteger("group_id");
            $table->unsignedBigInteger("module_id");
            $table->string("status");
            $table->foreign("teacher_id")->references("id")->on("teachers")->cascadeOnDelete();
            $table->foreign("group_id")->references("id")->on("groups")->cascadeOnDelete();
            $table->foreign("module_id")->references("id")->on("modules")->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affectations');
    }
};
