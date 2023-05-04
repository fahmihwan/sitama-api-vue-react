<?php

namespace App\Http\Controllers;

use App\Helpers\Response;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $credentials = [
            'username' => $request->username,
            'password' => $request->password
        ];

        if (!$token = auth()->guard('api')->attempt($credentials)) {
            return Response::send(401, ['error' => 'Unauthorized']);
        }

        return $this->respondWithToken($token);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function me()
    {
        return response()->json(auth()->user());
    }
    public function logout()
    {
        // auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function register(Request $request)
    {
        $validatedData =  $request->validate([
            'name' => 'required',
            'username' => ['required', 'min:3', 'max:255', 'unique:users'],
            'password' => ['required'],
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        $user =  User::create($validatedData);
        if ($user) {
            return Response::send(201, $user);
        } else {
            return Response::send(500, $user);
        }
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
