<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "cin",
        "first_name",
        "last_name",
        "gender",
        "tele",
        "adress",
        "bithday",
        "email",
        "password",
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    public function teacher ()
    {
        return $this->belongsTo(Teacher::class);
    }
    public static function validate(Request $request)
    {
        $request->validate([
            "cin" => ["required", "unique:users,cin"],
            "first_name" => ["required"],
            "last_name" => ["required"],
            "adress" => ["required"],
            "gender" => ["required"],
            "birthday" => ["required", "date", "before:today"],
            "tele" => ["required"],
        ]);
    }
}
