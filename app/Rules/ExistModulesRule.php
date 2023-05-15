<?php

namespace App\Rules;

use App\Models\Group;
use App\Models\Module;
use Closure;
use Illuminate\Contracts\Validation\Rule;

class ExistModulesRule implements Rule
{
    public Group $group;
    public function __construct($group_id)
    {
        $this->group = Group::find($group_id);
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function passes($attribute, $value)
    {
        foreach ($value as $module_id) {
            if (!Module::where("id", $module_id)->where("option_id", $this->group->option->id)->exists()) {
                return false;
            }
          
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'module doesnt exist for this group';
    }
}
