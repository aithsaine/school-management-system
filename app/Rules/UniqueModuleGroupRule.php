<?php

namespace App\Rules;

use App\Models\Affectation;
use App\Models\Group;
use Closure;
use Illuminate\Contracts\Validation\Rule;

class UniqueModuleGroupRule implements Rule
{
    public function __construct($group_id,$teacher_id)
    {
        $this->group_id = $group_id;
        $this->teacher_id = $teacher_id;
        
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function passes($attribute, $value)
    {
        foreach($value as $module_id)
        {
            if(Affectation::where("group_id",$this->group_id)->where("module_id",$module_id)->exists()){

                return false;
            }
        }
        return true;
    }
    public function message()
    {
        return 'assignement already exist.';
    }
}
