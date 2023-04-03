<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        try {

            $request->validate([
                "email"=>["required","exists:users,email"],
                "password"=>"required",
            ]);
        }catch (ValidationException $er){
            return response()->json($er->errors(),401);
        }
       $user = User::whereEmail($request->email)->first();
       if($user)
       {
        if(Hash::check($request->password,$user->password))
        {

            $res = new UserResource($user);
            $token = $user->createToken("auth_token")->plainTextToken;
            return response()->json(["message"=>"user logged succeffully", "user"=>$res, "token"=>$token],200);


        }
        else{
            return response()->json(["message"=>"incorrect password"],401);

        }
        

       }
       else{
        return response()->json(["message"=>"no user with this email"],401);
       }
    }
    public function logout()
    {
        $user = Auth::user();
        $user->tokens()->delete();
        return response()->json(["message"=>"user logged out succeffully"],200);
    }
}
