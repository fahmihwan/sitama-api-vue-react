<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CrudController;
use App\Http\Controllers\TesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    // Route::resource('list-crud', CrudController::class);

    Route::get('/list-crud', [CrudController::class, 'index']);
    Route::get('/list-crud/{id}', [CrudController::class, 'show']);
    Route::post('/list-crud', [CrudController::class, 'store']);
    // Route::patch('/list-crud', [CrudController::class, 'update']);
    Route::patch('/list-crud', [CrudController::class, 'update']);
    Route::delete('/list-crud/{id}', [CrudController::class, 'destroy']);
});


// Route::resource('/tes', TesController::class);
