<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::resource('/', \App\Http\Controllers\PassMemController::class);
Route::resource('/pass-mem', \App\Http\Controllers\PassMemController::class);
Route::post('/pass-mem/check/{passMem}', [\App\Http\Controllers\PassMemController::class, 'check']);

