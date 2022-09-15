<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Personnage;
use Illuminate\Http\Request;

class PersonnageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $personnages = Personnage::with(['famille'])->get();
        return response()->json([
            'status' => 'Success',
            'data' => $personnages
        ]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:150',
            'image' => 'mimes:jpeg,png,jpg,gif,svg|max:2048',
            'naissance' => 'required',
            'nickname' => 'nullable|max:100',
        ]);

        $filename="";
        if($request->hasFile('image')){

            // On récupère le nom du fichier avec son extension, résultat $filenameWithExt : "soccer.jpg"
            $filenameWithExt = $request->file('image')->getClientOriginalName();
            $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);

            //  On récupère l'extension du fichier, résultat $extension : ".jpg"
            $extension = $request->file('image')->getClientOriginalExtension();

            // On créer un nouveau fichier avec le nom + une date + l'extension, résultat $fileNameToStore : "soccer_20220422.jpg"
            $filename = $filenameWithoutExt.'_'.time().'.'.$extension;

            // On enregistre le fichier à la racine /storage/app/public/uploads, ici la méthode storeAs défini déjà le chemin /storage/app
            $path = $request->file('image')->storeAs('public/uploads',$filename);

        } else {
            $filename=Null;
        }

        $personnage = Personnage::create([
            'name' => $request->name,
            'nickname' => $request->nickname,
            'image'=> $filename,
            'naissance'=> $request->naissance,
            'famille' => $request->famille,
        ]);
        $personnage->famille = $personnage->famille()->get()[0];
        return response()->json(['status' => 'Success', 'data' => $personnage]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Personnage  $personnage
     * @return \Illuminate\Http\Response
     */
    public function show(Personnage $personnage)
    {
        $personnage->load(['famille']);
        return response()->json($personnage);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Personnage  $personnage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Personnage $personnage)
    {
        $this->validate($request, [
            'name' => 'required|max:150',
            'naissance' => 'required',
            'nickname' => 'nullable|max:100',
        ]);
        $personnage->update([
            'name' => $request->name,
            'nickname' => $request->nickname,
            'naissance'=> $request->naissance,
            'famille' => $request->famille,
        ]);
        $personnage->famille = $personnage->famille()->get()[0];
        return response()->json(['status' => 'Success', 'data' => $personnage]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Personnage  $personnage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Personnage $personnage)
    {
        $personnage->delete();
        return response()->json(['status' => 'Supprimer avec succès']);

    }
}
