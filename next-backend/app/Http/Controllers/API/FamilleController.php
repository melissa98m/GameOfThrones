<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Famille;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FamilleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $familles = DB::table('familles')
            ->get()
            ->toArray();

        return response()->json([
            'status' => 'Success',
            'data' => $familles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $this->validate($request ,[
            'name' => 'required|max:150',
        ]);

        $famille = Famille::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'status' => 'Success',
            'data' => $famille,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Famille  $famille
     * @return \Illuminate\Http\Response
     */
    public function show(Famille $famille)
    {
        try {
        $famille =  Famille::whereId($famille->id)->firstOrFail();
        return response(['status' => 'ok', 'data' => $famille], 200);
    } catch (e ) {
        return response(['status' => 'error', 'message' => 'Pas de données'], 500);
    }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  \App\Models\Famille  $famille
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Famille $famille)
    {
        $this->validate($request, [
            'name' => 'required|max:150'
        ]);
        $famille->update([
            'name' => $request->name
        ]);
        return response()->json([
            'status' => 'Mise à jour avec success',
            'data' => $famille
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Famille  $famille
     * @return \Illuminate\Http\Response
     */
    public function destroy(Famille $famille)
    {
        $famille->delete();
        return response()->json([
            'status' => 'Supprimer avec succès avec succèss']);
    }
}
