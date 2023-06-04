<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;

class Student extends Model
{
    use HasFactory, HasApiTokens;
    protected $fillable = ["student_number", "user_id", "branch_id",];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function level()
    {
        return $this->belongsTo(Level::class);
    }
    public function group()
    {
        return $this->belongsTo(Group::class);
    }
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }
    public function notes()
    {
        return $this->hasMany(Note::class);
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
            "group" => ["required", "exists:groups,id"],
            "branch" => ["required", "exists:branches,id"],
            "level" => ["required", "exists:levels,id"]
        ]);
    }
}
