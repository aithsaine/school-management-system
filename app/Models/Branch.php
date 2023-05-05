<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;
    protected $fillable = ["level_id", "name", "key"];
    public function level()
    {
        return $this->belongsTo(Level::class);
    }
    public function students()
    {
        return $this->hasMany(Student::class);
    }
    public function options()
    {
        return $this->hasMany(Option::class);
    }
 
    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }
}
