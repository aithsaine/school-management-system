<?php

use App\Models\Admin;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        $user = new App\Models\User();
        $user->cin = "admin";
        $user->first_name = "admin";
        $user->last_name = "admin";
        $user->gender = "male";
        $user->tele = "+21252023658";
        $user->adress = "Hay Rmel Inzeggan";
        $user->email =  "admin@mail.com";
        $user->birthday = "2000-05-22";
        $user->password = Hash::make("adminadmin");
        $user->save();
        $admin = new App\Models\Admin();
        $user->admin()->save($admin);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
