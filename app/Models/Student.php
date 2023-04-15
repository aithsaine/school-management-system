<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Student extends Model
{
    use HasFactory, HasApiTokens;
    protected $fillable = ["student_number", "user_id"];
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
}
