<?php

namespace App\Rules;

use App\Models\Branch;
use App\Models\Group;
use App\Models\Option;
use Illuminate\Contracts\Validation\Rule;

class UniqueGroup implements Rule
{
    public int $option_id;
    public int $branch_id;
    public function __construct($option_id, $branch_id)
    {
        $this->option_id = $option_id;
        $this->branch_id = $branch_id;
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */


    public function passes($attribute, $value)
    {
        if ($this->option_id != -1)
            return !Group::where("option_id", $this->option_id)->where("name", $value)->exists();
        else {
            $opt_id = Option::where("branch_id", $this->branch_id)->where("key",'TC')->first()->id;
            return !Group::where("option_id", $opt_id)->where("name", $value)->exists();
        }
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
