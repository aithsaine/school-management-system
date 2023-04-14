<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{
    //
    public function login(Request $request)
    {
        try {

            $request->validate([
                "email" => ['required', 'exists:users,email'],
                "password" => ["required"]
            ]);
        } catch (ValidationException $er) {
            return response($er->errors(), 422);
        }
        $user = User::whereEmail($request->email)->first();
        if (Hash::check($request->password, $user->password)) {
            $token  = $user->createToken("auth_token")->plainTextToken;
            $res = new UserResource($user);
            $tokentCookie= cookie("auth_token", $token, 60 * 24 * 3);
            return response()->json(["message" => "logged succefully", "user" => $res, "status" => 200, "token" => $token])->withCookie($tokentCookie);
        } else {
            return response(["incorrect_psd" => "incorrect password"], 422);
        }
    }
    public function logout()
    {
        $tokentCookie= Cookie::forget("auth_token"); 
        return response(["massage"=>"success"])->withCookie($tokentCookie);
    }
}
