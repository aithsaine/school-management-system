<?php

namespace App\Rules;
use App\Models\Group;
use Illuminate\Contracts\Validation\Rule;
class UniqueGroup implements Rule
{
    public int $branch_id;
    public function __construct($branch_id)
    {
        $this->branch_id = $branch_id;
        
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
  
    
    public function passes($attribute, $value)
    {
      return !Group::where("branch_id",$this->branch_id)->where("name",$value)->exists();
        
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'this group already exist.';
    }

}

