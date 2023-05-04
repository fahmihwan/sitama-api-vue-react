<?php

namespace App\Http\Controllers;

use App\Models\Crud;
use Illuminate\Http\Request;
use App\Helpers\Response;
use Exception;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $results = Crud::latest()->get();
            $data = [
                'message'  => 'List Data',
                'results'  => $results,
            ];
            return Response::send(200, $data);
        } catch (Exception $error) {
            return Response::send(500, $error->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated =  Validator::make($request->all(), [
            "title" => 'required',
            "description" => 'required',
            "department" => 'required',
            "assign" => 'required',
            "cc" => 'required',
        ])->validate();


        if ($request->file('attachment')) {
            $validated['attachment'] = $request->file('attachment')->store('files', 'public');
        } else {
            return Response::send(500, 'image is required');
        }

        try {
            $storeData = Crud::create($validated);
            $data = [
                'message' => 'Data Created Success',
                'data' => $storeData
            ];
            return Response::send(200, $data);
        } catch (Exception $error) {
            return Response::send(500, $error->getMessage());
        }
    }

    /**
     * Display the specified resource.i
     */
    public function show($id)
    {
        $results = Crud::find($id);
        if ($results) {
            $data = [
                'message' => 'Success',
                'data' => $results
            ];

            return Response::send(200, $data);
        }
        $data = [
            'message' => 'Not found',
            'data' => null
        ];
        return Response::send(200, $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Crud $crud)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

        $validator =  Validator::make($request->all(), [
            "title" => 'required',
            "description" => 'required',
            "department" => 'required',
            "assign" => 'required',
            "cc" => 'required',
        ]);

        if ($validator->fails()) {
            return Response::send(500, $validator->errors());
        }

        try {
            $check = Crud::where('id', $request->id)->first();

            if ($request->file('attachment')) {
                Storage::delete($check->attachemnt);
                $validated['attachment'] = $request->file('attachment')->store('files');
            }
            if ($check) {
                $updateData = Crud::where('id', $request->id)->update($request->all());
                return Response::send(200, ['message' => 'Data Updated Success', 'data' => $updateData]);
            }
            return Response::send(200, ["message" => 'Data Not found', "data" => []]);
        } catch (Exception $error) {
            return Response::send(500, $error->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $check = Crud::find($id);
        try {
            if ($check) {
                Storage::disk('public')->delete($check->attachment);
                $check->delete();
                $data = [
                    "message" => "Data Deleted Success",
                    "data" => $check
                ];
                return Response::send(200, $data);
            }
            $data = [
                "message" => "Data Not Found",
                "data" => []
            ];
            return Response::send(200, $data);
        } catch (Exception $error) {
            return Response::send(500, $error->getMessage());
        }
    }
}
